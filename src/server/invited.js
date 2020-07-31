import express from 'express';
import passport from 'passport';
import { generalPromise } from './wildAlmondsPromise';

const router = express.Router();
router.use(passport.session());

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

module.exports = router;
