"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FA2 = require("./FA");

var _FA3 = _interopRequireDefault(_FA2);

var _plainFA = require("../services/plainFA");

var _object = require("../services/object");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Rule = require("../Rule");

var _Rule2 = _interopRequireDefault(_Rule);

var _State = require("../State/State");

var _State2 = _interopRequireDefault(_State);

var _MergedState = require("../State/MergedState");

var _MergedState2 = _interopRequireDefault(_MergedState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Třída reprezentující deterministický konečný automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
var DFA = function (_FA) {
    _inherits(DFA, _FA);

    // $FlowFixMe
    function DFA() {
        var _ref;

        _classCallCheck(this, DFA);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = DFA.__proto__ || Object.getPrototypeOf(DFA)).call.apply(_ref, [this].concat(args)));

        _this._ensureDFA();
        return _this;
    }

    /**
     * Metoda zajišťující determinističnost KA
     * @private
     */


    _createClass(DFA, [{
        key: "_ensureDFA",
        value: function _ensureDFA() {
            var _this2 = this;

            //odstraní prázdné přechody
            this.removeEmptyRules();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _object.objectValues)(this.states)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var state = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        var _loop = function _loop() {
                            var symbol = _step2.value;

                            //přechoy z "state" stav pomocí pomocí "symbol"
                            var nonDeterministicRules = _this2._findRules(state, symbol);
                            if (nonDeterministicRules.length < 2) return "continue";

                            //existuje více jak jedno pravídlo pro tento stav a symbol

                            //odstraní první přechodo
                            var ndRule1 = nonDeterministicRules.shift();
                            _lodash2.default.remove(_this2.rules, function (rule) {
                                return rule.equals(ndRule1);
                            });

                            //inicializuje z čeho se bude zkládat nový mergnutý stav
                            var newState = ndRule1.to.state;
                            // zapamatuje si přechody které jsou třeba přidat pro nový stav
                            var rulesToAdd = _this2._findRules(ndRule1.to.state);

                            // opakuje předhozí kroky pro ostatní přechody
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                var _loop2 = function _loop2() {
                                    var ndRule = _step3.value;

                                    newState = new _MergedState2.default(newState, ndRule.to.state);
                                    rulesToAdd = rulesToAdd.concat(_this2._findRules(ndRule.to.state));
                                    _lodash2.default.remove(_this2.rules, function (rule) {
                                        return rule.equals(ndRule);
                                    });
                                };

                                for (var _iterator3 = nonDeterministicRules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    _loop2();
                                }

                                //přidá nový stav
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

                            _this2.states[newState.name] = newState;

                            // přidá přechody z nového stavu
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = rulesToAdd[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var rule = _step4.value;

                                    _this2.rules.push(new _Rule2.default({ from: { state: newState }, symbol: rule.symbol, to: rule.to }));
                                }
                                // přidá přechod DO nového stavu
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

                            _this2.rules.push(new _Rule2.default({ from: { state: state }, symbol: symbol, to: { state: newState } }));
                        };

                        for (var _iterator2 = this.alphabet[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _ret = _loop();

                            if (_ret === "continue") continue;
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
                //odstraní přebytečné stavy
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

            this.removeUnreachableStates();
            this.removeTrapStates();
        }

        /**
         * Přijímá Konečný automat a vrací instanci deterministického konečného automatu
         * @param {FA} fa
         * @return {DFA}
         */

    }], [{
        key: "covertFromFA",
        value: function covertFromFA(fa) {
            return new DFA((0, _plainFA.toPlain)(fa));
        }
    }]);

    return DFA;
}(_FA3.default);

exports.default = DFA;