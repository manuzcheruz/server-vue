CREATE DATABASE cat_facts_database;

CREATE TABLE cat_facts(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    textDescription VARCHAR(255),
    updatedAt DATE,
    animalType VARCHAR(255),
    createdAt DATE
);
