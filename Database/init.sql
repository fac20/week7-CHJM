BEGIN;

DROP TABLE IF EXISTS users, harvest CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE harvest (
    id SERIAL PRIMARY KEY,
    food_type VARCHAR(255) NOT NULL,
    taste VARCHAR(255) NOT NULL,
    harvest_time VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id)
);


INSERT INTO users (username, email, password) VALUES 
    ('jhart5', 'potatojosh@askjeeves.com', 'securePassw0rd'),
    ('kingRihards', 'SQLmaster420@yahoo.net', 'butterflies');


INSERT INTO harvest (food_type, taste, harvest_time, location, date, user_id) VALUES 
    ('apple', 'sweet', 'late october', 'south side of green park', '26th August 2020', '1'),
    ('rosemary', 'fragrant', 'september', 'SW99HR', '26th August 2020', '2');

COMMIT;


