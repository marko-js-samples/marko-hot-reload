require('marko/node-require');

var express = require('express');
var marko   = require('marko');

var app = express();
var path = require('path');

var viewsDir = path.join(__dirname, 'views');

if (process.env.NODE_ENV !== 'production') {
    // Enable hot reloading in development
    require('marko/hot-reload').enable();

    require('fs').watch(viewsDir, function (event, filename) {
        if (/\.marko$/.test(filename)) {
            // Resolve the filename to a full template path:
            var templatePath = path.join(viewsDir, filename);

            console.log('Marko template modified: ', templatePath);

            // Pass along the *full* template path to marko
            require('marko/hot-reload').handleFileModified(templatePath);
        }
    });
}

var indexTemplate = require('./views/index.marko');

app.get('/', function(req, res) {
    indexTemplate.render({
        name: 'World'
    }, res);
});

app.listen(8080, function() {
    console.log('Server started on port 8080');
});