const { query } = require('express');
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

const SQL_SELECT = 'SELECT * FROM authors ORDER BY id ASC';
const SQL_SELECT_BY_ID = 'SELECT * FROM authors WHERE id=$1';
const SQL_INSERT = 'INSERT INTO authors (name, surname) VALUES ($1,$2) RETURNING id';
const SQL_UPDATE = 'UPDATE authors SET name=$1, surname=$2 WHERE id=$3';
const SQL_DELETE = 'DELETE FROM authors WHERE id=$1';

const getAuthors = async (req, res) => {
    const response = await pool.query(SQL_SELECT);
    res.json(response.rows);
}

const getAuthorById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query(SQL_SELECT_BY_ID, [id]);
    if (response.rowCount > 0) {
        res.json(response.rows[0]);
    } else {
        res.json({});
    }
}

const createAuthor = async (req, res) => {
    const { name, surname } = req.body;
    const response = await pool.query(SQL_INSERT, [name, surname]);

    if (response.rowCount > 0) {
        const id = response.rows[0].id;
        res.status(201).json({
            id,
            name,
            surname
        });
    } else {
        res.json(
            {
                "message": 'Author does not create!'
            }
        );
    }
}

const deleteAuthor = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query(SQL_DELETE, [id]);
    res.json(
        {
            "message": `Autor with id=${id} deleted Successfully`
        }
    );
}

const updateAuthor = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname } = req.body;
    const response = await pool.query(SQL_UPDATE, [name, surname, id]);
    res.json(
        {
            "message": 'Author updated'
        }
    );
}

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthor,
    updateAuthor
}
