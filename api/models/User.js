const db = require('../database/connect');

class User {
    constructor( { user_id, username, password, is_admin }) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
    }

    static async create(user) {

    }

    static async getOneById(id) {

    }

    static async getOneByUsername(username) {

    }

}

module.exports = User;