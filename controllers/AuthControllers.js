const {check, validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/UserModel');

//GET Route
const getLogin = (req, res, next) => {
    res.render('auth/login-page', {title: 'Login Page', isLoggedIn: false});
}

const getSignUp = (req, res, next) => {
    res.render('auth/sign-up', {title: 'Sign Up', isLoggedIn: false});
};

//POST Route
const postLogin = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        res.status(422).render('auth/login-page', {title: 'Login', isLoggedIn: false, errorMessages: ["User does not exist"], oldInput: {email}});
    }

    req.session.isLoggedIn = true;  //Setting a Session
    res.redirect('/');
}

const postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

const postSignUp = [
    //First Name Validations
    check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({min: 2})
    .withMessage('First name must be atleast 2 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First Name can only contain letters'),

    //Last Name Validations
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required')
    .trim()
    .isLength({min: 2})
    .withMessage('Last name must be at least 2 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Last name can only contain letters'),

    //Email Validations
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

    // Password Validations
    check('password')
    .isLength({min: 8})
    .withMessage('Password must be atleast 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain atleast one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain atleast one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain atleast one number')
    .matches(/[!@#$%^&*()]/)
    .withMessage('Password must contain atleast one special character')
    .trim(),

    //Confirm password validations
    check('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    
    //Role Type Validation
    check('role')
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['guest', 'host'])
    .withMessage('Invalid User Type'),


    //Terms Accepted Validation
    check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions')
    .custom((value) => {
        if(value !== 'on'){
            throw new Error('You must accept the terms and conditions')
        }
        return true;
    })
    
    , (req, res, next) => {
        console.log(req.body);
        const {firstName, lastName, email, password, role} = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).render('auth/sign-up', {title: 'Sign Up', isLoggedIn: false, errorMessages: errors.array().map(error => error.msg), oldInput: {firstName, lastName, email}});
        } else {
            bcryptjs.hash(password, 12).then((hashedPassword) => {
                const user = new User({firstName, lastName, email, hashedPassword, role});
                user.save().then(() => {
                    console.log('New User Registered Successfully');
                    res.redirect('/login');
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
                        
        }
    }
]

exports.getLogin = getLogin;
exports.getSignUp = getSignUp;
exports.postLogin = postLogin;
exports.postLogout = postLogout;
exports.postSignUp = postSignUp;
