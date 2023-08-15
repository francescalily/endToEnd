const db = require("../database/connect");

class Bug {
  constructor(bug_id, name, continent, image_url, genus, ecology, description) {
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
    const response = await db.query(
      "INSERT INTO bugs (name continent, image_url, genus, ecology, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING bug_id;",
      [name, continent, image_url, genus, ecology, description]
    );
    return new Bug({ ...bug, bug_id: response.rows[0].bug_id });
  }

  static async readAll() {
    const response = await db.query("SELECT * FROM bugs");
    return response.rows.map((row) => new Bug(row));
  }

  static async updateByID(id, bug) {
    const { name, continent, image_url, genus, ecology, description } = bug;
    await db.query(
      "UPDATE bugs SET name=$1, contient=$2, image_url=$3, genus=$4, ecology=$5, description=$6 WHERE bug_id=$7",
      [name, continent, image_url, genus, ecology, description, id]
    );
  }

  static async deleteByID(id) {
    await db.query("DELETE FROM bugs WHERE bug_id=$1", [id]);
  }
}

module.exports = Bug;
