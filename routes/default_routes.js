const router = require('express').Router()
const {
    authenticate
} = require('../middleware/auth');

const {
    internalError,
} = require('../controllers/default_controller')


router.get('/internal-error', internalError);


module.exports=router;