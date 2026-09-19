//Core Modules
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Local Modules
const hostRoute = require('./routes/hostRoute');
const userRoute = require('./routes/userRoute');
const Page404 = require('./routes/404Page');
const rootDir = require('./utils/path');
const AuthRoute = require('./routes/authRoute');


//Common Commands
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));
app.set('view engine', 'ejs');

//Routes
app.use(session({
    // Secret key used to sign the session ID cookie and encrypt session data
    secret: 'Secret',
    // Forces session to be saved back to the session store, even if not modified
    resave: false,
    // Forces a session that is "uninitialized" to be saved to the store
    saveUninitialized: true
}));
app.use('/', AuthRoute);
app.use('/', userRoute);
app.use('/host', (req, res, next) => {   
    if(req.session.isLoggedIn){
        next();
    } else {
        res.redirect('/login');
    }
}, hostRoute);
app.use('/', Page404);

//Server
const PORT = 8000;
mongoose.connect(process.env.MONGODB_URL).then((client) => {
    console.log('Connected To MongoDB');
    app.listen(PORT, () => {
        console.log(`Server Running on http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})