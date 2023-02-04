--docker run -p 5432:5432 --name author-pg -e POSTGRES_PASSWORD=test -e POSTGRES_USER=author -e POSTGRES_DB=authors -d postgres
--docker run --name mypgadmin -p 5050:80 -e "PGADMIN_DEFAULT_EMAIL=test@google.com" -e "PGADMIN_DEFAULT_PASSWORD=111" -d dpage/pgadmin4
--or
--docker exec -i authors-pg bash
--psql -U author authors

--if need to create database
CREATE DATABASE authors;

--list db
\l

--change db
\c authors;

--create table of authors
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    surname VARCHAR(100)
);

--insert authors to DB
INSERT INTO authors (name, surname)
    VALUES ('Stephen','King'),
    ('Philip','Dick'),
    ('Vasyl','Stus'),
    ('Ray','Bradbury');

--select authors from DB
SELECT * from authors;