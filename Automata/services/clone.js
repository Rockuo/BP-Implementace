import Automata from '../Automata';
import _ from 'lodash';

/**
 * @param {Automata} automata
 */
export function clonaAsLeft(automata) {
    return clone(automata, 'l_');
}


/**
 * @param {Automata} automata
 */
export function clonaAsRight(automata) {
    return clone(automata, 'r_');
}


/**
 * @param {Automata} automata
 * @param {string} prefix
 */
export function clone(automata, prefix = '_') {
    //{states, alphabet, rules, initialState, finalStates}
    let states = _.map();

}
