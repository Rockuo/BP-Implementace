"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectValues = objectValues;
/**
 * Obaluje Object.values do metod, která je ignorovaná FLOW
 * @param object
 * @return {*}
 */
function objectValues(object) {
  return Object.values(object);
}