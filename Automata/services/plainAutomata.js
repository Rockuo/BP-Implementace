// @flow
import Automata from '../Automata';
import _ from 'lodash';
import PA from "../PA";

import type {T_PlainAutomata} from '../Automata';
import type {T_PlainPA} from '../PA';

export type T_AnyPlainAutomata = T_PlainPA | T_PlainAutomata ;


/**
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
export function toPlainLeft(automata: Automata):T_AnyPlainAutomata {
    return toPlain(automata, 'l_');
}

/**
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
export function toPlainRight(automata: Automata):T_AnyPlainAutomata {
    return toPlain(automata, 'r_');
}


/**
 *
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
export function toPlain(automata: Automata, prefix: string = ''):T_AnyPlainAutomata {
    let initialState = {}, finalStates = [], alphabet = [...automata.alphabet];

    _.each(automata.states, state => {
        if (state.isInitial) {
            initialState.name = prefix + state.name;
        }
        if (state.isFinal) {
            finalStates.push({name: prefix + state.name});
        }
    });
    let states = parseStates(automata, prefix);

    let rules = parseRules(automata, prefix);

    let result = {states, alphabet, initialState, rules, finalStates};
    additional(automata, prefix, result);
    return result;
}

/**
 * @param automata
 * @param prefix
 * @return {*}
 */
function parseStates(automata: Automata, prefix: string) {
    switch (automata.constructor.name) {
        default:
            return plainAutomataState(automata, prefix);
    }
}

function parseRules(automata: Automata, prefix: string) {
    if (automata instanceof PA) {
        return plainPARule((automata:PA), prefix);
    } else {
        return plainAutomataRule(automata, prefix);
    }
}

function additional(automata: Automata, prefix: string, result: {}) {
    if (automata instanceof PA) {
        // $FlowFixMe
        result = (result:T_PlainPA);

        additionalPA((automata:PA), prefix, result);
    }
}

function additionalPA(automata: PA, prefix: string, result: T_PlainPA) {
    result.initialStackSymbol = automata.initialStackSymbol;
    result.stackAlphabet = [...automata.stackAlphabet];
}


function plainAutomataRule(automata: Automata, prefix: string) {
    return _.map(automata.rules, rule => {
        return {
            from: {state: {name: prefix + rule.from.state.name}},
            to: {state: {name: prefix + rule.to.state.name}},
            symbol: rule.symbol
        };
    });
}

function plainPARule(automata: Automata, prefix: string) {
    return _.map(automata.rules, rule => {
        return {
            from: {state: {name: prefix + rule.from.state.name}, stackTop: rule.from.stackTop},
            to: {state: {name: prefix + rule.to.state.name}, stackTop: rule.to.stackTop},
            symbol: rule.symbol
        };
    });
}

function plainAutomataState(automata:Automata, prefix: string) {
    return _.map(automata.states, state => {
        return {name: prefix + state.name};
    });
}