const express = require('express');
const app = express();
const path = require("path");
const compression = require('compression');
app.use(compression())

app.use(express.static(__dirname + '/dist/web-front-end'));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/web-front-end/index.html'));
});

app.listen(8080);