const mongoose = require('mongoose');
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
        required: false,
        default: undefined
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
        enum: ['monster', 'creature', 'bad-ai','good-ai', 'carnivore', 'monster'],
    },
    state: {
        type: String,
        required: true,
        enum: ['inactive','approval pending', 'active', 'suspended', 'marked for removal'],
        default: 'inactive'
    }
});

aliasSchema.index(
    { user: 1 },
    { unique: true, partialFilterExpression: { user: { $exists: true } } }
  )

aliasSchema.statics.claim = claim;

/**
 * @param {*} user must be the ObjectId of a user
 * @param {*} alias must be an alias in the database
 * @returns the updated entity or null if operation failed
 */
async function claim(user, alias){
    let result = null;
    try {
        result = await this.findOneAndUpdate(
            {alias, user:{$exists:false}},
            {user}, 
            {new: true});
    } catch(error){
        console.error('Claiming alias failed', error);
    }
    return result;
}

const Alias=mongoose.model('Alias', aliasSchema);

Alias.createIndexes()
.then(() => {
    console.info('Alias model index implemented!');
})
.catch(err => {
    console.error('An error occured in createindex of the Alias model', err);
});

module.exports=Alias;