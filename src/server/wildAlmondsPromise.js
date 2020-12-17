<<<<<<< HEAD
const mysql = require("mysql2/promise");
=======
const mysql = require("promise-mysql");
>>>>>>> new_branch2

export const generalPromise = (userQuery) =>
  new Promise((resolve, reject) => {
    console.log(`General Promise: sql => ${userQuery}`);

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
        const promiseId = conn.query(userQuery);
        conn.end();
        return promiseId;
      })
      .then((rows) => {
        const payload = rows;
        resolve(payload);
      });
  });
