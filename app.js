var createError = require("http-errors");

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwtAuth = require("./lib/jwtAuthMiddleware");
const LoginController = require("./controllers/LoginController");
const i18n = require("./lib/i18nConfigure");
const session = require("express-session");
const LangController = require("./controllers/LangController");

const loginController = new LoginController();
const langController = new LangController();

require("./lib/connectMongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Rutas del API
app.post("/api/login", loginController.postAPIJWT);
app.use("/api/adds", jwtAuth, require("./routes/api/adds"));
app.use("/api/tags", require("./routes/api/tags"));
app.use("/api/users", require("./routes/api/users"));

//Rutas del Website
app.use(i18n.init);
app.get("/change-locale/:locale", langController.changeLocale);
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/api/users"));
app.use("/tags", require("./routes/api/tags"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  //Errors validation
  if (err.array) {
    const errInfo = err.array({})[0];
    console.log(errInfo);
    //err.message = `Not valid - ${err.errInfo.type} ${errInfo.path} in ${errInfo.location} ${errInfo.msg}`
    err.message = `Not valid - ${errInfo.param} in ${errInfo.location} ${errInfo.msg}`;
    err.status = 422;
  }

  //API errors
  if (req.originalUrl.startsWith("/api")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

module.exports = app;
