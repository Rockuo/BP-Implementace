"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Automata2 = require("../Automata");

var _Automata3 = _interopRequireDefault(_Automata2);

var _plainFA = require("../services/plainFA");

var _State = require("../State/State");

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Třída reprezentující konečný automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
var FA = function (_Automata) {
    _inherits(FA, _Automata);

    // $FlowFixMe
    function FA() {
        var _ref;

        _classCallCheck(this, FA);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = FA.__proto__ || Object.getPrototypeOf(FA)).call.apply(_ref, [this].concat(args)));
    }

    /**
     * Vrací kopii
     * @return {FA}
     */


    _createClass(FA, [{
        key: "clone",
        value: function clone() {
            return new FA((0, _plainFA.toPlain)(this));
        }

        /**
         * Vrací true, pokud je řetězec přijímán automatem
         * @param {string} word
         * @param {State} state
         * @param {boolean} initialCall
         * @return {boolean}
         */

    }, {
        key: "accepts",
        value: function accepts(word) {
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.initialState;
            var initialCall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (initialCall) {
                this._ignoreRules = {};
            }

            if (!word) {
                if (state.isFinal) return true;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._findRules(state, '')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var rule = _step.value;

                        if (rule.to.state.isFinal) return true;
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

                return false;
            }
            var symbol = word[0];
            word = word.slice(1);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._findRules(state, symbol)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _rule = _step2.value;

                    var ignoreBackup = this._ignoreRules;
                    this._ignoreRules = {};
                    var result = this.accepts(word, _rule.to.state, false);
                    if (result) {
                        return true;
                    }
                    this._ignoreRules = ignoreBackup;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            word = symbol + word;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._findRules(state, '')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _rule2 = _step3.value;

                    var _ignoreBackup = this._ignoreRules;
                    this._ignoreRules[_rule2.from.state.name] = '';
                    var _result = this.accepts(word, _rule2.to.state, false);
                    if (_result) {
                        this._ignoreRules = {};
                        return true;
                    }
                    this._ignoreRules = _ignoreBackup;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return false;
        }
    }]);

    return FA;
}(_Automata3.default);

exports.default = FA;