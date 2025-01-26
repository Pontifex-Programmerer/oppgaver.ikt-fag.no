const router = require('express').Router();
const {
    authenticate
} = require('../middleware/auth')

const {
    aliashome
} = require('../controllers/alias_controller')

router.get('/alias-profile', authenticate, aliashome)

module.exports=router;