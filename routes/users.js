import async from 'async';
import crypto from 'crypto';
import sendmail from './../src/server/sendMail';

const express = require('express');
const passport = require('../app/config/passport');
const { User } = require('../src/server/sequelize');
const bCrypt = require('bcrypt-nodejs');

const router = express.Router();

const generateHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

/* old way of using based on Express only. No message back to React
router.post('/signup', passport.authenticate('local-signup_v2', {
  successRedirect: 'http://localhost:3000/owner/dashboard',
  failureRedirect: 'http://localhost:3000',
}));
*/

// Passport custom Callback
router.post('/signup_v2', (req, res, next) => {
  console.log(`signup_v2 request for ${req.body.email}`);
  passport.authenticate('local-signup_v2', (error, user, info) => {
    if (error) {
      return res.status(500).json({
        message: 'Oops, something happened',
        error: error.message || 'Internal server error',
      });
    }

    if (info) {
		  console.log(info);
      return res.redirect(`/message/${info.message}`);
    }

    return res.json({
      message: { user },
    });
    // express middleware working in the background to passport authenticate
  })(req, res, next);
});

/*
router.get('/login_v2', (req, res) => {
  console.log('Inside GET /login_v2 callback');
  console.log(req.sessionID);
  res.send('You got the login page!\n');
});
*/

router.post('/login_v2', (req, res, next) => {
  console.log(`login_v2 request for ${req.body.email}`);
  passport.authenticate('local-login_v2', (error, user, info) => {
    if (error) {
      return res.status(500).json({
        message: 'Oops, something happened',
        error: error.message || 'Internal server error',
      });
    }

    if (info) {
      console.log(info);
      return res.redirect(`/message/${info.message}`);
    }

    req.login(user, (err) => {
      console.log('Inside req.login() callback');
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      // console.log(`req.user: ${JSON.stringify(req.user)}`);
      // return res.send('You were authenticated & logged in!\n');
    });

    // return res.redirect('/owner/dashboard');

    // else {
    return res.json({
      // this sends JSON back to React
      message: '20010: Login success',
    });
    // }

    // express middleware working in the background to passport authenticate
  })(req, res, next);

  // }),
  // (req, res) => {
  //	res.send({
  //		token: req.user,
  //	});
  // };
});

// forgot passwords
// https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
router.get('/forgot_v2', (req, res) => {
  res.render('forgot_v2', {
    user: req.user,
  });
});

router.post('/forgot_v2/:email', (req, res, next) => {
  console.log(`Password reset request for ${req.params.email}`);
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      console.log(`Password reset request for ${req.params.email}`);

      User.findOne({ where: { email: req.params.email } }).then((founduser) => {
        if (!founduser) {
          console.log(`No user found with that email address ${req.params.email}`);
          const userWarnMessage = 'No user found with that email address';
          return res.redirect(`/message/${userWarnMessage}`);
        }

        founduser.update({
          about: `Test at ${Date.now()} with ${token}`,
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000, // 1 hour
        });

        console.log(`Returned user email is ${founduser.email}`);
        console.log(`Returned user about is ${founduser.about}`);

        const userSuccessMessage = `Email sent to ${founduser.email} with further instructions.`;

        sendmail(token, founduser);
        return res.redirect(`/message/${userSuccessMessage}`);
      });
    },
  ], (err) => {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset_v3/:token/:password', (req, res) => {
  User.findOne({
    where:
      { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
  }).then((founduser) => {
    if (!founduser) {
      console.log('No user found with that email address');
      req.flash('Error', 'No account with that email address exists.');
      return res.send(req.flash('Error'));
    }

    console.log(`Returned user email is ${founduser.email}`);
    console.log(founduser);

    const userSuccessMessage = 'Success!!  Account password updated.';
    return res.redirect(`/message/${userSuccessMessage}`);
  });
});

router.post('/reset_v3/:token', (req, res) => {
  async.waterfall([
    function (done) {
      User.findOne({
        where:
          { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },
      })
        .then((founduser) => {
          if (!founduser) {
            const resetError = '30400: Password reset token is invalid or has expired.';
            return res.redirect(`/message/${resetError}`);
          }
          console.log(req.body.strength)
          if (req.body.strength !== 'green') {
            const strengthError = 'Password length, characters are not sufficient';
            return res.redirect(`/message/${strengthError}`);
          }
          console.log(req.body.password);
          console.log(req.body.confirmed);
          if (req.body.confirmed !== req.body.password) {
            console.log('Passwords do not match');
            const matchError = 'Password do not match';
            return res.redirect(`/message/${matchError}`);
          }

          // console.log(`Returned user email is ${founduser.email}`);
          // console.log(founduser);
          const userPassword = generateHash(req.body.password);

          founduser.update({
            password: userPassword,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined,
          });

          const userSuccessMessage = '20000: Success! Account password updated.';
          return res.redirect(`/message/${userSuccessMessage}`);
        });
    },

  ], (err) => {
    res.redirect('/');
  });
});

router.get('/logout', (req, res) => {
  if (req.user) {
    console.log(`User logged out ${req.user.user_id}`);
    req.logout();
  }
  res.redirect('http://localhost:3000');
});

router.get('/noauth', (req, res) => {
  if (!req.user) {
    console.log('User was not authorized');
    const notAuth = '10101: Not authorized. Login required.';
    res.redirect(`/message/${notAuth}`);
    // res.redirect('http://localhost:3000/login');
  }
  return res.status(200).send(req.userId);
});

module.exports = router;
