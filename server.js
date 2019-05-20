const https = require('http');
const app = require('./suggestions')

const port = process.env.PORT || 3000;

const server = https.createServer(app);

server.listen(port);