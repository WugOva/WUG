'use strict';

var app = angular.module('demo1', []);

// service
app.factory('userService', userService);

function userService() {
    var url = 'http://localhost:1213/';

    function getUserList() {
        return $.ajax({
            url: url + "users",
            dataType: 'jsonp',
            jsonp: "callback"
        })
            .then(function (response) {
                return response.users;
            });
    }

    function getMovies() {
        return $.ajax({
            url: url + "movies",
            dataType: 'jsonp',
            jsonp: "callback"
        })
        .then(function (response) {
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

    return {
        getUserList: getUserList,
        getMovies: getMovies,
        updateUser: updateUser,
        removeUser: removeUser
    };
}

// controller
app.controller('UserListController', UserListController);

function UserListController($scope, userService) {
    var vm = this;
    vm.value = 11;

    $.when(
        userService.getUserList(),
        userService.getMovies()
    ).then(function (users, movies) {
        return users.map(function (user) {
            user.movies = movies.filter(function (movie) { return movie.users.indexOf(user.id) >= 0; });
            return user;
        })
    }).then(function (userData) {
        console.log(userData);
        vm.userData = userData;
        $scope.$digest();
    });
}