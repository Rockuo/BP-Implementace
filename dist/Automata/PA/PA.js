'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Automata2 = require('../Automata');

var _Automata3 = _interopRequireDefault(_Automata2);

var _Alphabet = require('../Alphabet');

var _Alphabet2 = _interopRequireDefault(_Alphabet);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Rule = require('../Rule');

var _Rule2 = _interopRequireDefault(_Rule);

var _Stack = require('../Stack');

var _Stack2 = _interopRequireDefault(_Stack);

var _State = require('../State/State');

var _State2 = _interopRequireDefault(_State);

var _plainPA = require('../services/plainPA');

var _FA = require('../FA/FA');

var _FA2 = _interopRequireDefault(_FA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Třída reprezentující zásobníkový automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {string} initialStackSymbol
 * @property {Alphabet} stackAlphabet
 * @property {Stack} stack
 */
var PA = function (_Automata) {
    _inherits(PA, _Automata);

    /**
     * @param {{
     *  states: array,
     *  alphabet: string[],
     *  rules: array,
     *  initialState: object,
     *  finalStates: array,
     *  initialStackSymbol: string,
     *  stackAlphabet: string[],
     *  }} plainAutomata
     */
    function PA(plainAutomata) {
        _classCallCheck(this, PA);

        var _this = _possibleConstructorReturn(this, (PA.__proto__ || Object.getPrototypeOf(PA)).call(this, plainAutomata));

        _this.initialStackSymbol = plainAutomata.initialStackSymbol;
        _this.stackAlphabet = new (Function.prototype.bind.apply(_Alphabet2.default, [null].concat(_toConsumableArray(plainAutomata.stackAlphabet))))();
        _this.stack = new _Stack2.default(_this.initialStackSymbol);
        return _this;
    }

    /**
     * Přepisuje původní _createRules metodu, tak aby fungovala pro zásobníkový automat
     * @param {array} plainRules
     * @param {State[]} states
     * plainRules:T_PlainRule[], states:{[key:string]:State}
     * plainRules: T_PlainRule[], states:{[key:string]:State}
     */


    _createClass(PA, [{
        key: '_createRules',
        value: function _createRules(plainRules, states) {
            return _lodash2.default.map(plainRules, function (plainRule) {
                return new _Rule2.default({
                    from: { state: states[plainRule.from.state.name], stackTop: plainRule.from.stackTop },
                    to: { state: states[plainRule.to.state.name], stackTop: plainRule.to.stackTop },
                    symbol: plainRule.symbol
                }, true);
            });
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new PA((0, _plainPA.toPlain)(this));
        }
    }]);

    return PA;
}(_Automata3.default);

exports.default = PA;