DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS bug;

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
    image_url VARCHAR(150),
    genus VARCHAR(40) NOT NULL,
    ecology VARCHAR(256),
    description VARCHAR(256),
    PRIMARY KEY (bug_id)
);