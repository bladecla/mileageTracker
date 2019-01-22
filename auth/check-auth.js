module.exports = function(req, res, next){
    console.log("checking authentication status")
    if (req.isAuthenticated()) return next()
    console.log("user is not logged in.");
    res.json({status: 401});
}