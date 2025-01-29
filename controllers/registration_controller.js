const Alias = require('../models/Alias');

const registerPage = (req, res, next) => {
    res.render("register");
}


module.exports = {
    registerPage
}