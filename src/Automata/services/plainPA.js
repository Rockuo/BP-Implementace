// @flow
import PA from "../PA/PA";
import type {T_PlainPA} from "../PA/PA";
import Automata from "../Automata";
import {extendableToPlain} from "./plainAutomata";
import _ from 'lodash';



/**
 *
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
export function toPlain(automata: PA, prefix: string = ''):T_PlainPA {

    let result =extendableToPlain(automata,prefix, {ruleParser: plainPARule});
    // $FlowFixMe
    result = (result:T_PlainPA);
    return additionalPA(automata, prefix, result);
}

function additionalPA(automata: PA, prefix: string, result: T_PlainPA) {
    result.initialStackSymbol = automata.initialStackSymbol;
    result.stackAlphabet = [...automata.stackAlphabet];
    return result;
}

function plainPARule(automata: PA, prefix: string) {
    return _.map(automata.rules, rule => {
        return {
            from: {state: {name: prefix + rule.from.state.name}, stackTop: rule.from.stackTop},
            to: {state: {name: prefix + rule.to.state.name}, stackTop: rule.to.stackTop},
            symbol: rule.symbol
        };
    });
}