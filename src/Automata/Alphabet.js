//@flow
// $FlowFixMe
/**
 * Abeceda automatu (pole unikátních symbolů)
 */
export default class Alphabet extends Array{
    // $FlowFixMe
    constructor(...args) {
        // $FlowFixMe
        super(...(new Set(args)));
    }
};