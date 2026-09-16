const express = require('express');
const AuthRouter = express.Router();

const AuthControllers = require('../controllers/AuthControllers');

//GET Route
AuthRouter.get('/login', AuthControllers.getLogin);
AuthRouter.get('/signup', AuthControllers.getSignUp);

//POST Router
AuthRouter.post('/login', AuthControllers.postLogin);
AuthRouter.post('/logout', AuthControllers.postLogout);
AuthRouter.post('/signup', AuthControllers.postSignUp);

module.exports =  AuthRouter;