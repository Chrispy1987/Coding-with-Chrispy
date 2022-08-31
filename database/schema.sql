
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    address TEXT, 
    creator TEXT 
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT
);