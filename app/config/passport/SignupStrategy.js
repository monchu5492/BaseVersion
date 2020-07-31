const Strategy = require('passport-local').Strategy;
const { User } = require('../../../src/server/sequelize');
const bCrypt = require('bcrypt-nodejs');

const salt = bCrypt.genSaltSync(8);

const SignupStrategy01 = new Strategy(
  { passReqToCallback: true }, (
    (req, username, password, done) => {
      // what should be happening once user is signed up?
      const email = req.body.email;
      const user = username;
      const pass = password;

      console.log(user);
      console.log(pass);
      console.log(email);


      // 01:03:00
      // done callback below takes three important parameters
      // 1. Error (as object or message)
      // 2. user detail (username or other from the database)
      // 3. extra data that we want to pass (flash, success, etc.)
      done('', null, null);
    }),
);

const SignupStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (
    (req, email, password, done) => {
      console.log(`'local-signup_v2 called! => req ${req} email ${email} password ${password} done ${done}`);
      console.log(`\n\n${req.body.strength}\n\n`);

      const generateHash = function (toHashPass) {
        return bCrypt.hashSync(toHashPass, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (user) {
          console.log(`That email is already taken ${user}`);
          return done(null, false, {
            message: 'That email is already taken',
          });
        }
        if (req.body.strength !== 'green'){
          return done(null, false, {
            message: 'Password length or characters are not sufficient',
          });
        }
        if (req.body.confirmed !== password) {
          console.log('Passwords do not match');
          return done(null, false, {
            message: 'Passwords do not match',
          });
        }
        const userPassword = generateHash(password);
        const data =
            {
              email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            };

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }

          if (newUser) {
            console.log('User created successfully!!!')
            const cleanUser = newUser;
            delete cleanUser.password;
            return done(null, cleanUser, {
              message: '20000: User created successfully'
            });
          }
          return true;
        });
      });
      return true;
    }),
);

module.exports = SignupStrategy;
