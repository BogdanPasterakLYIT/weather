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
  port: 3306, // standard is 3306
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

// data from weatherdata (4 columns) where day (avrage)
app.get("/today/:day", (req, res) => {
  const day = req.params.day;

  const sqlQuery =
    `SELECT site_name,` +
    ` ROUND(AVG(air_temperature),1) AS air_temperature,` +
    ` ROUND(AVG(road_surface_temperature),1) AS road_surface_temperature,` +
    ` ROUND(AVG(wind_speed),1) AS wind_speed` +
    ` FROM weatherdata WHERE datenow LIKE '${day}%'` +
    ` GROUP BY site_name`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data from weatherdata (4 columns) where day order (avrage)
app.get("/today/:day/:column/:where", (req, res) => {
  const day = req.params.day;
  const column = req.params.column;
  const where = req.params.where;

  const sqlQuery =
    `SELECT site_name,` +
    ` ROUND(AVG(air_temperature),1) AS air_temperature,` +
    ` ROUND(AVG(road_surface_temperature),1) AS road_surface_temperature,` +
    ` ROUND(AVG(wind_speed),1) AS wind_speed` +
    ` FROM weatherdata WHERE datenow LIKE '${day}%'` +
    ` GROUP BY site_name` +
    ` ORDER BY ${column} ${where}`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data from weatherdata (4 columns) where day and site
app.get("/today/:site/:day", (req, res) => {
  const day = req.params.day;
  const site = req.params.site;

  const sqlQuery =
    `SELECT timenow,` +
    ` air_temperature,` +
    ` road_surface_temperature,` +
    ` wind_speed` +
    ` FROM weatherdata WHERE datenow LIKE '${day}%'` +
    ` AND site_name LIKE '${site}'`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data from weatherdata (3 avrage) where day and site
app.get("/avrage/:site/:day", (req, res) => {
  const day = req.params.day;
  const site = req.params.site;
  // console.log("param", day, site);

  const sqlQuery =
    `SELECT` +
    ` ROUND(AVG(air_temperature),1) AS air_temperature,` +
    ` ROUND(AVG(road_surface_temperature),1) AS road_surface_temperature,` +
    ` ROUND(AVG(wind_speed),1) AS wind_speed` +
    ` FROM weatherdata WHERE datenow LIKE '${day}%'` +
    ` AND site_name LIKE '${site}'` +
    ` GROUP BY site_name`;

  // console.log(sqlQuery);
  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows[0]);
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
});

// data from weatherdata (4 columns) where day (avrage)
app.get("/site-data/:site", (req, res) => {
  const site = req.params.site;

  const sqlQuery =
    `SELECT datenow, timenow, ` +
    ` ROUND(air_temperature,1) AS air_temperature,` +
    ` ROUND(road_surface_temperature,1) AS road_surface_temperature,` +
    ` ROUND(wind_speed,1) AS wind_speed` +
    ` FROM weatherdata WHERE site_name LIKE '${site}%'`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data for stats
app.get("/stats/:col", (req, res) => {
  const col = req.params.col;

  const sqlQuery =
    `SELECT '${col}' AS name,` +
    ` ROUND(MIN(${col}),1) AS min,` +
    ` ROUND(MAX(${col}),1) AS max,` +
    ` ROUND(AVG(${col}),1) AS avg` +
    ` FROM weatherdata`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// data for stats
app.get("/stats/:col/:name", (req, res) => {
  const col = req.params.col;
  const name = req.params.name;

  let sqlQuery =
    `SELECT '${name}' AS name, site_name,` +
    ` ROUND(${col},1) AS value FROM weatherdata` +
    ` WHERE ${col} = ( SELECT`;
  if (name === "Coldest") sqlQuery += ` MIN(${col})`;
  else if (name === "Warmest") sqlQuery += ` MAX(${col})`;
  else sqlQuery += ` MAX(${col})`;
  sqlQuery += ` FROM weatherdata);`;

  db.query(sqlQuery, (err, rows) => {
    if (err) res.send(err);
    else res.send(rows);
  });
});

// listen

app.listen(3000, () => {
  console.log("Port 3000");
});
