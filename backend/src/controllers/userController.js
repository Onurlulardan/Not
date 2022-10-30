const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {

    return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '1h' })

}


const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        
        const user = await userModel.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({ Errors: error.message });
    }
}

const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await userModel.signup(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token});

    } catch (error) {
        res.status(400).json({ Errors: error.message });
    }

}


module.exports = { loginUser, signupUser }