const User = require('../../models/user');

module.exports.is_auth = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).render('message', {
        status: res.statusCode,
        msg: 'Not authorized'
    });
};

module.exports.if_exists = async (req, res, next) => {
    const username = req.body.reg_username.trim();
    const exists = await User.exists({username: username});
    if (exists != null) res.status(409).render('message', {
        status: res.statusCode,
        msg: 'Username already exists'
    })
    else next();
};