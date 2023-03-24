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

// data from sites order by
app.get("/sites", (req, res) => {
  const objectPar = req.body;

  const sqlQuery = `SELECT * FROM sites ORDER BY site_name`;
  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    //"You do not have access to the database");
    else res.send(rows);
  });
});

// data from weatherdata (4 columns) where day
app.get("/today/:day", (req, res) => {
  const day = req.params.day;

  const sqlQuery =
    `SELECT site_name, air_temperature, road_surface_temperature, wind_speed` +
    ` FROM weatherdata WHERE datenow LIKE '${day}%'`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data from weatherdata (9 columns) where site order by
app.get("/sitedata/:site", (req, res) => {
  const site = req.params.site;

  const sqlQuery =
    `SELECT datenow, timenow, site_name, air_temperature, precipitation_type, ` +
    `wind_speed, road_surface_temperature, wind_direction_bearing, weather_description ` +
    `FROM weatherdata WHERE site_name = '${site}' ` +
    `ORDER BY datenow, timenow`;
  // console.log(sqlQuery);

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
  // res.send("OK");
});

// stare

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

// listen

app.listen(3000, () => {
  console.log("Port 3000");
});
