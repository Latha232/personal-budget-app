const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const verifyToken = require('../middlewares/verifyToken');
const validator = require('validator');
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');

router.get('/', (req, res) => {
    res.json({ status: 200, message: 'Welcome to the auth page' });
});

router.post('/signup', async (req, res) => {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const password = req.body.password;

    if (!validator.isEmail(email)) {
        return res.json({ status: 800, message: 'Please enter a valid email!' });
    }


    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
        return res.json({ status: 800, message: 'Email already exists! Login instead.' });
    }

    let pass = await bcrypt.hash(password, 12);
    const user = new users({
        name: name,
        email: email,
        password: pass,
    });

    user.save()
        .then(() => {
            let token = getToken(email);
            return res.json({ status: 200, message: 'User created successfully', token: token });
        })
        .catch((err) => {
            return res.json({ status: 800, error: err });
        });
});

router.post('/login', async (req, res) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!validator.isEmail(email)) {
        return res.json({ status: 800, message: 'Invalid email' });
    }

    users.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                let pass = await bcrypt.compare(password, user.password);
                if (pass) {
                    let token = getToken(email);
                    return res.json({ status: 200, message: 'Login successful', token: token });
                } else {
                    return res.json({ status: 800, message: 'The password you enetered is wrong!' });
                }
            } else {
                return res.json({ status: 800, message: 'User does not exit! Please sign-up instead.' });
            }
        })
        .catch((err) => {
            return res.json({ status: 500, error: err });
        });
});


const getToken = (email) => {
    return jwt.sign(
        email,
        'uiREjuGp*&88huHJV',
    );
};

module.exports = router;