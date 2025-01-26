

// Registration is done at the authentication server login-api
const postRegister = async (req, res, next) => {
    let httpFeedback = httpFeedbackHandler.createFeedback(404, "Could not register user");
    
    const {surname, givenname, email, password1, password2 } = req.body;
    if(isValidInput(surname, givenname, email, password1, password2) && password1 === password2) {
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
                        getAliasList(req,res,next, email);
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
            console.error("default_controller::postRegister",error);
        }
    } else {
        httpFeedback = httpFeedbackHandler.createFeedback(400, "Faulty input data! Could not handle request!", false, {email, surname, givenname});
    }
    res.status(httpFeedback.statuscode).json(httpFeedback);
}

const postLogin = async (req, res, next)=>{
    const {password,email} = req.body;
    if(password !== 'undefined' && email !== 'undefined') {
        const response = await apiPostFetch('/login-user', JSON.stringify({password, email}));
        const json = await response.json();
        const {statuscode, feedback} = json;
        console.log(json);
        switch(statuscode) {
            case 401:
                res.render('login', {message:feedback, email})
                break;
            case 200:
                const {accessToken, refreshToken} = json.payload;
                res.cookie(
                    'refreshToken', refreshToken,
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                    });
                res.session.accessToken = accessToken;
                res.redirect(`/alias-profile`);
                break;       
            default:
                break;         
        }
    } else{
        res.render('login', {message:"Unknown error, please try again!", email})
    }
}

module.exports={
    postRegister,
    postLogin
}
