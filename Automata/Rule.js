import _ from 'lodash';
import State from './State';


/**
 *
 * @type {Rule}
 */
export default class Rule {
    /**
     *
     * @param {object} plainRule
     */
    constructor({from, to, symbol}) {
        this._from = new State(from);
        this._to = new State(to);
        this._symbol = symbol;
    }

    /**
     *
     * @param {array} plainRules
     */
    static createRules(plainRules) {
        return _.map(plainRules, plainRule => new Rule(plainRule));
    }


    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }

    get symbol() {
        return this._symbol;
    }
};
