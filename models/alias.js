const mongoose = require('mongoose');
const { findOneAndUpdate } = require('./user');
const {Schema} = mongoose;

const aliasSchema = new Schema({
    // alias is a predetermined alias and has to match a user in
    // active directory
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
aliasSchema.statics.claim = claim;

/**
 * @param {*} user must be the ObjectId of a user
 * @param {*} alias must be an alias in the database
 * @returns the updated entity
 */
async function claim(user, alias){
    return await this.findOneAndUpdate({alias},{user}, {new: true});
}

const Alias=mongoose.model('Alias', aliasSchema);

module.exports=Alias;