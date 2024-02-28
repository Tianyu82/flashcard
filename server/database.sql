CREATE DATABASE flashcard_db;

CREATE TABLE users(
    username VARCHAR(32) PRIMARY KEY,
    password_text VARCHAR(32) NOT NULL
);

CREATE TABLE category(
    category_name VARCHAR(32) PRIMARY KEY
);

CREATE TABLE flashcard(
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(255) NOT NULL UNIQUE,
    option1 VARCHAR(32) NOT NULL,
    option2 VARCHAR(32) NOT NULL,
    answer VARCHAR(32) NOT NULL,
    category_name VARCHAR(32),
    owner_name VARCHAR(32) NOT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY(category_name) 
	    REFERENCES category(category_name)
	    ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(owner_name) 
	    REFERENCES users(username)
	    ON DELETE CASCADE,
    CONSTRAINT question_unique 
        UNIQUE (question)
);