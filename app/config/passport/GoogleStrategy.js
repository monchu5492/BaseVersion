
import { login } from '../../../src/actions';

const bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;

  passport.use('local-sxignup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },


    ((req, email, password, done) => {
      // console.log(`'local-sixgnup called! => req ${req} email ${email} password ${password} done ${done}`);
      if (req.body.confirmed !== password) {
        console.log(`Passwords do not match`);
        return done(null, false, {
          message: 'Passwords do not match',
        });
      }

      const generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
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
            return done(null, newUser);
          }
        });
      });
    }),
  ));

  // LOCAL SIGNIN
  passport.use('local-login', new LocalStrategy(

    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },

    ((req, email, password, done) => {
      console.log('Inside local strategy callback');
      // console.log(`req ${req} email ${email} password ${password} done ${done}`);
      // const loginUser = user;
      // console.log(`Local strategy returned true!: [ ${loginUser} ]`);
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
            message: 'Email does not exist',
          });
        }
        if (!isValidPassword(user.password, password)) {
          console.log('Incorrect password');
          return done(null, false, {
            message: 'Incorrect password.',
          });
        }
        const userinfo = user.get();
        const user_id = user.user_id;
        console.log(`Here is userinfo: ${user_id}`);

        req.login(user_id, (err) => {
          // res.redirect('/');
        });

        return done(null, userinfo);
      }).catch((err) => {
        console.log('Error:', err);
        return done(null, false, {
          message: 'Something went wrong with your Signin',
        });
      });
    }),
  ));


  // serialize
  passport.serializeUser((user_id, done) => {
    done(null, user_id);
  });

  // deserialize user
  passport.deserializeUser((user_id, done) => {
    done(null, user_id);
  });
};

