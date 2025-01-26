const Alias = require('../models/alias');

const registerPage = (req, res, next) => {
    res.render("register");
}


module.exports = {
    registerPage
}