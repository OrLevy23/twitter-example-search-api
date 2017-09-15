const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const status = require("./routes/status");

const app = express();

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/status", status);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = "development" === req.app.get("env") ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
