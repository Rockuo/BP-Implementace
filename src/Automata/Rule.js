//@flow
import State from './State/State';
import type {T_PlainState} from './State/State';

export type T_PlainRuleNode = {state:T_PlainState, stackTop?:string};
export type T_PlainRule = {from:T_PlainRuleNode,to:T_PlainRuleNode,symbol:string };

export type T_RuleNode = {state:State,stackTop?:string};
type T_Rule_Constructor = { from: T_RuleNode, to: T_RuleNode, symbol: string};

/**
 * Pravidlo automatu
 * @type {Rule}
 * @property {{state:State, stackTop:string}} from
 * @property {{state:State, stackTop:string}} to
 * @property {string} symbol
 */
export default class Rule {
    from: T_RuleNode;
    to: T_RuleNode;
    symbol: string;


    /**
     * @param {object}  plainRule
     * @param {boolean} hasStack
     */
    constructor({from, to, symbol}:T_Rule_Constructor, hasStack?:boolean) {
        if(hasStack) {
            from.stackTop = from.stackTop || '';
            to.stackTop = to.stackTop || '';
        }
        this.from = from;
        this.to = to;
        this.symbol = symbol;
    }

    /**
     * @param {Rule} rule
     * @return {boolean}
     */
    equals(rule: Rule) {
        return (
            this.from.state.equals(rule.from.state) &&
            this.from.stackTop === rule.from.stackTop &&
            this.to.state.equals(rule.to.state) &&
            this.to.stackTop === rule.to.stackTop &&
            this.symbol === rule.symbol
        );
    }
};
