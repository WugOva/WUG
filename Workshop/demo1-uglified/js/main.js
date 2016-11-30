//comment: $
var url = 'http://localhost:1213/';
var $userList = $('#user-list');
var $form = $('#form');
var selectedUserId;

//bind events
$userList.on('click', 'tr', function () {
    $(this).parent().find('tr').removeClass('table-info');
    $(this).addClass('table-info');

    selectedUserId = $(this).find('button')[0].id;

    $form.show()
    var $name = $form.find('#user-name');
    var $email = $form.find('#user-email');

    $name.text($(this).find('.firstname').text() + " " + $(this).find('.lastname').text());
    $email.val($(this).find('.email').text());
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

$form.on('submit', function (event) {
    $form.hide();
    var data = {
        userId: selectedUserId,
        email: $('#user-email').val()
    };
        
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
                    for (var i = 0; i < uResponse.users.length; i++) {
                        for (var m = 0; m < mResponse.movies.length; m++) {
                            if (mResponse.movies[m].users.indexOf(uResponse.users[i].id) >= 0) {
                                if (!uResponse.users[i].movies) {
                                    uResponse.users[i].movies = [];
                                }
                                uResponse.users[i].movies.push({
                                    name: mResponse.movies[m].name
                                });
                            }
                        }
                    }

                    var userData = uResponse.users;

                    $userList.empty();
                    userData.forEach(function (user) {
                        var movies = [];
                        for (var i = 0; i < user.movies.length; i++) {
                            movies.push(user.movies[i].name);
                        }

                        var $row = $(
                            '<tr>' +
                            '<td class="firstname">' + user.first + '</td>' +
                            '<td class="lastname">' + user.last + '</td>' +
                            '<td class="email">' + user.email + '</td>' +
                            '<td>' + movies.join(', ') + '</td>' +
                            '<td><button data-toggle="modal" data-target="#myModal" class="btn btn-danger remove-user" id=' + user.id + '>x</button></td>' +
                            '</tr>'
                        );

                        $userList.append($row);
                    });
                }
            })                    
        }
    })
}

loadUserList();

