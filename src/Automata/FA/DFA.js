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
        //odstraní prázdné přechody
        this.removeEmptyRules();

        for (let state:State of objectValues(this.states)) {
            for (let symbol of this.alphabet) {
                //přechoy z "state" stav pomocí pomocí "symbol"
                let nonDeterministicRules = this._findRules(state, symbol);
                if (nonDeterministicRules.length < 2) continue;

                //existuje více jak jedno pravídlo pro tento stav a symbol

                //odstraní první přechodo
                let ndRule1 = nonDeterministicRules.shift();
                _.remove(this.rules, (rule: Rule) => rule.equals(ndRule1));

                //inicializuje z čeho se bude zkládat nový mergnutý stav
                let newState = ndRule1.to.state;
                // zapamatuje si přechody které jsou třeba přidat pro nový stav
                let rulesToAdd = this._findRules(ndRule1.to.state);

                // opakuje předhozí kroky pro ostatní přechody
                for (let ndRule:Rule of nonDeterministicRules) {
                    newState = new MergedState(newState, ndRule.to.state);
                    rulesToAdd = rulesToAdd.concat(this._findRules(ndRule.to.state));
                    _.remove(this.rules, (rule: Rule) => rule.equals(ndRule));
                }

                //přidá nový stav
                this.states[newState.name] = newState;

                // přidá přechody z nového stavu
                for (let rule of rulesToAdd) {
                    this.rules.push(new Rule({from: {state: newState}, symbol: rule.symbol, to: rule.to}));
                }
                // přidá přechod DO nového stavu
                this.rules.push(new Rule({from: {state}, symbol: symbol, to: {state: newState}}));
            }
        }
        //odstraní přebytečné stavy
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