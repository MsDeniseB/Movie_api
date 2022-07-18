// My first Node test server is running on Port 8080.

const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

// url module

let address = request.url;
let q = new URL(addr, true);

const  fs = require('fs'),
  url = require('url');
  
fs.readFile('input.txt', (err, data) => {
  if (err) {
    throw err;
  }
// File content: ' + data.toString());
});

if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });listen(8080);
