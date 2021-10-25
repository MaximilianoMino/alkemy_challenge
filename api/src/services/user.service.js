const User = require("../dao/models/user");

module.exports = class {
  async createUser(user) {
    await User.create(user);
  }

  async getAllUsers() {
    const allUsers = await User.findAll();

    return allUsers;
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  async updateUser(id, username, password) {
    const user = await User.update(
      { username: username, password: password },
      { where: { id: id } }
    );

    return user;
  }

  async deleteUser(id) {
    const userToDelete = await User.destroy({
      where: {
        id: id,
      },
    });
    return userToDelete;
  }
};
