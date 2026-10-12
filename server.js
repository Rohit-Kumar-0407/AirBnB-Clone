//Core Modules
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MongoStore = require('connect-mongo').default;
const multer = require('multer');

//Local Modules
const hostRoute = require('./routes/hostRoute');
const userRoute = require('./routes/userRoute');
const Page404 = require('./routes/404Page');
const rootDir = require('./utils/path');
const AuthRoute = require('./routes/authRoute');
const FavRoute = require('./routes/FavRoute');


//Common Commands
const randomizedString = (length) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for(let i=0; i<length; i++){
        result += letters.charAt(Math.floor(Math.random()*letters.length))
    }
    return result;
}

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        cb(null, randomizedString(10) + '-' + file.originalname)
    }
});

const multerOptions = {
    storage, fileFilter
}

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use(multer(multerOptions).single('photo'));
app.set('view engine', 'ejs');

//Sessions
const store = new MongoStore({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: 'sessions'
});

app.use(session({
    // Secret key used to sign the session ID cookie and encrypt session data
    secret: 'Secret',
    // Forces session to be saved back to the session store, even if not modified
    resave: false,
    // Forces a session that is "uninitialized" to be saved to the store
    saveUninitialized: false,
    //Session Storage in MongoDB
    store: store
}));

//Routes
app.use('/', AuthRoute);
app.use('/', userRoute);
app.use('/host', (req, res, next) => {   
    if(req.session.isLoggedIn){
        next();
    } else {
        res.redirect('/login');
    }
}, hostRoute);
app.use('/', (req, res, next) => {   
    if(req.session.isLoggedIn){
        next();
    } else {
        res.redirect('/login');
    }
}, FavRoute);
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