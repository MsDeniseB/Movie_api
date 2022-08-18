const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
require('./passport');
const Movies = Models.Movie;
const Users = Models.User;
fs = require('fs'), // import built in node modules fs and path 
path = require('path');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
let auth = require('./auth')(app);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.use(morgan())
app.use(express.static('public'));

mongoose.connect('mongodb+srv://denise_h_b:WorkPass@cluster0.cmkqvzg.mongodb.net/movieflix?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.send("Welcome to my movieflix")
})

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
  });

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } 
      else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.listen(8080, ()=>console.log("Server started..."))
