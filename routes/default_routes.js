const router = require('express').Router()
const {
    index
} = require('../controllers/default_controller')

router.get('/', index)

module.exports=router;