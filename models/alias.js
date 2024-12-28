const mongoose = require('mongoose');
const {Schema} = mongoose;

const aliasSchema = new Schema({
    // alias is a predetermined alias as implemented in active directory
    alias: {
        type: String,
    unique: true,
    required: true
    },
    // User is the user that a student registered
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: false,
        default: null
    },
    // pool is the assigned pool number on vsphere
    pool: {
        type: Number,
        required: true,
        unique: true
    },
    // webhost is the hostIP on our web-server
    webserver: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true,
        enum: ['inactive','approval pending', 'active', 'suspended', 'marked for removal'],
        default: 'inactive'
    }
});

const Alias=mongoose.model('Alias', aliasSchema);
module.exports=Alias;