// My first Node test server is running on Port 8080.

const http = require('http');
const  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});

if (request.url.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + request.url + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

  
}).listen(8080);

// url module
