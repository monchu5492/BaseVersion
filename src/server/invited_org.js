import express from 'express';
import passport from 'passport';
// import fetch from 'isomorphic-fetch';
import { generalPromise } from './wildAlmondsPromise';
import storeFactory from '../store/index';
import sendinvite from './sendInvite';
import Countdown from '../components/ui/Countdown';

import ConnectToTestSocket from './SocketIO/connectToTest';
import C from '../constants';

let allAlmonds;

const serverStore = storeFactory();
// https://stackoverflow.com/questions/16434893/node-express-passport-req-user-undefined

const router = express.Router();
router.use(passport.session());


function getPicksRemaining(object) {
  let length = 0;
  for (const key in object) {
    if (object[key].isDropped === null) {
      ++length;
    }
  }
  return length;
}

const socketTest = ConnectToTestSocket;

console.log(socketTest);

function checkInvited(query, type) {
  const targetVar = type;
  let exists;
  let blocked;
  let info;

  return new Promise((resolve) => {
    generalPromise(query).then((rows) => {
      if (targetVar === 'existCheck') {
        exists = rows;
        console.log('Exists:');
        console.log(exists);
        if (exists[0]) {
          resolve(info = `30100: Participant already added to this game id:${exists[0].user_id}`);
        } else {
          console.log('User not part of the game already');
          resolve(info);
        }
      }
      if (targetVar === 'noEmail') {
        blocked = rows;
        console.log('Blocked:');
        console.log(blocked);
        if (blocked[0]) {
          resolve(info = `30900: ${blocked[0].email} has asked not to participate in WildAlmonds events`);
        } else {
          console.log('User ok for participation check');
          resolve(info);
        }
      }
    });
  });
}

// used by Almonds to decorate if the game is expired
const getExpire = (isDroppedSet, gameId) => new Promise(((resolve, reject) => {
  let i;
  const passedElements = isDroppedSet;

  for (i = 0; i < passedElements.length; i++) {
    passedElements[i].isExpired = null;
  }


  // being used!
  const gameExpire = (`select expired_status from tournament where 
                      tournament_id=(select tournament_id from game where game_id=${gameId})`);

  console.log(`!!!!!!! ~Game Expire~ !!!!!! ${gameExpire} \n\n\n payload with isExpired\n`);
  console.log(passedElements);
  console.log('\n\n\n');

  generalPromise(gameExpire).then((payload) => {
    // const expireDate = rows;
    // generalPromise(checkTournamentExpiration).then((payload) => {
    const expireStatus = payload;
    const expirePayload = expireStatus[0].expired_status;

    console.log('Expire Payload!!!!');
    console.log(expirePayload);
    console.log(typeof expirePayload);


    for (i = 0; i < passedElements.length; i++) {
      passedElements[i].isExpired = expirePayload;
      console.log('Can we pass in colors here for Almond?')
      console.log(allAlmonds[i]);
      passedElements[i].almond_available = allAlmonds[i].almond_available;
      passedElements[i].almond_dropped = allAlmonds[i].almond_dropped;
      // mapElements[foundPicks[i].pick_almond_id - 1].isExpired = expireStatus;
    }
    console.log('\n\n\n');
    console.log(passedElements);
    const picksRemain = getPicksRemaining(passedElements);

    console.log(`\n\n\nPicks Remain => ${picksRemain} \n\n\n`);

    // Create a single object with both almonds and picksRemain
    const getItAll = {
      almonds: passedElements,
      picksRemain,
    };
    resolve(getItAll);
  });
}));

// used by Almonds to get image, available and dropped colors
const getAlmondDetails = () => new Promise(((resolve, reject) => {
  // console.log(almonds);

  const targetAlmonds = ('SELECT * FROM almond');

  console.log('!  ** !!!!!! ~Target Decoration for Almonds~ !!!! ** !');
  setTimeout(() => {
    generalPromise(targetAlmonds).then((rows) => {
      const almondDetail = rows;
      // console.log(almondDetail);
      allAlmonds = almondDetail;
      resolve(almondDetail);
    }, 250);
  });
}));

