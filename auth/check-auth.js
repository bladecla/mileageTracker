module.exports = function(req, res, next){
    if (req.isAuthenticated()) return next()
    console.log("user is not logged in. Redirecting...");
    res.json({success: false});
}