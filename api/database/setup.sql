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
('Grasshopper', 'All but Antarctica', 'https://upload.wikimedia.org/wikipedia/commons/3/38/Grasshopper_at_MGSP.jpg', 'suborder Caelifera', 'herbivore', 'A grasshopper is a jumping insect that feeds on plants.'),
('Bee', 'All but Antarctica', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Apis_mellifera_Western_honey_bee.jpg', 'Apis', 'pollinator', 'A bee is a flying insect known for pollination and producing honey.'),
('Butterfly', 'Worldwide', 'https://i.natgeofe.com/k/9acd2bad-fb0e-43a8-935d-ec0aefc60c2f/monarch-butterfly-grass_4x3.jpg', 'Rhopalocera', 'pollinator', 'A colorful flying insect, metamorphoses from caterpillar to butterfly.'),
('Ant', 'Worldwide', 'https://images.unsplash.com/photo-1588470045344-4393b295297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW50fGVufDB8fDB8fHww&w=1000&q=80', 'Formicidae', 'omnivore', 'Social insects, known for their complex colonies and organization.'),
('Dragonfly', 'Worldwide', 'https://upload.wikimedia.org/wikipedia/commons/0/03/Sympetrum_flaveolum_-_side_%28aka%29.jpg', 'Anisoptera', 'carnivore', 'Flying insects, skilled hunters with strong transparent wings.'),
('Ladybug', 'Worldwide', 'https://www.arkwildlife.co.uk/wp-content/uploads/2014/05/ladybird.jpg', 'Coccinellidae', 'carnivore', 'Small beetles, often red with black spots, feed on pests.'),
('Mantis', 'Worldwide', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg/1200px-European_praying_mantis_%28Mantis_religiosa%29_green_female_Dobruja.jpg', 'Mantodea', 'carnivore', 'Green or brown insects known for their "praying" forelimbs.'),
('Mosquito', 'Worldwide', 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Mosquito_2007-2.jpg', 'Culicidae', 'bloodsucker', 'Flying insects that feed on blood and can transmit diseases.'),
('Beetle', 'Worldwide', 'https://images.immediate.co.uk/production/volatile/sites/22/2023/05/Stag-beetle-1a8d6ad.jpg', 'Coleoptera', 'omnivore', 'Diverse group of insects with hard outer wing cases.'),
('Moth', 'Worldwide', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Attacus_atlas_%2815050883139%29.jpg', 'Heterocera', 'herbivore', 'Night flying insects, related to butterflies, often attracted to light.');

 

--INSERT INTO user_account (username, password, is_admin) VALUES ('admin', 'Password1', true);
--INSERT INTO user_account (username, password) VALUES ('user', 'Password1');
