const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController');


const userRouter = express.Router();

//Login User
userRouter.post('/login', loginUser);

//Signup User
userRouter.post('/signup', signupUser);

module.exports = userRouter;