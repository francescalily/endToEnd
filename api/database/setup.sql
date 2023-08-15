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

INSERT INTO bug (name, continent, image_url, genus, ecology, description)
VALUES
  ('Grasshopper', 'All but Antartica', 'https://cdn.forumcomm.com/dims4/default/93e3950/2147483647/strip/false/crop/2121x1414+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Ffcc-cue-exports-brightspot.s3.us-west-2.amazonaws.com%2Fgrandforksherald%2Fbinary%2Fgrasshopper_binary_2759443.jpg', 'suborder Caelifera', 'herbivore');
 