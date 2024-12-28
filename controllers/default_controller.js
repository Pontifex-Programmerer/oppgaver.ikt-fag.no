const Alias = require('../models/alias');
const User = require('../models/user');

const index = (req, res)=> {
    res.render('../views/index');
}

const getRegister = async (req, res, next) => {
    try{
        res.status(200).render('register');
    } catch(error){
        res.status(400).redirect('internal-error');
    }
}

// Registration is done at the authentication server login-api
const postRegister = async (req, res, next) => {
    console.log('postregistter')
    const {surname, givenname, email, password1, password2 } = req.body;
    if(password1 === password2) {
        // register with auth.ikt-fag.no and get objectID
        try {
            const response = await apiPostFetch('/create-user', 
                JSON.stringify({email,surname,givenname, 'password':password1}));
            if(response) {
                const data = await response.json();
                switch(data.statuscode) {
                    case 409:
                        sendMessage(data.feedback);
                        break;
                    case 200:
                        // should get user id _id to save with the usermodel. 
                        req.data = data;
                        getClaimAlias(req,res,next, email);
                        break;
                    case 404:
                        sendMessage(data.feedback);
                        break;
                    default:
                        console.log("Default occurence");
                        break;
                }
            }
        } catch(error) {
            res.render('internalError', {error})
        }
    } else {
        sendMessage("passwords dont match!");
    }
    async function sendMessage(message){
        console.log(`sending message: ${message}`)
        res.status(200).render('register', {surname,givenname,email,message});
    }
}

const getClaimAlias = async (req, res, next, email) => {
    const feedback = req.data.feedback;
    const _id = req.data.payload._id;
    try {
        const aliasEntities = await Alias.find({'user':null});
        const aliasList = aliasEntities.map(entity => entity.alias);

        res.status(200).render('claimAlias', {
            aliasList,
            message:feedback,
            _id,
            email});
    } catch (error) {
        console.log('error claiming')
    }
}

const postClaimAlias = async (req, res, next) => {
    const {alias,_id, password} = req.body;
    console.log(password);
    try {
        const result = await Alias.updateOne({alias},{user:_id, state: 'approval pending'});
        if(result){

        }
    } catch (error) {
        console.log('could not update alias', error);
        res.render('internalerror')
    }
    
}

const internalError = (req,res)=>{
    res.render('internalError', {error});
}

const getLogin = (req,res)=> {
    res.render('login');
}
const postLogin = async (req, res, next)=>{
    const {password,email} = req.body;
    if(password !== 'undefined' && email !== 'undefined') {
        const response = await apiPostFetch('/login-user', JSON.stringify({password, email}));
        const json = await response.json();
        const {statuscode, feedback} = json;

        switch(statuscode) {
            case 401:
                res.render('login', {message:feedback, email})
                break;
            case 200:
                res.redirect(`/user/${email}`);
                break;       
            default:
                break;         
        }
    } else{
        res.render('login', {message:"Unkown error, please try again!", email})
    }
}

async function apiPostFetch(endpoint, json){
    const authserver = process.env.AUTHSERVER;
    return await fetch(
        authserver+endpoint,
        {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: json
        })
}

module.exports={
    index,
    getRegister,
    getLogin,
    postLogin,
    postRegister,
    internalError,
    postClaimAlias
}