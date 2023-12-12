const express = require('express');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;
const uri = "mongodb+srv://shreya:OpLgPfkDRpvpr5Vd@cluster0.igd0wi4.mongodb.net/budget?retryWrites=true&w=majority";

const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

mongoose.set('strictQuery', false);

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Budget App',
        status: 200
    });
});

app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
