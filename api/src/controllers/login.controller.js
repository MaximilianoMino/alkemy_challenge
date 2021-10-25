const LoginService = require("../services/login.service");
const UserService = require("../services/user.service");

const loginService = new LoginService();
const userService = new UserService();

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const userExist = await loginService.userExistInDB(username);

  const userName = userExist.username;
  const userPass = userExist.password;

  console.log("User pass: " + userPass, "User name: " + userName);

  try {
    //checking if user exists

    if (userName === username && userPass === password) {
      await loginService.passportAccess(userName, userPass);

      res.status(200).json({
        success: true,
        msg: "Welcome",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "User / password are incorrect",
      });
    }

    /*  //Generate JWT

    if (userExist) {
      const token = await loginService.generateJWT(userExist.id);

      res.json({
        msg: "Login ok",
        user: userExist,
        token: token,
      });
    } */
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error: " + error,
    });
  }
};

exports.singin = async (req, res, next) => {
  const { username } = req.body;
  const userExist = await loginService.userExistInDB(username);

  console.log();
  try {
    if (userExist.username === username) {
      res.status(400).json({
        success: false,
        msg: "User al ready exist",
      });
    } else {
      const token = await loginService.accessToken(userExist.id);

      const newUser = await userService.createUser(req.body);
      res.status(200).json({
        success: true,
        msg: "Welcome",
        user: newUser,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error: " + error,
    });
  }
};
