const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require ('dotenv').config

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
    // `${uriServer}${process.env.GOOGLE_CALLBACK}`
},

function(accessToken, refreshToken, profile, done){
    console.log("passport function", profile)
    done(null, profile)
}
));