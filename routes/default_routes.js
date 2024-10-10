const router = require('express').Router()
const ca = require('../utilities/tasks-json-handler')

const {
    index
} = require('../controllers/default_controller')

router.get('/', index)

module.exports=router;