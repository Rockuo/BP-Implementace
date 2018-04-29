// @flow
import type {T_PlainAutomata} from '../Automata';
import type {T_PlainPA} from '../PA/PA';
import Automata from "../Automata";
import PA from "../PA/PA";
import {toPlain as simplePlain}  from "./plainFA";
import {toPlain as paPlain}  from "./plainPA";

export type T_AnyPlainAutomata = T_PlainPA | T_PlainAutomata ;

/**
 * Vrapne toPlain s prefixem l_ pro lepší čtení plain
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
export function toPlainLeft(automata: Automata):T_AnyPlainAutomata {
    return toPlain(automata, 'l_');
}

/**
 * Vrapne toPlain s prefixem r_ pro lepší čtení plain
 * @param automata
 * @return {{states: {name: string}[], alphabet: string[], initialState: {name: string}, rules: {from: {name: string}, to: {name: string}, symbol: string}[], finalStates: {name: string}[]}}
 */
export function toPlainRight(automata: Automata):T_AnyPlainAutomata {
    return toPlain(automata, 'r_');
}

/**
 * Vrapuje plain metody pro FA a PA
 * @param {Automata} automata
 * @param {string} prefix
 * @returns {{states: {name:string}[], alphabet: string[], initialState: {name:string}, rules: {from:{name:string},to:{name:string},symbol:string}[], finalStates: {name:string}[]}}
 */
export function toPlain(automata: Automata, prefix: string = ''):T_AnyPlainAutomata {
    if(automata instanceof PA)
    {
        return paPlain(automata,prefix);
    }
    // $FlowFixMe
    return simplePlain(automata,prefix);
}
