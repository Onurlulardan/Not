const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const monSchema = mongoose.Schema;

const userSchema = new monSchema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


userSchema.statics.signup = async function(email, password) {

    if(!email || !password){
        throw Error('Alanlar Boş Geçilemez!');
    }

    if(!validator.isEmail(email)){
        throw Error('Email Kurallara Uygun Değil!');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Lütfen Güçlü Bir Parola Giriniz!')
    }

    const checkUser = await this.findOne({email});

    if(checkUser) {
        throw Error('Email Adresi Kullanılıyor!');
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hashedPassword});

    return user
}

userSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error('Alanlar Boş Geçilemez!');
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error('Kayıtlı Kullanıcı bulunamadı!')
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if(!passwordCheck){
        throw Error('Hatalı Parola Girdiniz!');
    }

    return user
}



module.exports = mongoose.model('users', userSchema);