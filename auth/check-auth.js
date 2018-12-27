module.exports = function(req, res, next){
    if (req.isAuthenticated()) return next()
    console.log("user is not logged in. Redirecting...");
    res.send("You are not logged in");
}