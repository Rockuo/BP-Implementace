//@flow
// $FlowFixMe
/**
 * Abeceda automatu (pole unikátních symbolů)
 */
export default class Alphabet extends Array{
    // $FlowFixMe
    constructor(...args) { //...args je ekvivalent pythonáckého *args
        // $FlowFixMe
        super(...(new Set(args)));
    }
};