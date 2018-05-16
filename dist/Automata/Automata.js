'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State = require('./State/State');

var _State2 = _interopRequireDefault(_State);

var _Alphabet = require('./Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _Rule = require('./Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _object = require('./services/object');

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Třída reprezentující automat
 * @abstract
 * @type {Automata}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */


/**
 * Datový typ pro čistý automat
 */
var Automata = function () {

    /**
     * @param {T_PlainAutomata} settings
     */

    /** Koncové stavy dle jména*/

    /** Pole pravidel */

    /** Stavy dle jména */
    function Automata(settings) {
        _classCallCheck(this, Automata);

        // tato třída je abstraktní, je li instancializována přímo, => vyjímka
        if (this.constructor.name === 'Automata') {
            throw new _exceptions.AbstractClassException(this.constructor.name);
        }
        // pokud není dle čeho instancializovat, vytváříme prázdný
        if (settings) {
            this._initFromPlain(settings);
        }
    }

    /**
     * Overridnutelná metoda pro vytvoření automatu ze zadaného objektu
     * @param {T_PlainState[]} states
     * @param {string[]} alphabet
     * @param {T_PlainRule[]} rules
     * @param {T_PlainState} initialState
     * @param {T_PlainState[]} finalStates
     * @private
     */

    /**
     * Objekt pravidel která se mají ignorovat
     * @protected
     */

    /** Počáteční stav*/

    /** Abeceda (unikátní)*/


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
            this.initialState = this.states[initialState.name];
            this.initialState.setAsInitial();
            this.finalStates = this._findFinalStates(finalStates);
        }

        /**
         * Overridnutelná metoda pro vytvoření pravidel ze zadaného čistého objektu pravidel a stavů
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
         * Vynutí, aby byl pouze jeden koncový stav
         */

    }, {
        key: 'forceOneFinalState',
        value: function forceOneFinalState() {
            // vytvoří nový konecný stav
            var newFinalState = new _State2.default({
                name: 'F-' + (0, _object.objectValues)(this.finalStates).map(function (state) {
                    return state.name;
                }).join('-'),
                isFinal: true
            });
            // všechny původní koncové stavy nastaví jako nekoncové a vytvoří z nich epsilon přechod no nového koncového stavu
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _object.objectValues)(this.finalStates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var state = _step.value;

                    state.isFinal = false;
                    this.rules.push(new _Rule2.default({ from: { state: state }, to: { state: newFinalState }, symbol: '' }));
                }
                //přidá koncový stav
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

        /**
         * Najde reference na koncové stavy dle jejich prosté reprezentace
         * @param {array} finalStates
         * @returns {object}
         * @private
         */

    }, {
        key: '_findFinalStates',
        value: function _findFinalStates(finalStates) {
            var finalNames = finalStates.map(function (state) {
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
         * Odstraní nedostupné stavy
         */

    }, {
        key: 'removeUnreachableStates',
        value: function removeUnreachableStates() {
            this.states = _defineProperty({}, this.initialState.name, this.initialState);
            this._ignoreRules = {};
            this._removeUnreachableStates([this.initialState]);
            this._removeUnattachedRules();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _object.objectValues)(this.finalStates)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var fState = _step2.value;

                    if (!this.states[fState.name]) {
                        delete this.finalStates[fState.name];
                    }
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
        }

        /**
         * Smaže neukončující stavy(a přechody k nim)
         */

    }, {
        key: 'removeTrapStates',
        value: function removeTrapStates() {
            this.states = _extends({}, this.finalStates);
            this._ignoreRules = {};
            this._removeTrapStates((0, _object.objectValues)(this.finalStates));
            this._removeUnattachedRules();
            this.states[this.initialState.name] = this.initialState;
        }

        /**
         * Odstraní přechody pro která neexistují stavy
         * @private
         */

    }, {
        key: '_removeUnattachedRules',
        value: function _removeUnattachedRules() {
            var newRules = [];
            var states = (0, _object.objectValues)(this.states);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                var _loop = function _loop() {
                    var rule = _step3.value;

                    if (states.filter(function (state) {
                        return rule.from.state.name === state.name;
                    }).length > 0 && states.filter(function (state) {
                        return rule.to.state.name === state.name;
                    }).length > 0) {
                        newRules.push(rule);
                    }
                };

                for (var _iterator3 = this.rules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    _loop();
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

            this.rules = newRules;
        }

        /**
         * Odstraní nedostupné stavy
         * @param {State[]} reachables
         * @private
         */

    }, {
        key: '_removeUnreachableStates',
        value: function _removeUnreachableStates() {
            var _this = this;

            var reachables = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [this.initialState];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                var _loop2 = function _loop2() {
                    var reachable = _step4.value;

                    var newReachable = _this.rules.filter(function (rule) {
                        return rule.from.state.equals(reachable) && !_this.states[rule.to.state.name];
                    }).map(function (rule) {
                        var state = rule.to.state;
                        _this.states[state.name] = state;
                        return state;
                    });

                    if (newReachable.length) {
                        _this._removeUnreachableStates(newReachable);
                    }
                };

                for (var _iterator4 = reachables[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    _loop2();
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
        }

        /**
         * Odstraní stavy ze kterých není možné se dostat do koncového
         * @param useful
         * @private
         */

    }, {
        key: '_removeTrapStates',
        value: function _removeTrapStates(useful) {
            var _this2 = this;

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                var _loop3 = function _loop3() {
                    var finalState = _step5.value;

                    var newUseful = _this2.rules.filter(function (rule) {
                        return rule.to.state.name === finalState.name && !_this2.states[rule.from.state.name];
                    }).map(function (rule) {
                        var state = rule.from.state;
                        _this2.states[state.name] = state;
                        return state;
                    });

                    if (newUseful.length) {
                        _this2._removeTrapStates(newUseful);
                    }
                };

                for (var _iterator5 = useful[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    _loop3();
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
        }

        /**
         * Najde přechod ze stavu "from" pomocí symbolu "symbol"
         * @param {State} from
         * @param {string} symbol
         * @return {Rule<>[]}
         * @private
         */

    }, {
        key: '_findRules',
        value: function _findRules(from) {
            var _this3 = this;

            var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return this.rules.filter(function (rule) {
                return !(_this3._ignoreRules[rule.from.state.name] === rule.symbol);
            }).filter(function (rule) {
                return rule.from.state.name === from.name;
            }).filter(function (rule) {
                return symbol === undefined || rule.symbol === symbol;
            });
        }

        /**
         * Zajistí právě jeden uklízecí stav
         */

    }, {
        key: 'ensureOneTrapState',
        value: function ensureOneTrapState() {
            //odstraní všechny "uklízecí" stavy
            this.removeTrapStates();

            //vytvoří nový "uklízecí stav"
            var cleanState = new _State2.default({
                name: 'clean(id_' + _State2.default.randomName() + ')'
            });
            // přidá nový stav
            this.states[cleanState.name] = cleanState;

            /*
                Pro všechny stavy najdeme symboly pro které neexistují přechody z daného stavu
                Následě vytvoříme přechody z daného stavu pomocí daného symbolu do nového stavu clean(id_...)
             */
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = (0, _object.objectValues)(this.states)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var state = _step6.value;

                    var existingSymbols = this._findRules(state).map(function (rule) {
                        return rule.symbol;
                    });
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = this.alphabet[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var symbol = _step8.value;

                            if (existingSymbols.indexOf(symbol) < 0) {
                                this.rules.push(new _Rule2.default({ from: { state: state }, to: { state: cleanState }, symbol: symbol }));
                            }
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }
                }
                // pro každý symbol cyklíme v uklízecím stavu
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

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.alphabet[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _symbol = _step7.value;

                    this.rules.push(new _Rule2.default({ from: { state: cleanState }, to: { state: cleanState }, symbol: _symbol }));
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }
        }

        /**
         * Sleduje epsilon přechody z daného stavu a přepisuje je na přechody z cílového stavu epsilon přechodu
         * (byl-li cílový stav koncový, nastaví tento stav jako koncový)
         * @param state
         * @private
         */

    }, {
        key: '_followEmptyRules',
        value: function _followEmptyRules(state) {
            var _this4 = this;

            var found = void 0;
            do {
                var emptyRules = this._findRules(state, '');
                found = !!emptyRules.length;
                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    var _loop4 = function _loop4() {
                        var emptyRule = _step9.value;

                        //odstraní epsilon přechod
                        _lodash2.default.remove(_this4.rules, function (rule) {
                            return rule.equals(emptyRule);
                        });
                        //pro všechny přechody z cílového stavu
                        var nextStateRules = _this4._findRules(emptyRule.to.state);
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = nextStateRules[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var nextStateRule = _step10.value;

                                // se přidají přechody do původního stavu   
                                _this4.rules.push(new _Rule2.default({
                                    from: { state: state },
                                    symbol: nextStateRule.symbol,
                                    to: nextStateRule.to
                                }));
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }

                        if (emptyRule.to.state.isFinal) {
                            state.isFinal = true;
                        }
                    };

                    for (var _iterator9 = emptyRules[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        _loop4();
                    }
                    // pokud byly nalezen prázný přechod, hledej znovu v nových přepsaných přechodech
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }
            } while (found);
        }

        /**
         * Odstraní epsilon přechody
         */

    }, {
        key: 'removeEmptyRules',
        value: function removeEmptyRules() {
            //vyčstíme si ignore rules (jen pro jistotu)
            this._ignoreRules = {};
            var _iteratorNormalCompletion11 = true;
            var _didIteratorError11 = false;
            var _iteratorError11 = undefined;

            try {
                for (var _iterator11 = (0, _object.objectValues)(this.states)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                    var state = _step11.value;

                    this._followEmptyRules(state);
                }
            } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
                        _iterator11.return();
                    }
                } finally {
                    if (_didIteratorError11) {
                        throw _iteratorError11;
                    }
                }
            }

            this.removeUnreachableStates();
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
    }]);

    return Automata;
}();

exports.default = Automata;
;