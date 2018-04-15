"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _FA2 = require("./FA");

var _FA3 = _interopRequireDefault(_FA2);

var _State = require("../State/State");

var _State2 = _interopRequireDefault(_State);

var _Rule = require("../Rule");

var _Rule2 = _interopRequireDefault(_Rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DFA = function (_FA) {
    _inherits(DFA, _FA);

    // $FlowFixMe
    function DFA() {
        var _ref;

        _classCallCheck(this, DFA);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = DFA.__proto__ || Object.getPrototypeOf(DFA)).call.apply(_ref, [this].concat(args)));
    }

    return DFA;
}(_FA3.default);

exports.default = DFA;