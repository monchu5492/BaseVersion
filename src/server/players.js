import { generalPromise } from './wildAlmondsPromise';

const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const userId = req.user.user_id;
    console.log('Players Time: ', new Date());
    console.log(`players ${userId}`);
    next();
  } else {
    const authFailedMessage = 'Not authenticated';
    res.redirect(`/message/${authFailedMessage}`);
  }
}

router.get('/username', ensureAuthenticated, (req, res) => {
  // user making the query is authenticated
  const authUserId = JSON.stringify(req.user.user_id);

  console.log(`Server Side query for [username]: userId => ${authUserId}`);
  const userNameQuery = (`select firstname, lastname from users where user_id=${authUserId};`);

  generalPromise(userNameQuery).then((payload) => {
    const userName = payload;
    return res.status(200).send(JSON.stringify(userName[0]));
  });
});

module.exports = router;
