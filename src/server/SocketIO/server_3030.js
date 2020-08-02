const app = require("express")();
const mysql = require("mysql2");
const http = require("http").Server(app);
const io = require("socket.io")(http);

let prev_scoreTotal = 0;
let game_expired = null;

/* Creating POOL MySQL connection. */

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "TPatterson5492",
  password: "Lunabean1^^",
  database: "wabase01",
  debug: false,
});

const getGameExpired = function(callback) {
  const gameId = "6da7df34-132f-45a7-9b8e-df253eca749e";
  pool.getConnection((err, connection) => {
    if (err) {
      callback(false);
      return;
    }
    // This is nice, one listener since it occurs at a tournament level

    connection.query(
      "SELECT expired_status FROM tournament WHERE" +
        " tournament_id=(SELECT tournament_id FROM game" +
        " WHERE game_id='6da7df34-132f-45a7-9b8e-df253eca749e')",
      (err, rows) => {
        connection.release();
        // console.log(`SELECT * FROM fbstatus ORDER BY status_id DESC LIMIT 1 resulted in =>`);
        console.log(rows);
        if (rows[0].expired_status !== game_expired) {
          console.log("Here is the row: ", rows[0]);
          io.emit("new_message", rows[0].expired_status);
          game_expired = rows[0].expired_status;
          // callback(true);
          callback(`Game expired? : ${rows[0].expired_status}`);
        }
      }
    );
    connection.on("error", (err) => {
      callback(false);
    });
  });
};

const getScores = function(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(false);
      return;
    }
    // connection.query("SELECT * FROM fbstatus ORDER BY status_id DESC LIMIT 1",function(err,rows){
    connection.query(
      "SELECT SUM(total_score) AS ScoreTotal FROM finalscore " +
        "WHERE game_id ='6da7df34-132f-45a7-9b8e-df253eca749e'",
      (err, rows) => {
        connection.release();
        // console.log(`SELECT * FROM fbstatus ORDER BY status_id DESC LIMIT 1 resulted in =>`);
        console.log(rows);
        if (rows[0].ScoreTotal !== prev_scoreTotal) {
          console.log("Here is the row: ", rows[0]);
          io.emit("new_message", rows[0].ScoreTotal);
          prev_scoreTotal = rows[0].ScoreTotal;
          // callback(true);
          callback(`Total score: ${rows[0].ScoreTotal}`);
        }
      }
    );
    connection.on("error", (err) => {
      callback(false);
    });
  });
};

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/*  This is auto initiated event when Client connects to Your Machine.  */
io.on("connection", (socket) => {
  console.log("A user is connected");
  socket.on("status added", () => {
    setInterval(() => {
      getScores((res) => {
        console.log("Checking Score =>");
        if (res) {
          io.emit("refresh feed", res);
        } else {
          io.emit("error");
        }
      });

      getGameExpired((res) => {
        console.log("Checking Expired =>");
        if (res) {
          io.emit("refresh feed", res);
        } else {
          io.emit("error");
        }
      });
    }, 5000);
  });
});

const add_status = function(status, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(false);
      return;
    }
    connection.query(
      `INSERT INTO \`fbstatus\` (\`s_text\`) VALUES ('${status}')`,
      (err, rows) => {
        connection.release();
        if (!err) {
          callback(true);
        }
      }
    );
    connection.on("error", (err) => {
      callback(false);
    });
  });
};

http.listen(3030, () => {
  console.log("Listening on 3030");
});
