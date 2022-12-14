const mongoose = require('mongoose');


const monSchema = mongoose.Schema;

const noteSchema = new monSchema({
    title: {
        type: String,
        required: [true, 'Başlık Zorunlu Olarak Girilmelidir!']
    },
    desc: {
        type: String,
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('nots', noteSchema);