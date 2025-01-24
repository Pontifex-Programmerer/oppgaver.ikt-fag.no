const {
    createFeedback,
    accessDenied,
    notAuthorized,
    resourceNotFound,
    internalServerError
} = require('../handlers/httpFeedbackHandler');

const index = (req, res)=> {
    res.render('../views/index', {
        links:
        [
            {
                link: 'HTML/CSS Crash Course',
                href: '/html-css-crash-course'
            },
            {
                link: 'A Modern Javascript Tutorial',
                href: '/a-modern-javascript-tutorial'
            },
            {
                link: 'NodeJS Crash Course',
                href: '/node-js-crash-course'
            },
            {
                link: 'Mern Stack Tutorial',
                href: '/mern-stack-tutorial'
            },
            {
                link: 'Mern Auth Tutorial',
                href: '/mern-auth-tutorial'
            }
        ]
    });
}


const login = async (req, res)=> {
    let feedback = accessDenied();
    try {
        const {email,password} = req.body;
        console.log(email,password);
        const result = await fetch(`HTTP://${process.env.AUTHSERVER}/login-user`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email,password})
        });
        console.log(result);
        if(result.ok){
            const json = await result.json();
            console.log('json', json);
            feedback = createFeedback(200, "Access granted!", true, json);
        }

    } catch(error) {
        feedback=internalServerError();
    }
    res.status(feedback.statuscode).json(feedback);
}

module.exports={
    index,
    login
}