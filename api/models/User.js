const db = require("../database/connect");

class User {
  constructor({ user_id, username, password, is_admin }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.is_admin = is_admin;
  }

  static async create(user) {
    const { username, password, is_admin } = user;
    let response = await db.query(
      "INSERT INTO user_account (username, password) VALUES ($1, $2) RETURNING user_id;",
      [username, password]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE user_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }
  
  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM user_account WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async setAdmin(userId) {
    try {
      let response = await db.query(
        "UPDATE user_account SET is_admin = true WHERE user_id = $1 RETURNING is_admin;",
        [userId]
      );
      if (response.rows.length != 1) {
        throw new Error("Unable to update user's admin status.");
      }
      return response.rows[0].is_admin;
    } catch (error) {
      throw new Error("Failed to set user as admin.");
    }
  }
}

module.exports = User;
