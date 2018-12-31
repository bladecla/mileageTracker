module.exports = function(passport, LocalStrategy, User){
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) console.error(err);
      done(null, user);
    })
  })
  passport.use(new LocalStrategy({usernameField: "email"}, User.localAuth));
}