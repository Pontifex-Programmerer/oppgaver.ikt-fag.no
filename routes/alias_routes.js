const router = require('express').Router();
const {
    authenticate
} = require('../middleware/auth')

const {
    getAliasList,
    postClaimAlias
} = require('../controllers/alias_controller')


router.get('/getAliasList', authenticate, getAliasList);

router.post('/claim-alias', authenticate, postClaimAlias);

module.exports=router;