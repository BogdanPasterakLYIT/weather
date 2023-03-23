const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "weather2023",
  port: 3307, // standard is 3306
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("api weather2023 db work");
});

app.get("/sites", (req, res) => {
  const objectPar = req.body;
  // console.log(objectPar);
  const sqlQuery = "SELECT * FROM sites";
  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(rows);
  });
});

app.get("/api/room", (req, res) => {
  const sqlQuery = "SELECT * FROM room";

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(rows);
  });
});

app.get("/api/extra", (req, res) => {
  const sqlQuery = "SELECT * FROM extra";

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(rows);
  });
});

app.post("/api/pay", (req, res) => {
  const id = req.body.id_reservation;

  const sqlQuery = `UPDATE reservation SET fee_status=1 WHERE id_reservation=${id}`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

app.post("/api/deleteRes", (req, res) => {
  const id = req.body.id_reservation;

  const sqlQuery = `DELETE FROM reservation WHERE id_reservation=${id}`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

app.post("/api/extra", (req, res) => {
  const id_r = req.body.id_r;
  const id_e = req.body.id_e;
  const qua = req.body.qua;

  const multi = `(${id_r},${id_e})`;
  let sqlQuery = `INSERT INTO orders (id_reservation, id_extra) VALUES `;
  for (let i = 0; i < qua; i++) sqlQuery += i ? `, ` + multi : multi;
  sqlQuery += `;`;
  // console.log(sqlQuery);

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

app.post("/api/room", (req, res) => {
  const start = req.body.start;
  const stop = req.body.stop;

  // console.log(start, stop);

  const sqlQuery =
    "SELECT * FROM `room` WHERE `id_room` NOT IN (SELECT `id_room` FROM `reservation` WHERE `start`<=? AND `stop`>?);";
  db.query(sqlQuery, [stop, start], (err, rows) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else {
      // console.log(rows.length);
      res.send(rows);
    }
  });
});

app.post("/api/reservation", (req, res) => {
  const cust = req.body.cust;
  const room = req.body.room;
  const fee = req.body.fee;
  const reser = req.body.reser;

  // console.log(`filters: >${cust}<>${room}<>${fee}<`);

  // filter reservation
  let sqlQuery = `SELECT * FROM reservation`;
  if (reser) {
    sqlQuery += ` WHERE id_reservation=${reser}`;
  } else if (cust || room || fee) {
    sqlQuery += ` WHERE `;
    if (cust) {
      sqlQuery += `id_customer=${cust}`;
      if (room) sqlQuery += ` AND id_room=${room}`;
      if (fee === "paid") sqlQuery += ` AND fee_status=1`;
      if (fee === "unpaid") sqlQuery += ` AND fee_status=0`;
    } else if (room) {
      sqlQuery += `id_room=${room}`;
      if (fee === "paid") sqlQuery += ` AND fee_status=1`;
      if (fee === "unpaid") sqlQuery += ` AND fee_status=0`;
    } else {
      if (fee === "paid") sqlQuery += `fee_status=1`;
      if (fee === "unpaid") sqlQuery += `fee_status=0`;
    }
  }
  sqlQuery += `;`;
  // console.log("query resevation: " + sqlQuery);
  let allData = [];

  db.query(sqlQuery, (err, rowsReserv) => {
    if (err) res.send(err);
    db.query("SELECT * FROM customer", (e2, rowsCust) => {
      if (e2) res.send(e2);
      db.query("SELECT * FROM room", (e3, rowsRoom) => {
        if (e3) res.send(e3);
        db.query("SELECT * FROM extra", (e4, rowsExtra) => {
          if (e4) res.send(e4);
          db.query("SELECT * FROM orders", (e5, rowsOrd) => {
            if (e5) res.send(e5);
            let ans = rowsReserv;
            ans.map((r) => {
              // days
              r.start = r.start.toISOString().substring(0, 10);
              r.stop = r.stop.toISOString().substring(0, 10);
              // r.stop = r.stop.substring(0, 10);
              r.days = Math.round(
                (new Date(r.stop) - new Date(r.start)) / 86400000
              );
              // customer from resevation
              let c = rowsCust.filter(
                (cu) => cu.id_customer === r.id_customer
              )[0];
              // room from resevation
              let roo = rowsRoom.filter((ro) => ro.id_room === r.id_room)[0];

              r.title = c.title;
              r.first_name = c.first_name;
              r.surname = c.surname;
              r.phone = c.phone;
              r.email = c.email;

              r.price = roo.price;
              r.total = roo.price * r.days;
              r.beds = roo.beds;

              r.orders = [];
              // array of orders
              rowsOrd
                .filter((o) => o.id_reservation == r.id_reservation)
                .map((o) => {
                  let ex = rowsExtra.filter(
                    (e) => e.id_extra === o.id_extra
                  )[0];
                  let index = r.orders.findIndex(
                    (e) => e.id_extra == o.id_extra
                  );

                  if (index < 0) {
                    r.orders.push({
                      id_extra: o.id_extra,
                      quantity: 1,
                      desc: ex.description,
                      price: ex.price,
                      total: ex.price,
                    });
                  } else {
                    r.orders[index].quantity++;
                    r.orders[index].total += r.orders[index].price;
                  }
                });
              r.total += r.orders.reduce((o, { total }) => o + total, 0);
              return r;
            });
            let rooms = rowsRoom.map((r) => r.id_room);
            res.send({ reserv: ans, rooms });
          });
        });
      });
    });
  });
});

app.post("/api/accessible", (req, res) => {
  const start = req.body.start;
  const stop = req.body.stop;
  const beds = req.body.beds;

  // console.log(start, stop, beds);

  const sqlQuery =
    "SELECT * FROM `room` WHERE `id_room` NOT IN " +
    "(SELECT `id_room` FROM `reservation` WHERE `start`<=? AND `stop`>?) " +
    "AND `avaliable`>0 AND `beds`>=?;";
  db.query(sqlQuery, [stop, start, beds], (err, rows) => {
    if (err) res.send(err);
    else {
      // console.log(rows.length);
      res.send(rows);
    }
  });
  // res.send({ start, stop, beds });
});

app.post("/api/receptionist", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  // console.log(name, password);

  const query = "INSERT INTO `receptionist`(`name`, `password`) VALUES (?,?);";
  db.query(query, [name, password], (err, result) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(result);
  });
});

app.post("/api/customer", (req, res) => {
  const title = req.body.title;
  const first_name = req.body.first_name;
  const surname = req.body.surname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;

  // console.log(title, first_name, surname, phone, email, password);

  const query =
    "INSERT INTO `customer` (`title`, `first_name`, `surname`, `phone`, `email`, `password`) VALUES (?,?,?,?,?,?);";
  db.query(
    query,
    [title, first_name, surname, phone, email, password],
    (err, result) => {
      if (err) res.send(err);
      //"You do not have access to the database");
      else res.send(result);
    }
  );
});

app.post("/api/doreservation", (req, res) => {
  const id_customer = req.body.id_customer;
  const id_room = req.body.id_room;
  const start = req.body.start;
  const stop = req.body.stop;
  const fee_status = req.body.fee_status;

  const q =
    "INSERT INTO `reservation`(`id_customer`, `id_room`, `start`, `stop`, `fee_status`) " +
    "SELECT ?, ?, ?, ?, ? FROM DUAL WHERE " +
    "NOT EXISTS (SELECT * FROM `reservation` WHERE `start` <= ? AND `stop` > ? AND `id_room` = ?) " +
    "AND NOT EXISTS (SELECT * FROM `room` WHERE `id_room` = ? AND `avaliable` = 0);";

  db.query(
    q,
    [
      id_customer,
      id_room,
      start,
      stop,
      fee_status,
      stop,
      start,
      id_room,
      id_room,
    ],
    (err, result) => {
      if (err) res.send(err);
      else {
        res.send(result);
      }
    }
  );
});

app.post("/api/receptionist/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const password = req.body.password;

  // console.log(name, password);

  const query =
    "UPDATE `receptionist` SET `name`=?, `password`=? WHERE `id_receptionist`= ?;";
  db.query(query, [name, password, id], (err, result) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(result);
  });

  // res.send(req.params.id);
});

app.post("/api/lookCust", (req, res) => {
  const fi = ["first_name", "surname", "phone", "email"];
  const i = ["fname", "sname", "phone", "email"].indexOf(req.body.type);
  const field = fi[i];
  const data = req.body.data;

  const query = `SELECT * FROM customer WHERE ${field}='${data}';`;
  // console.log(query);
  // console.log(req.body);
  db.query(query, (err, result) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(result);
  });

  // res.send(data);
});

app.post("/api/login", (req, res) => {
  const fi = ["first_name", "surname", "phone", "email"];
  const table = req.body.type === "staf" ? "receptionist" : "customer";
  const name = req.body.data;
  const password = req.body.pass;
  const i = ["fname", "sname", "phone", "email"].indexOf(req.body.type);
  const field = table === "receptionist" ? "name" : fi[i];

  // console.log(table, field, name, password);

  const sqlQuery =
    "SELECT * FROM `" + table + "` WHERE `" + field + "`=? AND `password`=?;";

  db.query(sqlQuery, [name, password], (err, result) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(result);
  });

  // res.send({ table, field, name, password });
});

app.delete("/api/receptionist/:id", (req, res) => {
  const id = req.params.id;

  // console.log(name, password);

  const query = "DELETE FROM `receptionist` WHERE `id_receptionist`=?;";
  db.query(query, [id], (err, result) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(result);
  });

  // res.send(req.params.id);
});

app.listen(3000, () => {
  console.log("Port 3000");
});
