const passport = require('passport');


// import all the strategies
const SignupStrategy = require('./SignupStrategy');
const LoginStrategy = require('./LoginStrategy');

passport.use('local-signup_v2', SignupStrategy);
passport.use('local-login_v2', LoginStrategy);

module.exports = passport;
