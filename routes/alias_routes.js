const router = require('express').Router();
const {
    authenticate,
    authorize
} = require('../middleware/auth')

const {
    getAllAliasEntityList,
    getAvailableAliasList,
    postClaimAlias
} = require('../controllers/alias_controller')

router.get('/getAllAliasEntityList', authenticate, authorize, getAllAliasEntityList);

router.get('/getAvailableAliasList', authenticate, getAvailableAliasList);

router.post('/claim-alias', authenticate, postClaimAlias);

module.exports=router;