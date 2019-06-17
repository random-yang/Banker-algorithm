module.exports = function(req, res, next) {
    console.log(`${req.protocol}://${req.hostname}${req.path}`);
    next();
}