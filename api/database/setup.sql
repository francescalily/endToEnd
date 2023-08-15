DROP TABLE IF EXISTS bug;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE bug (
    bug_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) NOT NULL,
    continent VARCHAR(30) NOT NULL,
    image_url VARCHAR(300),
    genus VARCHAR(40) NOT NULL,
    ecology VARCHAR(256),
    description VARCHAR(256),
    PRIMARY KEY (bug_id)
);

INSERT INTO bug (name, continent, image_url, genus, ecology, description)
VALUES
('Grasshopper', 'All but Antartica', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Grasshopper_at_MGSP.jpg', 'suborder Caelifera', 'herbivore', '
A grasshopper is a jumping insect that feeds on plants.'),
('Bee', 'All but Antartica', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Apis_mellifera_Western_honey_bee.jp30', 'Apis', '-', 'A bee is a flying insect known for pollination and producing honey.');
 

--INSERT INTO user_account (username, password, is_admin) VALUES ('admin', 'Password1', true);
--INSERT INTO user_account (username, password) VALUES ('user', 'Password1');
