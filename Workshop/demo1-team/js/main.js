import { MovieService } from './movieService';
import $ from 'jquery';
import _ from 'underscore'


_.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
};

$('body').on('click', '.card-link', event => { 
    $(event.target).closest('ul').find('li.description').toggle();
    return false;
 })

getMovieList().then(function(movies) {
    var promises = [];
    movies.forEach(movie => {
        promises.push(getMovieDetail(movie.id));
    });
    Promise.all(promises)
    .then(function(movieDetails){
        var allData = movies.map(movie => {
        
            movie.description = movieDetails.filter(detail => {
                return detail.id === movie.id;
            })[0].desc;
            return movie;
        });
        
        var dataFirstPage = allData.slice(0,6);

        var $templ = $('#movies-data-content');
        var compiled = _.template($templ.html());
        var page = compiled({tiles: dataFirstPage});
        var $table = $('#content');
        $table.html(page);
    })
});

