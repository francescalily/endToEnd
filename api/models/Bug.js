const db = require('../database/connect');

class Bug {
    constructor({ bug_id, name, continent, image_url, genus, ecology, description }) {
        this.bug_id = bug_id;
        this.name = name;
        this.continent = continent;
        this.image_url = image_url;
        this.genus = genus;
        this.ecology = ecology;
        this.description = description;

    }

    static async create(bug) {

    }

    static async readAll() {

    }

    async updateByID(id) {

    }

    async deleteByID(id) {

    }
}

module.exports = Bug;