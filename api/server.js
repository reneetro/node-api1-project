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

server.post('/api/users', (req, res) => {
        User.insert(req.body).then(result => {
            if(result.name && result.bio){
                res.status(201).json(result);
            } else {
                res.status(400).json({ message: 'provide name and bio'})
            }
        })
})

server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id, req.body).then(result => {
        if(result == null){
            res.status(404).json({message: 'does not exist'});
            return;
        }
        if(result.name && result.bio){
            res.json(result)
        } else {
            res.status(400).json({ message: 'provide name and bio'})
        }
    })
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id).then(result => {
        if(result == null){
            res.status(404).json({message: 'does not exist'});
            return;
        }
        res.json(result)
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
