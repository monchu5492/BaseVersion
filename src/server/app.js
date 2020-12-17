import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logmorgan from "morgan";
// import async from 'async';
import flash from "express-flash";
import { v4 } from "uuid";
import path from "path";
import partials from "express-partials";
import fs from "fs";
import { Provider } from "react-redux";
import { compose } from "redux";
import http from "http";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import apidev from "./dev-api";
import App from "../components/App";
import storeFactory from "../store/index";
import initialState from "../../data/initialWAState.json";
// import sendinvite from './../server/sendInvite';

const MySQLStore = require("express-mysql-session")(session);
const socketServer = require("socket.io");
const passport = require("../../app/config/passport");

const staticCSS = fs.readFileSync(
  path.join(__dirname, "../../dist/assets/bundle.css")
);
const fileAssets = express.static(path.join(__dirname, "../../dist/assets"));

const adaptation = require("./adaptation");
const invited = require("./invited");
const players = require("./players");
<<<<<<< HEAD
=======
const blogs = require("./blogs");
>>>>>>> new_branch2

const usersRouter = require("../../routes/users");

// This is where the store is loaded
const serverStore = storeFactory(true, initialState);
// console.log('current state in app', serverStore.getState());

const env = require("dotenv").load();

// load passport strategies
const models = require("../../app/models");
require("../../app/config/passport/passport.js")(passport, models.user);

// create the server
const app = express();

app.use(logmorgan("dev"));
// For Bodyparser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/x-www-form-urlencoded");
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// for socket IO
const httpServer = http.createServer(app);
const io = socketServer(httpServer);

// For Logging
const logger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
};

app.use(logger);

// https://www.youtube.com/watch?v=gTowbsNPp9I
const options = {
  host: "localhost",
  port: 3306,
<<<<<<< HEAD
  user: "TPatterson5492",
=======
  user: "root",
>>>>>>> new_branch2
  password: "Lunabean1^^",
  database: "wabase01",
};

const sessionStore = new MySQLStore(options);

// For Passport

app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      if (req && req.body.email) {
        console.log(`${req.body.email}`);
      }
      return v4(); // use UUIDs for session IDs
    },
    store: sessionStore,
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false, httpOnly: false }
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const routes = require("../../routes");
// below line is needed!!
const authRoute = require("../../routes/auth.js")(app, passport);

app.use(routes);
app.use(require("../../routes/users"));

app.use(partials());

const buildHTMLPage = ({ html, state }) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>WildAlmonds</title>
        <link rel="icon" href="../../dist/assets/faviconB.ico">
        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`;

const renderComponentsToHTML = ({ url, store }) => ({
  state: store.getState(),
  html: renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  ),
});

const makeClientStoreFrom = (store) => (url) => ({
  url,
  store: storeFactory(false, store.getState()),
});

const htmlResponse = compose(
  buildHTMLPage,
  renderComponentsToHTML,
  makeClientStoreFrom(serverStore)
);

const respond = ({ url }, res) => res.status(200).send(htmlResponse(url));

const addStoreToRequestPipeline = (req, res, next) => {
  req.store = serverStore;
  next();
};

app.use(addStoreToRequestPipeline);

// Sync Database
models.sequelize
  .sync()
  .then(() => {
    console.log("Nice! Database looks fine");
  })
  .catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
  });

export default express()
  .use(fileAssets)
  .use(respond);

app.get("/message/:sendMsg", (req, res) => {
  const messageId = JSON.stringify(req.params.sendMsg);
  // const messageId = 'Hello Test';
  res.status(200).send(messageId);
});

app.use("/uploads", express.static(path.join("uploads")));
app.use("/authentication", usersRouter);
app.use("/adaptation", adaptation);
app.use("/apidev", apidev);
app.use("/invited", invited);
app.use("/players", players);
<<<<<<< HEAD
=======
app.use("/blogs", blogs);
>>>>>>> new_branch2

const PORT = 4500;

httpServer.listen(PORT, () => {
  console.log(`Express running at http://localhost:${PORT}`);
});

/** *************************************************************************************** */
/* Socket logic starts here																   */
/** *************************************************************************************** */
const connections = [];
io.on("connection", (socket) => {
  console.log(`Connected to Socket!!${socket.id}`);
  connections.push(socket);
  socket.on("disconnect", () => {
    console.log(`Disconnected - ${socket.id}`);
  });

  const cursor = todoModel.find(
    {},
    "-_id itemId item completed",
    (err, result) => {
      if (err) {
        console.log("---Gethyl GET failed!!");
      } else {
        socket.emit("initialList", result);
        console.log("+++Gethyl GET worked!!");
      }
    }
  );
  // 		.cursor()
  // cursor.on('data',(res)=> {socket.emit('initialList',res)})

  socket.on("addItem", (addData) => {
    const todoItem = new todoModel({
      itemId: addData.id,
      item: addData.item,
      completed: addData.completed,
    });

    todoItem.save((err, result) => {
      if (err) {
        console.log(`---Gethyl ADD NEW ITEM failed!! ${err}`);
      } else {
        // connections.forEach((currentConnection)=>{
        // 	currentConnection.emit('itemAdded',addData)
        // })
        io.emit("itemAdded", addData);

        console.log({ message: "+++Gethyl ADD NEW ITEM worked!!" });
      }
    });
  });

  socket.on("markItem", (markedItem) => {
    let condition = { itemId: markedItem.id },
      updateValue = { completed: markedItem.completed };

    todoModel.update(condition, updateValue, (err, result) => {
      if (err) {
        console.log(`---Gethyl MARK COMPLETE failed!! ${err}`);
      } else {
        // connections.forEach((currentConnection)=>{
        // 	currentConnection.emit('itemMarked',markedItem)
        // })
        io.emit("itemMarked", markedItem);

        console.log({ message: "+++Gethyl MARK COMPLETE worked!!" });
      }
    });
  });
});
