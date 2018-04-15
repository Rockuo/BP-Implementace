'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @type {State}
 */
var State = function () {

    /**
     *
     * @param {object} plainRule
     */
    function State(_ref) {
        var name = _ref.name,
            _ref$isInitial = _ref.isInitial,
            isInitial = _ref$isInitial === undefined ? false : _ref$isInitial,
            _ref$isFinal = _ref.isFinal,
            isFinal = _ref$isFinal === undefined ? false : _ref$isFinal;

        _classCallCheck(this, State);

        this.name = name;
        this.isInitial = isInitial;
        this.isFinal = isFinal;
    }

    /**
     *
     * @param {object} plainStates
     */


    _createClass(State, [{
        key: 'setAsInitial',
        value: function setAsInitial() {
            this.isInitial = true;
        }
    }, {
        key: 'setAsFinal',
        value: function setAsFinal() {
            this.isFinal = true;
        }

        // equals(state: State) {
        //     return this.name === state.name && this.isFinal === state.isFinal && this.isInitial && state.isInitial;
        // }

    }], [{
        key: 'createStates',
        value: function createStates(plainStates) {
            var states = {};
            _lodash2.default.each(plainStates, function (plainState) {
                states[plainState.name] = new State(plainState);
            });
            return states;
        }
    }]);

    return State;
}();

exports.default = State;
;