'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Automata2 = require('../Automata');

var _Automata3 = _interopRequireDefault(_Automata2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return FA;
}(_Automata3.default);

exports.default = FA;