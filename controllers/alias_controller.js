const userhome = (req,res,next)=>{
    const {alias} = req.params;
    res.render('home');
}

const claimAlias = (req, res, next) => {

}

module.exports={
    userhome
}