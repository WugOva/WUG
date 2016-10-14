'use strict';

(function () {

    function domReady() {
        console.log('DOM ready');

        //comment: $
        var url = 'http://localhost:1213/';
        var $userList = $('#user-list');
        var $form = $('#form');
        var selectedUser;
        
        //bind events
        $userList.on('click', 'tr', function () {
            $(this).parent().find('tr').removeClass('table-info');
            $(this).addClass('table-info');

            //comment: data()
            selectedUser = $(this).data().user;

            $form.show()
            var $name = $form.find('#user-name');
            var $email = $form.find('#user-email');

            $name.text(selectedUser.first + " " + selectedUser.last);
            $email.val(selectedUser.email);
        });

        $userList.on('click', '.remove-user', function () {
            if (!confirm("Are you sure?")) {
                return false;
            }

            $.ajax({
                url: url + 'deleteUser',
                type: 'DELETE',
                crossDomain: true,
                data: { userId: this.id },
                success: function () {
                    $('#myModal').modal('hide');
                    $form.hide();
                    selectedUser = null;
                    loadUserList();
                }
            })
            //comment: why return false
            return false;
        });

        //comment: why not .on ?
        $form.submit(function (event) {
            $form.hide();
            var data = {};
                
            var $inputs = $form.find(':input');
            $inputs.each(function () {
                if (this.name) {
                    data[this.name] = $(this).val();
                }
            });

            data.userId = selectedUser.id;

            $.ajax({
                url: url + 'updateUser',
                type: 'POST',
                crossDomain: true,
                data: data,
                success: function () {
                    loadUserList();
                }
            });
            return false;
        });

        function loadUserList() {
            selectedUser = null;

            $.ajax({
                url: url + "users",
                dataType: 'jsonp',
                jsonp: "callback",
                success: function (uResponse) {
                    $.ajax({
                        url: url + "movies",
                        dataType: 'jsonp',
                        jsonp: "callback",
                        success: function (mResponse) {
                            var userData = uResponse.users.map(function (user) {
                                user.movies = mResponse.movies.filter(function (movie) { return movie.users.indexOf(user.id) >= 0; });
                                return user;
                            });
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
                    })                    
                }
            })
        }

        loadUserList();
    }

    $(domReady);

})(jQuery);

