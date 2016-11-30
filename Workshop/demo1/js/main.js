'use strict';

(function () {
    function domReady() {

        console.log('DOM ready');

        var $userList = $('#user-list');
        var $form = $('#form');
        var selectedUser;
        var removeId;

        // 1. bind events
        function bindEvents() {
            $userList.on('click', 'tr', function () {
                var $row = $(this);

                $row.parent().find('tr').removeClass('table-info');
                $row.addClass('table-info');

                selectedUser = $row.data().user;
                console.log('selectedUser', selectedUser);

                $form.show()
                var $name = $form.find('#user-name');
                var $email = $form.find('#user-email');

                $name.text(selectedUser.first + " " + selectedUser.last);
                $email.val(selectedUser.email);
            });

            $userList.on('click', '.remove-user', function () {
                $('#myModal').modal();
                removeId = this.id;
                return false;
            });


            $('#remove-confirm').click(function () {
                window.DemoApp.userService.removeUser(removeId)
                    .then(function () {
                        $('#myModal').modal('hide');
                        $form.hide();
                        selectedUser = null;
                    })
                    .then(loadUserList);
                return false;
            });

            $form.submit(function (event) {
                $form.hide();
                var data = {};

                var $inputs = $form.find(':input');
                $inputs.each(function () {
                    if (this.name) {
                        data[this.name] = $(this).val();
                    }
                });

                window.DemoApp.userService.updateUser(selectedUser.id, data)
                    .then(loadUserList);

                return false;
            });

            $form.on('click', '.hide-form', function () {
                $form.hide();
                selectedUser = null;
                $('tr').removeClass('table-info');
                return false;
            });
        }
        bindEvents();

        function renderTable(userData) {
            $userList.empty();
            userData.forEach(function (user) {
                var $row = $(
                    '<tr>' +
                    '<td>' + user.first + '</td>' +
                    '<td>' + user.last + '</td>' +
                    '<td>' + user.email + '</td>' +
                    '<td>' + user.movies.map(function (movie) { return movie.name; }).join(', ') + '</td>' +
                    '<td><button data-toggle="modal" data-target="#myModal" class="btn btn-danger remove-user" id=' + user.id + '>x</button></td>' +
                    '</tr>'
                ).data({ user: user });

                $userList.append($row);
            });
        }

        function loadUserList() {
            selectedUser = null;

            $.when(
                window.DemoApp.userService.getUserList(),
                window.DemoApp.userService.getMovies()
            ).then(function (users, movies) {
                console.log('%cusers', 'color: red; font-size: 2em', JSON.parse(JSON.stringify(users)));
                console.log('%cmovies', 'color: red; font-size: 2em', movies);

                return users.map(function (user) {
                    user.movies = movies
                        .filter(function (movie) {
                            return movie.users.indexOf(user.id) >= 0;
                        })
                        .map(function (movie) {
                            return { name: movie.name };
                        });
                    return user;
                })
            }).then(function (userData) {
                // 2. bind the data into view
                // 3. render the view
                console.log('%caggregated data', 'color: tomato; font-size: 2em', userData);
                renderTable(userData);
            }).catch(function () {
                alert('error');
            })
        }
        loadUserList();

    }

    $(domReady);

})(jQuery);