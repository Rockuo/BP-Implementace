'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractClassException = exports.AbstractClassException = function (_Error) {
    _inherits(AbstractClassException, _Error);

    function AbstractClassException(className) {
        _classCallCheck(this, AbstractClassException);

        var _this = _possibleConstructorReturn(this, (AbstractClassException.__proto__ || Object.getPrototypeOf(AbstractClassException)).call(this, className + ' is not instantiable'));

        _this.className = 'AbstractClassException';
        return _this;
    }

    return AbstractClassException;
}(Error);

var OverloadException = exports.OverloadException = function (_Error2) {
    _inherits(OverloadException, _Error2);

    function OverloadException() {
        var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'No option to overload to';

        _classCallCheck(this, OverloadException);

        return _possibleConstructorReturn(this, (OverloadException.__proto__ || Object.getPrototypeOf(OverloadException)).call(this, txt));
    }

    return OverloadException;
}(Error);