const router = require('express').Router();

const {
    postRegister,
    postLogin
} = require('../controllers/user_controller')



router.post('/register-user', postRegister);

router.post('/login-user', postLogin);

module.exports=router;