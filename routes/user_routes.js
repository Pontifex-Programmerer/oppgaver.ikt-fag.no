const router = require('express').Router();

const {
    userhome
} = require('../controllers/alias_controller')

router.get('/user/:email', (req,res,next)=>{
    //check if user is registered locally
    const {email} = req.params;
    console.log(email)
    res.end()
})


module.exports=router;