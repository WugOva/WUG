var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var port = 1213;

var fs = require('fs');
var users = JSON.parse(fs.readFileSync('mock/users.json', 'utf8'));
movies = JSON.parse(fs.readFileSync('mock/movies.json', 'utf8'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

app.get('/users', function (req, res) {
    res.jsonp(users);
});

app.get('/movies', function (req, res) {
    res.jsonp(movies);
});

app.post('/updateUser', function (req, res) {
    var userId = req.body.userId;
    users.users.forEach(function(user) {
        if (user.id == userId) {
            user.email = req.body.email;
            user.rating = req.body.rating;
        }
    });

    res.json({ success: 'ok' });
});

app.delete('/deleteUser', function (req, res) {
    var userId = req.body.userId;

    users.users.forEach(function(user, index) {
        if (user.id == userId) {
            users.users.splice(index, 1);
        }
    });

    res.json({ success: 'ok' });
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});