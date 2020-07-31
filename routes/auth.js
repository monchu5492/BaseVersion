// app routes for MySQL signup and login

module.exports = function (app, passport) {
  app.post(
    '/login', passport.authenticate('local-login', {
      successRedirect: 'http://localhost:3000/owner/dashboard',
      failureRedirect: 'http://localhost:3000/signup',
      failureFlash: true,
    }),
    (req, res) => {
      res.send({
        token: req.user,
      });
    }
  );

  app.post(
    '/apilogin', passport.authenticate('local-login', {
      session: false,
    }),
    (req, res) => {
      res.send({
        token: req.user,
      });
    },
  );
};
