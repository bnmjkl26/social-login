const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


//google
passport.use(
  new GoogleStrategy({
    clientID: 'client ID',
    clientSecret: 'client secret',
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    var jsonProfile ={};
    jsonProfile.email = profile.emails[0].value;
    jsonProfile.familyName = profile.name.familyName;
    jsonProfile.givenName = profile.name.givenName;
    return done(null, jsonProfile);
  })
);

//facebook
passport.use(new FacebookStrategy({
  clientID: 'app id',
  clientSecret: 'app secret',
  callbackURL: 'https://strong-hound-55.localtunnel.me/auth/facebook/callback',//change this URL to your callback URL
  passReqToCallback: true,
  profileFields: ['id', 'first_name', 'last_name', 'email'],
}, (req, accessToken, refreshToken, profile, done) => {
  var jsonProfile ={};  
  jsonProfile.email = profile.emails[0].value;
  jsonProfile.familyName = profile.name.familyName;
  jsonProfile.givenName = profile.name.givenName;
  
  return done(null,jsonProfile)
}));



//////////////
passport.serializeUser(function (user, done) {
  //console.log("serializeUser : " + user)
  //console.log(user)
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  //console.log("deserializeUser : " +obj)
  //console.log(obj)
  done(null, obj);
});