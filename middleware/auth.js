// 22 Desember 2024 Geir Hilmersen
const User = require('../models/user');

const authenticate = (req, res, next) => {
    console.info('MOCK AUTHENTICATION MIDDLEWARE IS RUNNING!');
    return next();
}

const authorize = (req, res, next) => {
    console.info('MOCK AUTHORIZATION MIDDLEWARE IS RUNNING!');
    return next();
}

module.exports = {
    authenticate
}