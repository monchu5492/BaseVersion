import { Router } from "express";
import C from "../constants";
import { v4 } from "uuid";
import { generalPromise } from "./wildAlmondsPromise";
import path from "path";

<<<<<<< HEAD
const mysql = require("mysql2/promise");
=======
const mysql = require("promise-mysql");
>>>>>>> new_branch2

// v01 dispatch and respond works for server
const dispatchAndRespond = (req, res, action) => {
  req.store.dispatch(action);
  res.status(200).send(action.id);
};

const router = Router();

router.get("/games", (req, res) => {
  let games = {};
  mysql
    .createConnection({
      host: "localhost",
<<<<<<< HEAD
      user: "TPatterson5492",
=======
      user: "root",
>>>>>>> new_branch2
      password: "Lunabean1^^",
      database: "wabase01",
    })
    .then((conn) => {
      const result = conn.query(
        'SELECT distinct game_id FROM usergame WHERE user_id="1"'
      );
      console.log(`Here is result${result}`);
      conn.end();
      return result;
    })
    .then((rows) => {
      games = rows;
      console.log(typeof games);
      res.json(games);
      console.log(`Games: ${rows[0]}`);
      // res.status(200).json(req.store.getState().games)
      return rows;
    });
});

router.post("/adduser", (req, res) => {
  const username = req.body.username;
  // const password = req.body.password;
  console.log(`Hello ${username}`);
  return res.redirect("/colors");
});

router.get("/getState", (req, res) =>
  res.status(200).json(req.store.getState())
);

router.get("/userIdTest", (req, res) => {
  if (req.user === undefined) {
    // this is where we will get the userId if the user has been invited
    return res.status(200).json(req.store.getState().invitedUser);
  }

  const userId = JSON.stringify(req.user.user_id);
  return res.status(200).send(userId);
});

router.get("/fetchUserId", (req, res) =>
  dispatchAndRespond(req, res, {
    type: C.FETCH_INVITEDUSERID,
    loading: "true",
  })
);

router.get("/inviteduser/:gameId/:emailId/:email", (req, res) => {
  const gameId = JSON.stringify(req.params.gameId);
  const emailId = JSON.stringify(req.params.emailId);
  const email = JSON.stringify(req.params.email);

  const invitedUser = `SELECT invite_id FROM invitation WHERE game_id=${gameId} AND email_id=${emailId} AND email=${email}`;

  generalPromise(invitedUser).then((payload) => {
    const userId = payload;
    console.log("~!Server Side User id~!");
    console.log(userId);
    console.log("~!Server Side User id~!");

    // const printId = JSON.stringify(userId);
    console.log(
      `fetch parameters are: ${gameId} ${userId[0].invite_id} ${email} `
    );
    // dispatchAndRespond(req, res, {
    //  type: C.FETCH_INVITEDUSERID_SUCCESS,
    //  id: userId[0].invite_id,
    // });
    req.store.dispatch({
      type: C.FETCH_INVITEDUSERID_SUCCESS,
      id: userId[0].invite_id,
    });
    res.status(200).send({ id: userId[0].invite_id });
  });
});

router.post("/foundId/:id", (req, res) =>
  dispatchAndRespond(req, res, {
    type: C.FETCH_INVITEDUSERID_SUCCESS,
    id: req.params.id,
  })
);

router.post("/startUser", (req, res) =>
  dispatchAndRespond(req, res, {
    type: C.FETCH_INVITEDUSERID,
  })
);

router.get("/timer", function(req, res) {
  res.sendFile("testHtml.html", { root: "./src/lib" });
});

export default router;
