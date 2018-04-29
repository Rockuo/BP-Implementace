"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.overload = overload;

var _FA = require("../FA/FA");

var _FA2 = _interopRequireDefault(_FA);

var _PA = require("../PA/PA");

var _PA2 = _interopRequireDefault(_PA);

var _exceptions = require("../exceptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Zpracovává options a na jejich základe volá přetečení funkce
 * @param {{parameters: [{value: Object, type: FA}, {value: Object, type: PA}], func: function}} options
 * @return {*|void}
 */
function overload(options) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        optionEach: for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;

            var paramsToUse = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = option.parameters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var param = _step2.value;

                    if (param.value.constructor !== param.type) {
                        continue optionEach;
                    }
                    var val = param.value;

                    val = val;
                    paramsToUse.push(val);
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

            return option.func.apply(option, paramsToUse);
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

    throw new _exceptions.OverloadException();
}