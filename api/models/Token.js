const { v4: uuidv4 } = require('uuid');

const db = require('../database/connect');

class Token {
    constructor( { token_id, user_id, token}) {
        this.token_id = token_id;
        this.user_id = user_id;
        this.token = token;
    }

    static async create(user_id) {

    }

    static async getOneById(id) {

    }

    static async getOneByToken(token) {

    }

    async deleteToken(token) {

    }
}

module.exports = Token;