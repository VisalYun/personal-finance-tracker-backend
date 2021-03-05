CREATE DATABASE finance-tracker;

CREATE TABLE finance(
    trans_id SERIAL PRIMARY KEY,
    description VARCHAR(100),
    type VARCHAR(50),
    amount int
);