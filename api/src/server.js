const express = require("express");
const cors = require("cors");
const compression = require("compression");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const userRouter = require("./routes/user.route");
const recordRouter = require("./routes/record.route");
const authRouter = require("./routes/auth.route");

//SETTINGS
const app = express();

//MIDDLEWARES
app.use(express.static(__dirname + "/public"));
app.use(compression());
app.use(cors());
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", userRouter);
app.use("/", recordRouter);
app.use("/", authRouter);

module.exports = app;
