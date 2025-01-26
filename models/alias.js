const mongoose = require('mongoose');
const { findOneAndUpdate } = require('./user');
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
    clan: {
        type: String,
        required: true,
        enum: ['monster', 'bad-ai','good-ai', 'carnivore', 'monster'],
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
 * @returns the updated entity or null if operation failed
 */
async function claim(user, alias){
    console.info(`${user} is claiming ${alias}`)
    let result = null;
    try {
        const result = await this.findOneAndUpdate({alias},{user}, {new: true});
    } catch(error){
        console.error('Claiming user failed', error);
    }
    return result;
}

const Alias=mongoose.model('Alias', aliasSchema);

module.exports=Alias;