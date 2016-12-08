'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MovieService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieService = exports.MovieService = function () {
    function MovieService() {
        _classCallCheck(this, MovieService);

        this.url = 'http://localhost:1213/';
    }

    _createClass(MovieService, null, [{
        key: 'getTopMovies',
        value: function getTopMovies() {
            return _jquery2.default.ajax({
                url: this.url + "movies",
                dataType: 'jsonp',
                jsonp: "callback"
            }).then(function (response) {
                return response.movies.slice(5);
            });
        }
    }]);

    return MovieService;
}();