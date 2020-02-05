const http = require('http');
const routes = require('./routes')
console.log(routes);

var ser = http.createServer(routes.handler);
ser.listen(5000);
console.log(routes.gues);

// const http = require('http');

// const routes = require('./routes');

// console.log(routes.someText);

// const server = http.createServer(routes.handler);

// server.listen(3000);