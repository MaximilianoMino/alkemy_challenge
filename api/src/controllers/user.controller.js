const UserService = require("../services/user.service");

const userService = new UserService();

exports.getAllUsers = async (req, res, next) => {
  const allUsers = await userService.getAllUsers();

  try {
    res.status(200).json({
      success: true,
      msg: "Ok",
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Users could not be retrieved",
      error: error,
    });
  }
};

exports.getUserById = async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);

  try {
    if (user) {
      res.status(200).json({
        success: true,
        msg: "Ok",
        user: user,
      });
    } else {
      res.status(400).json({
        success: false,
        msg: `There is no user with id ${req.params.id}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { password, username } = req.body;

  const userUpdate = await userService.updateUser(
    req.params.id,
    username,
    password
  );

  try {
    res.status(200).json({
      success: true,
      msg: "Ok",
      userUpdate: userUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Cannot update user",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userDeleted = await userService.deleteUser(req.params.id);

  try {
    res.status(200).json({
      success: true,
      msg: "Ok",
      userDeleted: userDeleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Cannot delete user",
      error: error,
    });
  }
};
