const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
    
const userSchema = new Schema({
    givenName: {
        type: String,
        unique: true,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ["IMA","IMB","IMC","ITA","ITB","faculty"]
    },
    email: {
        type: String,
        required: [true, "an email is required to register!"],
        validate: validator.isEmail,
        message: props => `${props.value} is not a valid email!`
    },
    role: {
        type: String,
        enum: ["student","teacher","admin"]
    },
    alias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alias',
        unique: true,
        required: true,
        default: null
    }
});
const User = mongoose.model('User', userSchema);

module.exports=User;