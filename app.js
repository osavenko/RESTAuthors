const express = require('express');
const { getAuthors, getAuthorById, createAuthor, deleteAuthor, updateAuthor } = require('./controller/authors.controller.js');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        halth: "Ok",
        name: 'Author REST API'
    });
})

app.get('/api/authors', getAuthors);
app.get('/api/authors/:id', getAuthorById);
app.post('/api/authors', createAuthor);
app.delete('/api/authors/:id', deleteAuthor);
app.put('/api/authors/:id', updateAuthor);


app.listen(port, () => {
    console.log(`Server started. Server port ${port}`);
})