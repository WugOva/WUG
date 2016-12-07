let url = 'http://localhost:1213/';

export function getUserList() {
    return $.ajax({
        url: url + "users",
        dataType: 'jsonp',
        jsonp: "callback"
    })
    .then(response => response.users);
}

export function getMovies() {
    return $.ajax({
        url: url + "movies",
        dataType: 'jsonp',
        jsonp: "callback"
    })
    .then(response => response.movies);
}

export function updateUser(userId, data) {
    data.userId = userId;
    
    return $.ajax({
        url: url + 'updateUser',
        type: 'POST',
        crossDomain: true,
        data: data
    });
}

export function removeUser(userId) {
    return $.ajax({
        url: url + 'deleteUser',
        type: 'DELETE',
        crossDomain: true,
        data: { userId }
    });
}
