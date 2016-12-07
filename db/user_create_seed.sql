-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id          SERIAL PRIMARY KEY NOT NULL,
    firstname   VARCHAR(255),
    lastname    VARCHAR(255),
    email       VARCHAR(255)
);

INSERT INTO Users (firstname, lastname, email) VALUES 
( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');
