CREATE DATABASE intro_database;

-- \c into intro_database

CREATE TABLE intro(
    intro_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    job TEXT,
    hobbies TEXT 
);