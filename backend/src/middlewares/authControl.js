const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authControl = async (req, res, next) => {

    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ Errors: 'Yetkisiz Giriş!' })
    }

    const token = authorization.split(' ')[1];

    try {
        
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await userModel.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({Errors: 'Yetkisiz İstek!'});
    }
}

module.exports= { authControl }