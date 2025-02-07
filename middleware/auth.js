// 22 Desember 2024 Geir Hilmersen
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const {
    createFeedback,
    accessDenied
} = require('../handlers/httpFeedbackHandler');

const publicKey = fs.readFileSync('./keys/jwt-public.pem','utf-8');


const authorize = async (req, res, next) => {
    const {_id} = req.body;

    if(_id){
        const users = await Student.find();
        console.log(users)
    }
    console.info('MOCK AUTHORIZATION MIDDLEWARE IS RUNNING!');
    next();
}

const authenticate = async (req, res, next) => {
    let httpFeedback = accessDenied(); // This is the default state of this function.
    const {accessToken} = req.body;

    if(accessToken){
        const {decoded, error} = decodeToken(accessToken);
        // The logic here is that if an error occur, this function should respond with the default state,
        // access denied!;
        if(!error && typeof decoded?._id !== 'undefined' ) {
            req.body._id = decoded._id;
            return next();
        } else {
            httpFeedback = createFeedback(401, error.title, false, error);
        }
    }
    res.status(httpFeedback.statuscode).json(httpFeedback);
}


/**
 * Attempts to decode any token provided.
 * On success returns an object where either 
 * @param {*} token json web token
 * @returns an object {decoded, error} where one of them is always null
*/
function decodeToken(token){
    let decoded = null;
    let error = null;
    try {
        decoded = jwt.verify(token, publicKey, {algorithms:["RS256"]});
    } catch(err){
        error = err;
    }
    return {decoded, error};
}
module.exports = {
    authenticate,
    authorize
}