const Strategy = require('passport-local').Strategy;
const { User } = require('../../../src/server/sequelize');
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');

const LoginStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (
    (req, email, password, done) => {
      const isValidPassword = function (userpass, passwd) {
        return bCrypt.compareSync(passwd, userpass);
      };

      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          console.log('Email does not exist');
          return done(null, false, {
            message: 'Incorrect email or password',
          });
        }
        if (!isValidPassword(user.password, password)) {
          console.log('Incorrect password');
          return done(null, false, {
            message: 'Incorrect email or password',
          });
        }
        const userinfo = user.get();

        if (userinfo.status !== 'active') {
          console.log('20108: Account access not available');
          return done(null, false, {
            message: '20108: Account access not available',
          });
        }

        return done(null, userinfo);
      }).catch((err) => {
        console.log('Error:', err);
        return done(null, false, {
          message: '20100: Something went wrong with your Login',
        });
      });
    }),
);

// serialize
passport.serializeUser((user_id, done) => {
  // console.log(`Inside new serializeUser callback. User id is save to the session file store here ${user_id}`);
  done(null, user_id);
});

// deserialize user
passport.deserializeUser((user_id, done) => {
  // console.log('Inside deserializeUser callback');
  // console.log(`The user id passport saved in the session file store is: ${user_id}`);
  done(null, user_id);
});

module.exports = LoginStrategy;
