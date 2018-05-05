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
 * @type {State}
 * @property {string} name
 * @property {boolean} isInitial
 * @property {boolean} isFinal
 */
var State = function () {

    /**
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

        /**
         * Vrací náhodné jméno stavu s prefixem
         * @param {string} prefix
         * @return {string}
         */

    }, {
        key: 'equals',
        value: function equals(state) {
            return this.name === state.name;
        }
    }], [{
        key: 'createStates',
        value: function createStates(plainStates) {
            var states = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = plainStates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var plainState = _step.value;

                    states[plainState.name] = new State(plainState);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return states;
        }
    }, {
        key: 'randomName',
        value: function randomName() {
            var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return prefix + Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
        }
    }]);

    return State;
}();

exports.default = State;
;