const User = require('../../models/user');

module.exports.is_auth = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({
        status: res.statusCode,
        msg: 'Not authorized'
    });
};

// module.exports.if_exists = (req, res, next) => {
//     const username = req.body.username.trim();
//     const exists = User.exists({username: username});
//     if (exists != null) res.send('Podana nazwa użytkownika już istnieje');
//     else next();
// };