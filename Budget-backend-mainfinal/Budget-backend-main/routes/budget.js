const express = require('express');
const router = express();
const users = require('../models/users');
const budget = require('../models/budget');
const verifyToken = require('../middlewares/verifyToken');
const validator = require('validator');
const sanitize = require('mongo-sanitize');

router.get('/', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the Budget page' });
});

router.get('/get-budget/:id', verifyToken, (req, res) => {
    const id = sanitize(req.params.id);
    budget.findOne({ _id: id })
        .then((budget) => {
            return res.json({ status: 200, budget: budget });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });

});

router.get('/get-budgets', verifyToken, (req, res) => {
    const email = req.user.email;
    budget.find({ userEmail: email })
        .then((budgets) => {
            return res.json({ status: 200, budgets: budgets });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });
});

router.post('/create-budget', verifyToken, (req, res) => {
    const name = sanitize(req.body.name);
    const amount = sanitize(req.body.amount);
    const category = sanitize(req.body.category);
    const date = sanitize(req.body.date);
    const email = req.user.email;
    let month = date.split('-')[1]; // month in words
    switch (month) {
        case '01':
            month = 'Jan';
            break;
        case '02':
            month = 'Feb';
            break;
        case '03':
            month = 'Mar';
            break;
        case '04':
            month = 'Apr';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'Jun';
            break;
        case '07':
            month = 'Jul';
            break;
        case '08':
            month = 'Aug';
            break;
        case '09':
            month = 'Sep';
            break;
        case '10':
            month = 'Oct';
            break;
        case '11':
            month = 'Nov';
            break;
        case '12':
            month = 'Dec';
            break;
        default:
            month = 'Jan';
            break;
    }

    const budgetData = new budget({
        name: name,
        amount: amount,
        category: category,
        date: date,
        userEmail: email,
        month: month,
        year: date.split('-')[0],
    });

    budgetData.save()
        .then(() => {
            return res.json({ status: 200, message: 'Budget created successfully' });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });
});

router.put('/update-budget/:id', verifyToken, (req, res) => {
    const id = sanitize(req.params.id);
    const name = sanitize(req.body.name);
    const amount = sanitize(req.body.amount);
    const category = sanitize(req.body.category);
    const date = sanitize(req.body.date);

    budget.findOneAndUpdate({ _id: id }, {
        name: name,
        amount: amount,
        category: category,
        date: date,
    })
        .then(() => {
            return res.json({ status: 200, message: 'Budget updated successfully' });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });
});

router.delete('/delete-budget/:id', verifyToken, (req, res) => {
    const id = sanitize(req.params.id);
    budget.findOneAndDelete({ _id: id })
        .then(() => {
            return res.json({ status: 200, message: 'Budget deleted successfully' });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });
});

router.get('/get-net-by-category', verifyToken, async (req, res) => {
    const email = req.user.email;

    let budgets = await budget.find({ userEmail: email })
    const categoryOptions = [
        { value: "", label: "Select Category" },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Bills', label: 'Bills' },
        { value: 'Rent', label: 'Rent' },
        { value: 'Salary', label: 'Salary' },
        { value: 'Food', label: 'Food' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Others', label: 'Others' },
    ]

    let data = [
        {
            category: "Groceries",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Bills",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Rent",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Salary",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Food",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Travel",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Shopping",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            category: "Others",
            credit: 0,
            debit: 0,
            net: 0
        }
    ]

    try {
        budgets.forEach((budget) => {
            data.find((item) => {
                if (budget.category === "") {
                    item.net += budget.amount;
                    if (budget.amount > 0) {
                        item.credit += budget.amount;
                    }
                    else {
                        item.debit += Math.abs(budget.amount);
                    }
                }

                else if (item.category === budget.category) {
                    item.net += budget.amount;
                    if (budget.amount > 0) {
                        item.credit += budget.amount;
                    }
                    else {
                        item.debit += Math.abs(budget.amount);
                    }
                }
            })
        })

        return res.json({ status: 200, data: data });
    }
    catch (err) {
        return res.json({ status: 800, error: err });
    }

});

router.get('/get-net-by-month/:year', verifyToken, async (req, res) => {
    const email = req.user.email;
    const year = sanitize(req.params.year);
    let budgets = await budget.find({ userEmail: email, year: year })

    let data = [
        {
            month: "Jan",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Feb",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Mar",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Apr",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "May",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Jun",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Jul",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Aug",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Sep",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Oct",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Nov",
            credit: 0,
            debit: 0,
            net: 0
        },
        {
            month: "Dec",
            credit: 0,
            debit: 0,
            net: 0
        }
    ]

    budgets.forEach((budget) => {
        data.find((item) => {
            if (item.month === budget.month) {
                item.net += budget.amount;
                if (budget.amount > 0) {
                    item.credit += budget.amount;
                }
                else {
                    item.debit += Math.abs(budget.amount);
                }
            }
        })
    })


    return res.json({ status: 200, data: data });
})

module.exports = router;