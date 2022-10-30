const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const userRouter = require('./routes/users');

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    
    console.log(' *** Veritabanına Bağlanıldı *** ');

    app.listen(process.env.PORT || 4000 , () => {
        console.log(`${process.env.PORT} => PORT Dinleniyor`)
    });

}).catch(err => {
    console.log(err);
});



app.use('/api/notes',notesRouter);
app.use('/api/users', userRouter);