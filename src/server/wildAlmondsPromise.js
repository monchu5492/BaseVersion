const mysql = require("promise-mysql");

export const generalPromise = (userQuery) =>
  new Promise((resolve, reject) => {
    console.log(`General Promise: sql => ${userQuery}`);

    mysql
      .createConnection({
        host: "localhost",
        user: "root",
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
