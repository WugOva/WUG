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
movies = JSON.parse(fs.readFileSync('mock/moviesFull.json', 'utf8'));
var movieData = [];
var commentData = [];


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

function getMovieData(movieId) {
    if (movieId > 0 && movieId < 31) {
        var data = movieData[movieId];
        if (!data) {
            data  = JSON.parse(fs.readFileSync(__dirname + '/mock/movieData/' + movieId + '.json', 'utf8'));
            movieData[movieId] = data;
        }
        return data;
    } else {
        return null;
    }
}

function getCommentData(movieId) {
    if (movieId > 0 && movieId < 31) {
        var data = commentData[movieId];
        if (!data) {            
            data = commentData[movieId] = [];
        }
        return data;
    } else {
        return null;
    }
}

app.get('/movies/:id', function (req, res) {
        var movieId = req.params.id;
        
        var data = getMovieData(movieId);        
        if (data) {
            res.jsonp({success: true, data: data});
        } else {
            res.jsonp({success: false, msg: 'movie not found'});
        }
    })
    .post('/updateMovie', function (req, res) {
        var movieId = req.body.movieId;
        
        var data = getMovieData(movieId);        
        if (data) {
            data.desc = req.body.description;
            res.json({ success: true, data: movieId });        
        } else {
            res.json({ success: false, msg: 'movie not found' });
        }
    });

app.get('/comments/:id', function (req, res) {
        var movieId = req.params.id;
        
        var data = getCommentData(movieId);        
        if (data) {
            res.jsonp({success: true, data: data});
        } else {
            res.jsonp({success: false, msg: 'movie not found'});
        }
    })
    .post('/updateComment', function (req, res) {
        var movieId = req.body.movieId;
        
        var data = getCommentData(movieId);        
        if (data) {
            var newComment = {
                comment: req.body.comment,
                date: +new Date()
            }; 
            commentData[movieId].push(newComment);
            console.log(commentData);
            res.json({ success: true, data: newComment });        
        } else {
            res.json({ success: false, msg: 'movie not found' });
        }
    });    

app.get('/image/:id', function (req, res) {
    var movieId = req.params.id; 
    
    var data = getMovieData(movieId);        
    if (data) {
        res.sendFile(__dirname + '/img/' + movieId + (movieId == 9 ? '.png' : '.jpg'));
    } else {
        res.sendFile(__dirname + '/img/missing.jpg');
    }
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