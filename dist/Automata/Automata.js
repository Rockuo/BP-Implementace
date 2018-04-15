'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State = require('./State/State');

var _State2 = _interopRequireDefault(_State);

var _Alphabet = require('./Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _Rule = require('./Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _plainAutomata = require('./services/plainAutomata');

var _simple = require('../extensions/simple');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * @type {Automata}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
var Automata = function () {

    /**
     */
    function Automata(settings) {
        _classCallCheck(this, Automata);

        if (settings) {
            this._initFromPlain(settings);
        }
    }

    _createClass(Automata, [{
        key: '_initFromPlain',
        value: function _initFromPlain(_ref) {
            var states = _ref.states,
                alphabet = _ref.alphabet,
                rules = _ref.rules,
                initialState = _ref.initialState,
                finalStates = _ref.finalStates;

            this.states = _State2.default.createStates(states);
            this.alphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(alphabet))))();
            this.rules = this._createRules(rules, this.states);
            this.initialState = this._findInitialState(initialState.name);
            this.finalStates = this._findFinalStates(finalStates);
        }

        /**
         *
         * @param {array} plainRules
         * @param states
         */

    }, {
        key: '_createRules',
        value: function _createRules(plainRules, states) {
            return plainRules.map(function (plainRule) {
                return new _Rule2.default({
                    from: { state: states[plainRule.from.state.name] },
                    to: { state: states[plainRule.to.state.name] },
                    symbol: plainRule.symbol
                });
            });
        }

        /**
         *
         * @param {string} name
         */

    }, {
        key: '_findInitialState',
        value: function _findInitialState(name) {
            return (0, _simple.objectTypedValues)(this.states, _State2.default).find(function (state) {
                if (state.name === name) {
                    state.setAsInitial();
                    return true;
                }
                return false;
            });
        }

        /**
         * Vynutí, aby byl pouze jeden konečný stav
         */

    }, {
        key: 'forceOneFinalState',
        value: function forceOneFinalState() {
            var newFinalState = new _State2.default({
                name: 'F-' + (0, _simple.objectTypedValues)(this.finalStates, _State2.default).map(function (state) {
                    return state.name;
                }).join('-'),
                isFinal: true
            });
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _simple.objectTypedValues)(this.finalStates, _State2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var state = _step.value;

                    state.isFinal = false;
                    this.rules.push(new _Rule2.default({ from: { state: state }, to: { state: newFinalState }, symbol: '' }));
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

            this.finalStates = _defineProperty({}, newFinalState.name, newFinalState);
            this.states[newFinalState.name] = newFinalState;
        }

        /**,
         * @param {array} finalStates
         * @returns {object}
         * @private
         */

    }, {
        key: '_findFinalStates',
        value: function _findFinalStates(finalStates) {
            var finalNames = _lodash2.default.map(finalStates, function (state) {
                return state.name;
            });
            return _lodash2.default.pickBy(this.states, function (state) {
                if (finalNames.includes(state.name)) {
                    state.setAsFinal();
                    return true;
                }
                return false;
            });
        }

        /**
         * Smaže neukončující stavy(a přechody k nim)
         */

    }, {
        key: 'removeUselessStatesAndRules',
        value: function removeUselessStatesAndRules() {
            this.states = {};
            this._removeUselessStates((0, _simple.objectTypedValues)(this.finalStates));
            this._removeUselessRules();
        }
    }, {
        key: '_removeUselessRules',
        value: function _removeUselessRules() {
            var newRules = [];
            var states = (0, _simple.objectTypedValues)(this.states);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop = function _loop() {
                    var rule = _step2.value;

                    if (states.filter(function (state) {
                        return rule.from.state.name === state.name;
                    }).length > 0 && states.filter(function (state) {
                        return rule.to.state.name === state.name;
                    }).length > 0) {
                        newRules.push(rule);
                    }
                };

                for (var _iterator2 = this.rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    _loop();
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

            this.rules = newRules;
        }
    }, {
        key: '_removeUselessStates',
        value: function _removeUselessStates(useful) {
            var _this = this;

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var finalState = _step3.value;

                    var newUseful = _this.rules.filter(function (rule) {
                        return rule.to.state.name === finalState.name && !_this.states[rule.from.state.name];
                    }).map(function (rule) {
                        var state = rule.from.state;
                        _this.states[state.name] = state;
                        return state;
                    });

                    if (!newUseful.length) return {
                            v: void 0
                        };

                    _this._removeUselessStates(newUseful);
                };

                for (var _iterator3 = useful[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _ret2 = _loop2();

                    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
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
        }
    }, {
        key: '_findRules',
        value: function _findRules(from, symbol) {
            var _this2 = this;

            // let rules = this.rules
            //     .filter((rule: Rule) => !(this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol))
            //     .filter((rule:Rule) => rule.from.state.name === from.name)
            //     .filter((rule:Rule) => rule.symbol === symbol);
            //
            // for (let rule of this.rules) {
            //     let a =!(!!this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol);
            //     let e = rule.from.state.name;
            //     let c = this._ignoreRules[rule.from.state.name] === rule.symbol;
            //     let b = !!this._ignoreRules[rule.from.state.name];
            //     let d =!(this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol);
            // }

            return this.rules.filter(function (rule) {
                return !(_this2._ignoreRules[rule.from.state.name] === rule.symbol);
            }).filter(function (rule) {
                return rule.from.state.name === from.name;
            }).filter(function (rule) {
                return rule.symbol === symbol;
            });
        }
    }, {
        key: 'accepts',
        value: function accepts(word) {
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.initialState;
            var initialCall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (initialCall) {
                this._ignoreRules = {};
                // this.debugRoute=[];
            }

            if (!word) {
                if (state.isFinal) return true;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this._findRules(state, '')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _rule = _step4.value;

                        if (_rule.to.state.isFinal) return true;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return false;
            }
            var symbol = word[0];
            word = word.slice(1);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this._findRules(state, symbol)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _rule2 = _step5.value;

                    var ignoreBackup = this._ignoreRules;
                    this._ignoreRules = {};
                    var result = this.accepts(word, _rule2.to.state, false);
                    this._ignoreRules = ignoreBackup;
                    if (result) {
                        // this.debugRoute.push({from:rule.from.state.name, symbol:rule.symbol, to:rule.to.state.name});
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            word = symbol + word;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this._findRules(state, '')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _rule3 = _step6.value;

                    var _ignoreBackup = this._ignoreRules;
                    this._ignoreRules[_rule3.from.state.name] = '';
                    var _result = this.accepts(word, _rule3.to.state, false);
                    this._ignoreRules = _ignoreBackup;
                    if (_result) return true;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return false;
        }

        /**
         * @param {State} state
         */

    }, {
        key: 'addState',
        value: function addState(state) {
            this.states[state.name] = state;
        }

        /**
         * @param {string} symbol
         */

    }, {
        key: 'addSymbol',
        value: function addSymbol(symbol) {
            this.alphabet.push(symbol);
        }

        /**
         * @param {Rule} rule
         */

    }, {
        key: 'addRule',
        value: function addRule(rule) {
            this.rules.push(rule);
        }
    }, {
        key: 'equals',
        value: function equals(automata) {
            return _lodash2.default.isEqual((0, _plainAutomata.toPlain)(this), (0, _plainAutomata.toPlain)(automata));
        }
    }]);

    return Automata;
}();

exports.default = Automata;
;