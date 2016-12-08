import $ from 'jquery';

export class MovieService {
    constructor() {
        this.url = 'http://localhost:1213/';
    }

    getTopMovies() {
        return $.ajax({
            url: this.url + "movies",
            dataType: 'jsonp',
            jsonp: "callback"
        })
        .then(response => response.movies.slice(0, 6));
    }

    getMovie(movieId) {
        return $.ajax({
            url: `${this.url}movies/${movieId}`,
            dataType: 'jsonp',
            jsonp: "callback"
        })
        .then(response => response.data);
    }

    getMovies(offset) {
        return $.ajax({
            url: this.url + "movies",
            dataType: 'jsonp',
            jsonp: "callback"
        })
        .then(response => {
            var t = response.movies.slice(offset, offset + 6);
            return t;
        });
    }

    updateMovieDescription(movieId, description) {
        var data = {movieId, description};
        
        return $.ajax({
            url: `${this.url}updateMovie`,
            type: 'POST',
            crossDomain: true,
            data: data
        });        
    }
}