const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

const breweries = require("./routes/breweries");
const beers = require("./routes/beers");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/breweries", breweries);
app.use("/beers", beers);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: app.get("env") === "development" ? err : {}
    });
});


module.exports = app;
