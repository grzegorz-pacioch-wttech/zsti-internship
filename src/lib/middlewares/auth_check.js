module.exports.is_auth = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(401).json({
        status: res.statusCode,
        msg: 'Not authorized'
    });
};