const db = require("../database/connect");

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
        const { name, continent, image_url, genus, ecology, description } = bug;
        console.log(name);
        const response = await db.query(
            "INSERT INTO bug (name, continent, image_url, genus, ecology, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING bug_id;",
            [name, continent, image_url, genus, ecology, description]);
        console.log(response);
        const newId = response.rows[0].bug_id;
        console.log(newId);
        const newBug = await Bug.getOneById(newId);
        return newBug;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM bug WHERE bug_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Bug(response.rows[0]);
    }

    static async readAll() {
        const response = await db.query("SELECT * FROM bug");
        return response.rows.map((row) => new Bug(row));
    }

    static async updateByID(id, bug) {
        const { name, continent, image_url, genus, ecology, description } = bug;
        // console.log(bug);
        console.log(name);
        const response = await db.query(
            "UPDATE bug SET name=$1, continent=$2, image_url=$3, genus=$4, ecology=$5, description=$6 WHERE bug_id=$7 RETURNING *",
            [name, continent, image_url, genus, ecology, description, id]);
        
        return response.rows[0];
    }

    static async deleteByID(id) {
        await db.query("DELETE FROM bug WHERE bug_id=$1", [id]);
    }
}

module.exports = Bug;
