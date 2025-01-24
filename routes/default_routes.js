const router = require('express').Router()
const ca = require('../utilities/tasks-json-handler')

const {
    index,
    login
} = require('../controllers/default_controller')

router.get('/', index);

router.post('/login', login);

module.exports=router;