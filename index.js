const express = require('express');
const morgan = require('morgan'),
fs = require('fs'), // import built in node modules fs and path 
path = require('path');

const app = express();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(morgan())
app.use(express.static('public'));


let movies = [
    {
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi'
    },
    {
      title: 'Lord of the Rings',
      director: 'Peter Jackson',
      genre: 'Super-Heroes'
    },
    {
      title: 'The Matrix',
      director: 'Lana Wachowski',
      genre: 'Sci-fi'
    },
    {
        title: 'The Avengers',
        director: 'Anthony Russo',
        genre: 'Super-Heroes'
      },
      {
        title: 'The Silence Of The Lambs',
        director: 'Jonathan Demme',
        genre: 'Suspense-Thriller'
      },
      {
        title: 'Terminator',
        director: 'James Cameron',
        genre: 'Action'
      },
      {
        title: 'The Prestige',
        director: 'Christopher Nolan',
        genre: 'Suspense-Thriller'
      },
      {
        title: 'Shutter Island',
        director: 'Martin Scorsese',
        genre:'Suspense-Thriller'
      },
      {
        title: 'The Fugitive',
        director: 'Andrew Davis',
        genre: 'Suspense-Thriller'
      },
      {
        title: 'The Shack',
        director: 'Stuart Hazeldine',
        genre: 'Feel-Good'
      }
  ];

  let users = [
    {
      id:1,
      name: 'John Doe',
      email: 'johndoe@mail.com',
      favMovies: [{
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi'
      }]
    },
    {
      id:2,
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      favMovies: [{
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi'
      }]
    }
  
  ];

app.get("/", (req, res) => {
    res.send("Welcome to my movieflix")
})

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
  });

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.get("/movies/:title", (req, res)=>{
    res.json(movies.find(x=>x.title===req.params.title))
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/user/:name", (req, res)=>{
    res.json(users.find(x=>x.name===req.params.name))
})

app.delete("/user/:name", (req, res)=>{
    res.json(users.filter(x=>x.name!=req.params.name))
})

app.listen(8080, ()=>console.log("Server started..."))
