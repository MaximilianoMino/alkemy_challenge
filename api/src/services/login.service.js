const User = require("../dao/models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { SECRETORPRIVATEKEY } = require("../config/globals");

module.exports = class {
  async userExistInDB(username) {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return user;
    } else {
      return "";
    }
  }

  async passportAccess(username, password) {
    try {
      passport.use(
        new LocalStrategy(
          {
            usernameField: "username",
            passwordField: "password",
          },
          (done) => {
            //Match email
            if (!username) {
              return done(null, false, { msg: "Not user found" });
            } else {
              //Match password

              if (password) {
                return done(null, username);
              }
            }
          }
        )
      );
    } catch (error) {}
  }

  async refreshToken(uid) {
    const payload = { uid };

    try {
      const token = await jwt.sign(payload, SECRETORPRIVATEKEY, {
        expiresIn: "7d",
      });
      return token;
    } catch (error) {
      return "Unable to generate token: " + error;
    }
  }
};
