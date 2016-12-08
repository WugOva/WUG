'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Base = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = exports.Base = function () {
    function Base() {
        _classCallCheck(this, Base);

        // custom template
        _underscore2.default.templateSettings = {
            interpolate: /\{\{=(.+?)\}\}/g,
            evaluate: /\{\{(.+?)\}\}/g
        };
    }

    _createClass(Base, [{
        key: 'render',
        value: function render(model, viewId, target) {
            var viewContent = (0, _jquery2.default)(viewId).html();
            var compiled = _underscore2.default.template(viewContent);
            var data = compiled(model);
            (0, _jquery2.default)(target).html(data);
        }
    }]);

    return Base;
}();