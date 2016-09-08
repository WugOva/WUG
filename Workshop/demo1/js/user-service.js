'use strict';

(function () {

    function UserService() {
        function getUserList() {
            return $.ajax({
                url: "http://localhost:1213/users",
                dataType: 'jsonp',
                jsonp: "callback"
            })
            .then(function (response) {
                return response.users;
            });
        }

        function getMovies() {
            return $.ajax({
                url: "http://localhost:1213/movies",
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
                url: 'http://localhost:1213/updateUser',
                type: 'POST',
                crossDomain: true,
                data: data
            });
        }


        return {
            getUserList: getUserList,
            getMovies: getMovies,
            updateUser: updateUser
        };
    }

    window.DemoApp.userService = new UserService();

})(jQuery);

