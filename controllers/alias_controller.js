const aliashome = (req,res,next)=>{
    const {alias} = req.params;
    res.render('aliashome');
}

module.exports={
    aliashome
}