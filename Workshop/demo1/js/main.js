'use strict';

(function () {

    function domReady() {
        console.log('DOM ready');

        // 1. bind events
        var $userList = $('#user-list');
        var $form = $('#form');
        var selectedUser;
        var removeId;

        function createRating(rating) {
            var starFull = '<span class="star full">☆</span>';
            var star = '<span class="star">☆</span>';
            var $output = $("<div/>");
            
            for (var i = 0; i < 5; i++) {
                $output.append(i < rating ? starFull : star);
            }
            return $output.append('<span> ' + rating + '/5 </span>');
        }

        function bindEvents() {
            $userList.on('click', 'tr', function () {
                var $row = $(this);

                $row.parent().find('tr').removeClass('table-info');
                $row.addClass('table-info');

                selectedUser = $row.data().user;

                $form.show()
                var $name = $form.find('#user-name');
                var $email = $form.find('#user-email');
                var $rating = $form.find('#rating-ui');

                $name.text(selectedUser.first + " " + selectedUser.last);
                $email.val(selectedUser.email);
                $rating.empty().append(createRating(selectedUser.rating));

            });

            $userList.on('click', '.remove-user', function () {
                $('#myModal').modal();
                removeId = this.id;
                return false;
            });


            $('#remove-confirm').click(function() {
                 window.DemoApp.userService.removeUser(removeId)
                    .then(function() {
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

            $form.on('click', '.star', function() {
                var $star = $(this);
                // update model
                selectedUser.rating = $star.index();
                
                // update ui
                var $rating = $('#rating');                
                var $stars = $star.parent().find('.star');
                
                $stars.removeClass('full');
                $rating.val(selectedUser.rating + 1);
                
                $($stars).each(function(index, star) {
                    if (index <= selectedUser.rating) {
                        $(this).addClass('full');
                    }
                });

            });

            $form.on('click', '.hide-form', function() {
                $form.hide();
                selectedUser = null;
                $('tr').removeClass('table-info');
                return false;
            });
        }
        
        bindEvents();

        // 1. get user list data
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
                return users.map(function (user) {
                    user.movies = movies.filter(function (movie) { return movie.users.indexOf(user.id) >= 0; });
                    return user;
                })
            }).then(function (userData) {
                // 2. bind the data into view
                // 3. render the view
                renderTable(userData);
            });
        }

        loadUserList();

    }

    $(domReady);

})(jQuery);

