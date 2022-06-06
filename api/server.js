// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    User.find().then(result => {
        res.json(result)
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id).then(result => {
        if(result == null){
            res.status(404).json({ message: 'does not exist'});
            return;
        }
        res.json(result)
    })
})






module.exports = server; // EXPORT YOUR SERVER instead of {}
