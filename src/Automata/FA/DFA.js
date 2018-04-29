//@flow
import FA from './FA';
import {toPlain} from "../services/plainFA";
import {objectValues} from "../services/object";
import _ from 'lodash';
import Rule from "../Rule";
import State from "../State/State";
import MergedState from "../State/MergedState";


/**
 * Třída reprezentující deterministický konečný automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
export default class DFA extends FA {
    // $FlowFixMe
    constructor(...args: Array<any>) {
        super(...args);
        this._ensureDFA();
    }

    /**
     * Metoda zajišťující determinističnost KA
     * @private
     */
    _ensureDFA() {
        this.removeEmptyRules();
        for (let state of objectValues(this.states)) {
            for (let symbol of this.alphabet) {
                let nonDeterministicRules = this._findRules(state, symbol);
                if (nonDeterministicRules.length < 2) continue;

                let ndRule1 = nonDeterministicRules.shift();
                _.remove(this.rules, (rule: Rule) => rule.equals(ndRule1));

                let newState = ndRule1.to.state;
                let rulesToAdd = this._findRules(ndRule1.to.state);


                for (let ndRule:Rule of nonDeterministicRules) {
                    newState = new MergedState(newState, ndRule.to.state);
                    rulesToAdd = rulesToAdd.concat(this._findRules(ndRule.to.state));
                    _.remove(this.rules, (rule: Rule) => rule.equals(ndRule));
                }

                this.states[newState.name] = newState;

                for (let rule of rulesToAdd) {
                    this.rules.push(new Rule({from: {state: newState}, symbol: rule.symbol, to: rule.to}));
                }

                this.rules.push(new Rule({from: {state}, symbol: symbol, to: {state: newState}}));
            }
        }

        this.removeUnreachableStates();
        this.removeTrapStates();
    }

    /**
     * Přijímá Konečný automat a vrací instanci deterministického konečného automatu
     * @param {FA} fa
     * @return {DFA}
     */
    static covertFromFA(fa: FA) {
        return new DFA(toPlain(fa));
    }
}