// used by Almonds to decorate what has been picked
const getPicks = (userId, gameId) => new Promise(((resolve, reject) => {
  const targetPicks = (`SELECT * FROM invitepicks WHERE pick_user_id=${userId} AND
                        pick_game_id=${gameId}`);

  // console.log(`!!!!!!! ~Target Picks~ !!!!!! ${targetPicks}`);

  generalPromise(targetPicks).then((rows) => {
    const picks = rows;
    resolve(picks);
  });
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const userId = req.user.user_id;
    console.log('Invited Time: ', new Date());
    console.log(`invited_api ${userId}`);
    next();
  } else {
    const noAuthMsg = 'You must be logged in to use this feature';
    req.flash('Not authorized');
    // res.redirect('/noauth');
    // res.redirect('/noauth');
    // return true;
  }
}

// 07302020
const totalAvailableInvites = mapInvitesToTournament => new Promise(((resolve, reject) => {
  console.log('map tournament function:');
  console.log(mapInvitesToTournament);


  for (let i = 0; i <= mapInvitesToTournament.length; i++) {
    if (mapInvitesToTournament[i]) {
      for (let j = 0; j <= mapInvitesToTournament[i].gameNames.length; j++) {
        // console.log(`j ${j}`);
        if (mapInvitesToTournament[i].gameNames[j]) {
          // console.log('Found tournament!! ');
          if (mapInvitesToTournament[i].totalAvailableInvites) {
            console.log(`Available: ${mapInvitesToTournament[i].totalAvailableInvites}`);
            mapInvitesToTournament[i].totalAvailableInvites = mapInvitesToTournament[i].totalAvailableInvites +
              mapInvitesToTournament[i].gameNames[j].available;
          } else {
            mapInvitesToTournament[i].totalAvailableInvites = mapInvitesToTournament[i].gameNames[j].available;
          }
        }
      }
    }
  }
  resolve(mapInvitesToTournament);
}));

// 07302020
const gameAvailableInvites = mapInvitesToGames => new Promise(((resolve, reject) => {
  mapInvitesToGames.available.map((element) => {
    for (let i = 0; i <= mapInvitesToGames.needInvites.length; i++) {
      if (mapInvitesToGames.needInvites[i]) {
        for (let j = 0; j <= mapInvitesToGames.needInvites[i].gameNames.length; j++) {
          if (mapInvitesToGames.needInvites[i].gameNames[j]) {
            if (mapInvitesToGames.needInvites[i].gameNames[j].id === element.id) {
              mapInvitesToGames.needInvites[i].gameNames[j].available = element.available;
            }
          }
        }
      }
    }
    return mapInvitesToGames;
  });

  resolve(mapInvitesToGames.needInvites);
}));

// delete the invite from invites once it has been sent
router.post('/deletepending/:gameId/:inviteId', (req, res) => {
  const deleteCommand = (`DELETE FROM invites WHERE game_id="${req.params.gameId}" 
                        AND invite_id="${req.params.inviteId}"`);

  console.log(`Delete Command => ${deleteCommand}`);

  generalPromise(deleteCommand)
    .then((payload) => {
      console.log(`Delete pending invite complete ${payload}`);
    });
  return res.status(200).json(deleteCommand);
});

// 07302020
const mapGameInvites = needInvites => new Promise(((resolve, reject) => {
  console.log('mapGameInvited Here are the games without invites');
  console.log(needInvites);

  let i;
  const promises = [];

  function gameInvitesAvailableAsync(gameId) {
    const inviteAvailable = ('select * from invites where game_id=' + `"${gameId}"`);

    return new Promise((resolve) => {
      generalPromise(inviteAvailable).then((rows) => {
        const invitePayload = rows;
        resolve(invitePayload);
      });
    });
  }

  for (i = 0; i < needInvites.length; i++) {
    if (needInvites[i]) {
      for (let j = 0; j <= needInvites[i].gameNames.length; j++) {
        if (needInvites[i].gameNames[j]) {
          console.log('Game Ids from gameNames??');
          console.log(needInvites[i].gameNames[j].id);
          promises.push(gameInvitesAvailableAsync(needInvites[i].gameNames[j].id));
        }
      }
    }
  }

  const gameInvites = [];
  Promise.all(promises)
    .then((results) => {
      // console.log('Do these have the number of invites?');
      console.log(results);

      for (i = 0; i < results.length; i++) {
        if (results[i][0]) {
          console.log(`Number of invites available for ${results[i][0].game_id}: ${results[i].length}`);
          gameInvites.push({ id: results[i][0].game_id, available: results[i].length });
        }
      }

      console.log('Here is the needInvites object');
      const availableWithoutInvites = {
        available: gameInvites,
        needInvites,
      };


      console.log(availableWithoutInvites);
      console.log('Resolve ran here: ');
      // resolve(needInvites); // works and renders the page without available invites
      resolve(availableWithoutInvites);
    });
}));


const mapGameName = (needGameName, gameId) => new Promise(((resolve, reject) => {
  const justInvites = needGameName;

  if (justInvites[0]) {
    const getGameName = (`select game_name from game where game_id=${gameId}`);
    // return new Promise((resolve) => {
    generalPromise(getGameName).then((rows) => {
      const gameName = rows;
      const availableWithGameName = {
        name: gameName,
        justInvites,
      };
      console.log(availableWithGameName);
      resolve(availableWithGameName);
    });
  } else {
    const noInvites = 'No invites remaining. Order more.';
    const noGameInvitesLeft = {
      name: 'No Invites found',
      noInvites,
    };

    resolve(noGameInvitesLeft);
  }
  // });
}));

// 07302020
const mapTournamentGames = needGames => new Promise(((resolve, reject) => {
  const justGames = needGames;

  function gameInvitesAvailableAsync(gameId) {
    const inviteAvailable = ('select * from invites where game_id=' + `"${gameId}"`);


    return new Promise((resolve) => {
      generalPromise(inviteAvailable).then((rows) => {
        const picks = rows;
        resolve(picks);
      });
    });
  }

  function getGamesAsync(tourneyId) {
    const targetGames = ('SELECT game_name, game_id, tournament_id FROM game WHERE tournament_id=' + `"${tourneyId}"`);

    return new Promise((resolve) => {
      generalPromise(targetGames).then((rows) => {
        const tourneyGames = rows;
        // console.log('Are there two games here? ');
        // console.log(picks);
        resolve(tourneyGames);
      });
    });
  }

  function games() {
    let i;
    const promises = [];
    const newGames = [];

    for (i = 0; i < justGames.length; ++i) {
      promises.push(getGamesAsync(justGames[i].tournament_id));
    }

    Promise.all(promises)
      .then((results) => {
        for (i = 0; i < results.length; ++i) {
          const gameName = results[i][0].game_name;
          const gameId = results[i][0].game_id;
          const tourneyId = results[i][0].tournament_id;
          const iterator = justGames.values();

          for (const value of iterator) {
            if (value.tournament_id === tourneyId) {
              if (!value.gameNames) {
                value.gameNames = [];
              }
              if (results[i][1]) {
                console.log('Two games!!! \n\n');
                console.log(`\t GameName: ${results[i][1].game_name}`);
                console.log(`\t GameId: ${results[i][1].game_id}`);
                console.log('\n\n');
                value.gameNames.push({ id: results[i][1].game_id, name: results[i][1].game_name });
              }
              value.gameNames.push({ id: gameId, name: gameName });
              value.gameId = gameId;
              // good logging info
              // console.log(value);
              newGames.push(value);
            }
          }
        }
      }).then(() => {
        resolve(newGames);
      })
      .catch((e) => {
        console.log(`Errors: ${e}`);
      });
  }
  games();
}));

// 70302020
const decorateTournamentsPromise = target => new Promise((resolve, reject) => {
  generalPromise(target)
    .then(withTournaments => mapTournamentGames(withTournaments))
    .then(withGames => mapGameInvites(withGames))
    .then(getAvailable => gameAvailableInvites(getAvailable))
    .then(totalAvailable => totalAvailableInvites(totalAvailable))
    .then((mapElements) => {
      resolve(mapElements);
    });
});

router.get('/invitedfrom/:gameId', (req, res) => {
  const gameId = JSON.stringify(req.params.gameId);

  const fromAddress = (`select email from users where user_id=(select tournament_owner from tournament 
                        where tournament_id=(select tournament_id from game where 
                        game_id=${gameId}));`);

  generalPromise(fromAddress).then(((withFromStatus) => {
    const emailAddress = withFromStatus;
    console.log('~!Server Side emailAddress~!');
    console.log(emailAddress[0].email);
    console.log('~!Server Side emailAddress~!');

    res.status(200).send({ email: emailAddress[0].email });
    // res.status(200).json(withFromStatus));
  }));
});

router.get('/owner', ensureAuthenticated, (req, res) => {
  // add the auth test here
  if (!req.user) {
    console.log('User was not authorized');
    const notAuth = '10100: Not authorized. Login required.';
    res.redirect(`/message/${notAuth}`);
    // res.redirect('http://localhost:3000/login');
  } else {
    const ownedTournaments = (`SELECT tournament_id, tournament_name, tournament_description, tournament_status, 
                              expires, expired_status
                              FROM tournament WHERE tournament_owner=${req.user.user_id}`);

    decorateTournamentsPromise(ownedTournaments).then(withGameStatus =>
      res.status(200).json(withGameStatus));
  }
});

router.get('/available/:gameId', ensureAuthenticated, (req, res) => {
  const gameId = JSON.stringify(req.params.gameId);
  let pendingInvites = {};

  const availableInvites = (`SELECT * FROM invites WHERE NOT EXISTS
                            (SELECT 1 FROM invitation WHERE invitation.invite_id=invites.invite_id)
                            AND game_id IN (SELECT game_id FROM gameadmin WHERE user_id=${req.user.user_id} 
                            AND game_id=${gameId})`);

  generalPromise(availableInvites)
    .then(withInvites => mapGameName(withInvites, gameId))
    .then((withName) => {
      pendingInvites = withName;

      console.log('Pending Invites:');
      console.log(pendingInvites);

      let i;
      if (pendingInvites.justInvites) {
        for (i = 0; i < pendingInvites.justInvites.length; i++) {
          pendingInvites.justInvites[i].marker = i + 1;
          pendingInvites.justInvites[i].status = 'Available';
          pendingInvites.justInvites[i].name = pendingInvites.name[0].game_name;
        }
      }
    }).then(() => {
      if (pendingInvites.justInvites) {
        return res.status(200).send(JSON.stringify(pendingInvites.justInvites));
      }

      return res.status(200).send(null);
    });
});

router.get('/userIdTest', (req, res) => {
  // get the email game they are playing
  // invite user id is generated from here
  let message = 'No authenticated user';

  if (req.user === undefined) {
    message = serverStore.getState().invitedUser.id;
    return res.status(200).send(message);
  }

  const userId = JSON.stringify(req.user.user_id);
  return res.status(200).send(userId);
});

router.get('/invitedalmonds/:gameId/:userId', (req, res) => {
  // TBD: Need to add the tournamentId as a parameter
  // TBD: Issue with ensureAuthenticated and using a switch for gameId?
  const userId = JSON.stringify(req.params.userId);
  const gameId = JSON.stringify(req.params.gameId);

  // TBD:  Add to logger
  // console.log(`Server Side query for [targetalmonds]: userId => ${userId}   gameId => ${gameId}`);

  const targetAlmonds = (`SELECT DISTINCT almond_id FROM tourneyalmond WHERE 
                          tournament_id=(SELECT tournament_id from game where game_id='${req.params.gameId}')`);

  decorateAlmondsPromise(targetAlmonds, userId, gameId).then(withDropStatus =>
    res.status(200).json(withDropStatus));
});


router.get('/checkuser/:email', (req, res) => {
  const email = JSON.stringify(req.params.email);

  const checkNoEmailList = (`SELECT * FROM /nocontact WHERE email=${email}`);
  // const checkBlackList = ('SELECT * FROM nocontact WHERE email="andytest@blah.com"');

  generalPromise(checkNoEmailList).then((invitedUserCheck) => {
    console.log('\n\nInvited User Status:\n\n');
    console.log(invitedUserCheck);
    console.log('\n\n');
    res.status(200).json(invitedUserCheck);
  });
});


router.get('/dupinvite/:gameId/:email', (req, res) => {
  const gameId = JSON.stringify(req.params.gameId);
  const email = JSON.stringify(req.params.email);

  const checkForDup = (`SELECT * FROM inviteduser WHERE email=${email} and game_id=${gameId}`);
  // const checkBlackList = ('SELECT * FROM nocontact WHERE email="andytest@blah.com"');

  generalPromise(checkForDup).then((invitedDupCheck) => {
    console.log('\n\nInvited User Status:\n\n');
    console.log(invitedDupCheck);
    console.log('\n\n');
    res.status(200).json(invitedDupCheck);
  });
});

router.post('/writeInviteUser/:userId/:gameId/:gameName/:email/:emailId/:inviteId', (req, res) => {
  const userId = JSON.stringify(req.params.userId);
  const gameId = JSON.stringify(req.params.gameId);
  const gameName = JSON.stringify(req.params.gameName);
  const email = JSON.stringify(req.params.email);
  const emailId = JSON.stringify(req.params.emailId);
  const inviteId = JSON.stringify(req.params.inviteId);

  const promises = [];
  let inviteError = 'Sent';

  // user already added?
  const checkForDup = (`SELECT * FROM inviteduser WHERE email=${email} and game_id=${gameId}`);

  // user is not participating in WildAlmonds events
  const checkNoEmailList = (`SELECT * FROM nocontact WHERE email=${email}`);

  // all good
  /*
  const addInvitedUser = (`INSERT INTO inviteduser VALUES (
    ${userId},
    ${gameId},
    ${gameName},
    ${email},
    NULL,
    NULL)`);
	*/

  const addInvitedUser = (`INSERT INTO inviteduser VALUES (
    ${userId},
    ${gameId},
    ${gameName},
    ${email},
    NULL,
    NULL)`);

  const addInvitation = (`INSERT INTO invitation VALUES (
    ${gameId},
    ${gameName},
    ${emailId},
    ${userId},
    ${email},
    NULL,
    NOW(),
    NULL,
    NULL)`);

  const deleteCommand = (`DELETE FROM invites WHERE game_id=${gameId} 
                        AND invite_id=${inviteId}`);

  const link = (
    `https\://wildalmonds.com/events/invitation/${gameId}/${emailId}/${email}`
  );


  // check here if the user is in the nocontact blacklist

  promises.push(checkInvited(checkForDup, 'existCheck'));
  promises.push(checkInvited(checkNoEmailList, 'noEmail'));

  Promise.all(promises)
    .then((invitedUserStatus) => {
    	console.log(`Herre start!!! [${invitedUserStatus}]`);

      invitedUserStatus.map((result) => {
        if (/^30/.test(result)) {
          console.log(`Hammer to fall!!!! ${invitedUserStatus}`);
          console.log(result);
          inviteError = invitedUserStatus;
          // res.status(200).json(invitedUserStatus);
        }
        return invitedUserStatus;
        // console.log(`\n\n\n\n\nSend invite error here:   /message/${inviteError}\n\n\n\n\n`);
        // return res.redirect(`/message/${inviteError}`);
      });
    })
    .then(() => {
    	console.log(`\n\n\n Invite Error:: ${inviteError} \n\n\n`);

      if (inviteError === 'Sent') {
        generalPromise(addInvitedUser)
          .then(() => {
            generalPromise(addInvitation);
          })
          .then(() => {
            generalPromise(deleteCommand)
              .then((inviteOk) => {
                sendinvite(email, link);
                inviteError = `Sent! ${inviteOk}`;
                // res.status(200).json(inviteOk);
              })
              .then(() => {
                // fetch the invitations here
              });
          });
      }

      if (inviteError !== false) {
        console.log('\n\n\n\n\n Send invite not available\n\n\n\n\n');
        // return res.redirect(`/message/${inviteError}`);
      }
    })
    .then(() => {
      // Sent ok, refresh invites

      if (/^,30/.test(inviteError) || /^30/.test(inviteError)) {
        console.log(`\n\n\nInvite Error ${inviteError}\n\n\n`);
        return res.redirect(`/message/${inviteError}`);
      }

      const successSend = `Send message for ${email}`;
      // const targetGame = gameId.replace(/['"]+/g, '');
      return res.redirect(`/message/${successSend}`);
    });
});


router.post('/writeInviteUser_v1/:userId/:gameId/:gameName/:email', (req, res) => {
  const userId = JSON.stringify(req.params.userId);
  const gameId = JSON.stringify(req.params.gameId);
  const gameName = JSON.stringify(req.params.gameName);
  const email = JSON.stringify(req.params.email);

  // user already added?
  const checkForDup = (`SELECT * FROM inviteduser WHERE email=${email} and game_id=${gameId}`);

  // user is not participating in WildAlmonds events
  const checkNoEmailList = (`SELECT * FROM nocontact WHERE email=${email}`);

  // all good
  const addInvitedUser = (`INSERT INTO inviteduser VALUES (
    ${userId},
    ${gameId},
    ${gameName},
    ${email},
    NULL,
    NULL)`);


  // check here if the user is in the nocontact blacklist

  generalPromise(addInvitedUser).then((invitedUserStatus) => {
    // console.log('\n\nInvited User Status:\n\n');
    // console.log(invitedUserStatus);
    // console.log('\n\n')

    res.status(200).json(invitedUserStatus);
  });
});

router.post('/writeInvitation/:gameId/:gameName/:emailId/:userId/:email', (req, res) => {
  const gameId = JSON.stringify(req.params.gameId);
  const gameName = JSON.stringify(req.params.gameName);
  const emailId = JSON.stringify(req.params.emailId);
  const userId = JSON.stringify(req.params.userId);
  const email = JSON.stringify(req.params.email);

  const addInvitation = (`INSERT INTO invitation VALUES (
    ${gameId},
    ${gameName},
    ${emailId},
    ${userId},
    ${email},
    NULL,
    NULL,
    NOW(),
    NULL)`);

  generalPromise(addInvitation).then((invitationStatus) => {
    // console.log('\n\nInvitation Status:\n\n');
    // console.log(invitationStatus);
    // console.log('\n\n')
    res.status(200).json(invitationStatus);
  });
});

router.get('/invitedsquares/:gameId/:userId', (req, res) => {
  // Need to add the tournamentId as a parameter
  const userId = req.params.userId;
  const gameId = req.params.gameId;

  // TBD
  console.log(`Server Side query for [invitedSquares]: userId => ${userId} gameId => ${gameId}`);

  const targetSquares = (`SELECT * FROM square WHERE square_id IN (SELECT DISTINCT square_id from tourneysquare where 
                          tournament_id=(SELECT tournament_id from game where game_id='${gameId}'))`);

  decorateSquaresPromise(targetSquares, userId, gameId).then(withDropStatus =>
    res.send(withDropStatus));
});

router.post('/setaccepted/:gameId/:emailId', (req, res) => {
  const writeAccepted = {
    game: req.params.gameId,
    emailId: req.params.emailId,
    time: 'NOW()',
  };

  console.log(`writeAccepted => ${writeAccepted}`);

  const acceptUpdate = (`UPDATE invitation SET accepted_time=(${writeAccepted.time}) 
                      WHERE invite_id='${writeAccepted.emailId}' 
                      AND game_id='${writeAccepted.game}';`);

  generalPromise(acceptUpdate)
    .then((payload) => {
      console.log(`Accept complete ${payload}`);
    });
  return res.status(200).json(acceptUpdate);
});

router.get('/getpicks/:gameId', (req, res) => {
  // get the picks based on the game they are playing
  // user making the query is authenticated
  const authUserId = JSON.stringify(req.user.user_id);

  const targetPicks = (`SELECT * FROM invitepicks WHERE pick_user_id=${authUserId} and pick_game_id="${req.params.gameId}"`);
  console.log(`targetPicks => ${targetPicks}`);

  generalPromise(targetPicks).then((payload) => {
    const withPicksArray = setPicksArray(payload, targetPicks);

    console.log(`With Drop Status ${JSON.stringify(withPicksArray)}`);
    res.status(200).json(withPicksArray);
  });
});

module.exports = router;
