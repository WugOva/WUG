'use strict';

(function () {

    function UserService() {
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

    window.DemoApp.userService = new UserService();

})(jQuery);

