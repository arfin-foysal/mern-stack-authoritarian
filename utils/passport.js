const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const GOOGLE_CLIENT_ID = "419443856924-04hmt7kinto52h7e9j1m2fekkrp5b5k9.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET ,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
     done(null,profile) 
  }
));

passport.serializeUser((user, done) => {
    done(null,user)
})
passport.deserializeUser((user, done) => {
    done(null,user)
})