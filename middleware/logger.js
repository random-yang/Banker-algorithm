module.exports = function(req, res, next) {
    console.log(`${req.protocol}://${req.host}${req.path}`);
    next();
}