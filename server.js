const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express()

app.use(expressStaticGzip(path.join(__dirname, 'dist'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
 }));

const port = process.env.PORT || 8081
app.listen(port)

console.log('Listening on port: '+port)