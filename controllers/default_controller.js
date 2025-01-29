const Alias = require('../models/Alias');
const User = require('../models/Student');
const httpFeedbackHandler = require('../handlers/httpFeedbackHandler');

const internalError = (req,res)=>{
    res.render('internalError', {error});
}


module.exports={
    internalError,
}