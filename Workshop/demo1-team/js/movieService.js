import $ from 'jquery';

let url = 'http://localhost:1213/';

export class MovieService {
    getMovieList() {
        return $.ajax({
            url: url + "movies",
            dataType: 'jsonp',
            jsonp: "callback"
        })
        .then(function (response) {
            return response.movies;
        });
    }

    getMovieDetail(id) {
        return $.ajax({
            url: url + "movies/" + id,
            dataType: 'jsonp',
            jsonp: "callback"
        })
            .then(function (response) {
                return response.data;
            });
    }
}

