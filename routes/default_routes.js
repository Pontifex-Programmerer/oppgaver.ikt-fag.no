const router = require('express').Router()
const {
    authenticate
} = require('../middleware/auth');

const {
    index,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    postClaimAlias,
    internalError
} = require('../controllers/default_controller')

router.get('/', index);

router.get('/register', getRegister);

router.post('/register', postRegister);

router.post('/claim-alias', postClaimAlias);

router.get('/log-in', getLogin);

router.post('/log-in', postLogin);

router.get('/internal-error', internalError);

module.exports=router;