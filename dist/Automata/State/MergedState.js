"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = require("./State");

var _State3 = _interopRequireDefault(_State2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @type {State}
 * @property {string} name
 * @property {boolean} isInitial
 * @property {boolean} isFinal
 * @property {State} oldLeft
 * @property {State} oldRight
 */
var MergedState = function (_State) {
    _inherits(MergedState, _State);

    /**
     * @param lState
     * @param rState
     */
    function MergedState(lState, rState) {
        _classCallCheck(this, MergedState);

        var _this = _possibleConstructorReturn(this, (MergedState.__proto__ || Object.getPrototypeOf(MergedState)).call(this, {
            name: MergedState.createName(lState, rState),
            isInitial: lState.isInitial && rState.isInitial,
            isFinal: lState.isFinal && rState.isFinal
        }));

        _this.oldLeft = lState;
        _this.oldRight = rState;
        return _this;
    }

    /**
     * Vrací spojené jméno
     * @param lState
     * @param rState
     * @return {string}
     */


    _createClass(MergedState, null, [{
        key: "createName",
        value: function createName(lState, rState) {
            return (lState instanceof _State3.default ? lState.name : lState) + "-" + (rState instanceof _State3.default ? rState.name : rState);
        }
    }]);

    return MergedState;
}(_State3.default);

exports.default = MergedState;
;