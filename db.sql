CREATE DATABASE intro_database;

-- \c into intro_database

CREATE TABLE intro(
    intro_id SERIAL PRIMARY KEY,
    user_id UUID,
    name VARCHAR(200) NULL,
    job TEXT,
    hobbies TEXT, 
    FOREIGN KEY (user_id) REFERENCES users(user_id)

);

-- Make a user's table inside of the intro database

CREATE TABLE users(
user_id UUID DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL UNIQUE,
user_password VARCHAR(255) NOT NULL,
intros intro[],
PRIMARY KEY (user_id)
);

-- Install uuid generate extension inside of the users table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Add a sample user data

INSERT INTO users (user_name, user_email, user_password) VALUES ('kheyyon', 'park@gmail.com', 'wizbiz');

--Add sample intro data

INSERT INTO intro (user_id, name, job, hobbies) VALUES ('e1388e88-340c-48e1-8a63-cfff0657d289','Kheyyon Parker','software developer','learning to do stuff');

