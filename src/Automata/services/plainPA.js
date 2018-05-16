// @flow
import PA from "../PA/PA";
import type {T_PlainPA} from "../PA/PA";
import Automata from "../Automata";
import {extendableToPlain} from "./plainFA";


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

/**
 * Speciální atributy Zásobníkového automatu
 * @param automata
 * @param prefix
 * @param result
 * @return {T_PlainPA}
 */
function additionalPA(automata: PA, prefix: string, result: T_PlainPA) {
    result.initialStackSymbol = automata.initialStackSymbol;
    result.stackAlphabet = [...automata.stackAlphabet];
    return result;
}

/**
 * Zpracovávání pravidel zásbníkového automatu
 * @param automata
 * @param prefix
 * @return {Array}
 */
function plainPARule(automata: PA, prefix: string) {
    return automata.rules.map(rule => {
        return {
            from: {state: {name: prefix + rule.from.state.name}, stackTop: rule.from.stackTop},
            to: {state: {name: prefix + rule.to.state.name}, stackTop: rule.to.stackTop},
            symbol: rule.symbol
        };
    });
}