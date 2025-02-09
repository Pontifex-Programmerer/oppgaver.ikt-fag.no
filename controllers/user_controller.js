const Student = require('../models/Student');
const httpFeedbackHandler =  require('../handlers/httpFeedbackHandler');
const {
    apiPostFetch
} = require('../handlers/fetchHandler');

// Registration is done at the authentication server login-api
const postRegister = async (req, res, next) => {
    let httpFeedback = httpFeedbackHandler.createFeedback(404, "Could not register user");
    
    const {surname, givenname, email, password1, password2 } = req.body;
    if(isValidUserInput(surname, givenname, email, password1, password2) && password1 === password2) {
        // register with auth.ikt-fag.no and get objectID
        try {
            const response = await apiPostFetch('/create-user', 
                JSON.stringify({email,surname,givenname, 'password':password1}));
            if(response) {
                httpFeedback = await response.json();
            }
        } catch(error) {
            console.error("default_controller::postRegister",error);
        }
    } else {
        httpFeedback = httpFeedbackHandler.createFeedback(400, "Faulty input data! Could not handle request!", false, {email, surname, givenname});
    }
    res.status(httpFeedback.statuscode).json(httpFeedback);
}

// const postClaimAlias = async (req, res, next) => {
//     let httpFeedback = httpFeedbackHandler.createFeedback(404, "Alias could not be claimed");
//     const {auth_id, classCode, applicationRole,alias} = req.body;
//     if(isValidUserInput(auth_id,classCode,applicationRole,alias)){
//         try {
//             const student = Student.create({auth_id,classCode,applicationRole,alias});
//         } catch (error){
//             console.error(error.title, error.message);
//         }
//     }

//     res.status(httpFeedback.statuscode).json(httpFeedback);
// }

const postLogin = async (req, res, next)=>{
    let httpFeedback = httpFeedbackHandler.accessDenied();
    const {password,email} = req.body;
    console.info('postLogin for:', password, email);
    if(password !== 'undefined' && email !== 'undefined') {
        const response = await apiPostFetch('/login-user', JSON.stringify({password, email}));
        const json = await response.json();
        const {statuscode, feedback} = json;
        switch(statuscode) {
            case 401:
                console.log('401', feedback);
                break;
            case 200:
                httpFeedback=json;
                break;       
            default:
                break;         
        }
    } else{
        httpFeedback = httpFeedbackHandler.internalServerError()
    }
    res.status(httpFeedback.statuscode).json(httpFeedback);
}


function isValidUserInput(...input){
    for(element of input) {
        if(typeof element === 'undefined') return false;
    }
    return true;
}

/**
 * This function handles responses in the postRegister controller
 * from the api /create-user route. If the request was successfully
 * executed, the info is used to create a student in the Student 
 * Collection of this apps' database.
 * @param {*} jsonResponse should be resonse resolved as json
 * @returns httpFeedback object based on the result of what this
 * function achieves.
 */
async function handleCreateUserResponse(jsonResponse){
    if(jsonResponse?.isSuccess){
        console.log('jsonresponse', jsonResponse);
        // const student = await Student.create({_id: })
    }
}

module.exports={
    postRegister,
    postLogin
}
