import $ from 'jquery';
import _ from 'underscore';

import { Base } from './base.controller.js';
import { MovieService } from './movie.service.js';
import { TilesController } from './tiles.controller.js';

export class FrontPageController extends Base {
    constructor() {
        super();
        this.movieService = new MovieService();
        this.tilesController = new TilesController();
        this.container = '#content';
        this.loadedTiles = 0;
        this.busy(true);
    }

    renderFronPage() {
        this.movieService.getTopMovies()
            .then(movies => {
                return this.createTileData(movies);
            })
            .then(tiles => {
                this.loadedTiles = tiles.length;
                this.createTiles(tiles, false);
                this.createShowMore();
                this.handleEvents();
                this.busy(false);
            });        
    }

    createTileData(movies) {
        let promises = [];

        movies.forEach(movie => {
            promises.push(this.movieService.getMovie(movie.id));
        });

        return Promise.all(promises)
            .then(movieDetails => (
                {
                    movieDetails: movieDetails,
                    movies: movies
                })
            )
            .then(dataToAggregate => {
                return dataToAggregate.movies.map(movie => {
                    movie.description = dataToAggregate.movieDetails.filter(detail => detail.id === movie.id);
                    movie.description = movie.description ? movie.description[0].desc : '';
                    return movie;
                })
            });
    }

    createTiles(tiles, append) {
        this.tilesController.renderTiles(tiles, append);
        this.tilesController.onDescriptionChanged(this.onDescriptionChanged.bind(this));
    }

    createShowMore() {
        this.render(null, '#show-more', this.container, true);
    }

    removeShowMore() {
        $('.show-more').remove();
    }

    handleEvents() {
        let $target = $(this.container);

        // show/hide description
        $target.on('click', '.show-more', this.showMore.bind(this));
    }    

    showMore() {
        this.busy(true);

        this.movieService.getMovies(this.loadedTiles)
            .then(movies => this.createTileData(movies))
            .then(tiles => {
                this.loadedTiles += tiles.length;
                this.createTiles(tiles, true);
                this.removeShowMore();
                this.createShowMore();
                this.handleEvents();
                this.tilesController.handleEvents();
                this.busy(false);
            })

        return false;
    }

    onDescriptionChanged(movieId, description) {
        return this.movieService.updateMovieDescription(movieId, description);
    }
    
}
