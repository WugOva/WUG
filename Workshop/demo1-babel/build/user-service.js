'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserList = getUserList;
exports.getMovies = getMovies;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
var url = 'http://localhost:1213/';

function getUserList() {
    return $.ajax({
        url: url + "users",
        dataType: 'jsonp',
        jsonp: "callback"
    }).then(function (response) {
        return response.users;
    });
}

function getMovies() {
    return $.ajax({
        url: url + "movies",
        dataType: 'jsonp',
        jsonp: "callback"
    }).then(function (response) {
        return response.movies;
    });
}

function updateUser(userId, data) {
    data.userId = userId;

    return $.ajax({
        url: url + 'updateUser',
        type: 'POST',
        crossDomain: true,
        data: data
    });
}

function removeUser(userId) {
    return $.ajax({
        url: url + 'deleteUser',
        type: 'DELETE',
        crossDomain: true,
        data: { userId: userId }
    });
}