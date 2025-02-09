// Geir Hilmersen 18 Desember 2024

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Student name and email is provided by the authentication server
// The point is to keep this as anonomous as possible
const studentSchema = new Schema({
    auth_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    classCode: {
        type: String,
        required: true,
        enum: ["IMA","IMB","IMC","ITA","ITB","faculty"]
    },
    applicationRole: {
        type: String,
        enum: ["student","teacher","admin"],
        default: "student"
    },
    alias: {
        type: String,
        ref: 'Alias',
        unique: true,
        required: true,
        default: null
    }
});

studentSchema.pre('save', async ()=>{
    try{
        const result = await fetch(process.env.AUTHSERVER);
    } catch (error){

    }
})

const Student = mongoose.model('Student', studentSchema);

module.exports=Student;