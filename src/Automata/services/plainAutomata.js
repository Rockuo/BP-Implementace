// @flow
import Automata from '../Automata';
import _ from 'lodash';

import type {T_PlainAutomata} from '../Automata';

/**
 *
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
export function toPlain(automata: Automata, prefix: string = ''): T_PlainAutomata {
    return extendableToPlain(automata, prefix, {});
}

//$FlowFixMe
export function extendableToPlain(automata: Automata, prefix: string = '', {stateParser = plainAutomataState, ruleParser = plainAutomataRule}) {
    let initialState = {}, finalStates = [], alphabet = [...automata.alphabet];

    _.each(automata.states, state => {
        if (state.isInitial) {
            initialState.name = prefix + state.name;
        }
        if (state.isFinal) {
            finalStates.push({name: prefix + state.name});
        }
    });
    let states = stateParser(automata, prefix);

    let rules = ruleParser(automata, prefix);

    return {states, alphabet, initialState, rules, finalStates};
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


function plainAutomataState(automata: Automata, prefix: string) {
    return _.map(automata.states, state => {
        return {name: prefix + state.name};
    });
}