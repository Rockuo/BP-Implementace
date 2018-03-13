//@flow
import State from './State';
import type {T_PlainState} from './State';

export type T_PlainRuleNode = {state:T_PlainState, stackTop?:string};
export type T_PlainRule = {from:T_PlainRuleNode,to:T_PlainRuleNode,symbol:string };

export type T_RuleNode = {state:State,stackTop?:string};
type T_Rule_Constructor = { from: T_RuleNode, to: T_RuleNode, symbol: string};

/**
 *
 * @type {Rule}
 */
export default class Rule {
    _from: T_RuleNode;
    _to: T_RuleNode;
    _symbol: string;


    /**
     *
     * @param {object}  plainRule
     * @param {boolean} hasStack
     */
    constructor({from, to, symbol}:T_Rule_Constructor, hasStack?:boolean) {
        if(hasStack) {
            from.stackTop = from.stackTop || '';
            to.stackTop = to.stackTop || '';
        }
        this._from = from;
        this._to = to;
        this._symbol = symbol;
    }


    get from():T_RuleNode {
        return this._from;
    }

    get to():T_RuleNode {
        return this._to;
    }

    get symbol():string {
        return this._symbol;
    }
};
