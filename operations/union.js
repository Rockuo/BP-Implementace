//@flow
import Automata from '../Automata/Automata';
import {toPlainLeft, toPlainRight} from '../Automata/services/plainAutomata';
import PA from "../Automata/PA";

import type {T_PlainAutomata} from '../Automata/Automata';
import type {T_PlainPA} from '../Automata/PA';
import type {T_AnyPlainAutomata} from '../Automata/services/plainAutomata';
/**
 *
 * @param  Left
 * @param  Right
 * @param automataType
 */
export default function union(Left:Automata, Right:Automata, automataType:(typeof Automata) = Automata) {
    let plainLeft:T_AnyPlainAutomata = toPlainLeft(Left), plainRight:T_AnyPlainAutomata = toPlainRight(Right);
    let rules = [
        {from: {state:{name:'s'}}, to: {state: {name: plainLeft.initialState.name}}, symbol: ''},
        {from: {state:{name:'s'}}, to: {state: {name: plainRight.initialState.name}}, symbol: ''},
    ];
    for (let finalState of [...plainLeft.finalStates, ...plainRight.finalStates]) {
        rules.push({
            from: {state:{name: finalState.name}},
            to: {state: {name:'f'}},
            symbol: ''
        });
    }

    let plainUnion = {
        states: [{name: 's'}, {name: 'f'}, ...plainLeft.states, ...plainRight.states],
        alphabet: [...plainLeft.alphabet, ...plainRight.alphabet],
        rules: [...rules, ...plainLeft.rules, ...plainRight.rules],
        finalStates: [{name: 'f'}],
        initialState: {name: 's'}
    };

    additional(plainLeft, plainRight, plainUnion, automataType);

    return new automataType(plainUnion);
}


function additional(plainLeft:T_AnyPlainAutomata, plainRight:T_AnyPlainAutomata, plainUnion:T_AnyPlainAutomata, automataType:(typeof Automata)) {
    if(automataType === PA) {
        // $FlowFixMe
        plainLeft = (plainLeft:T_PlainPA);
        // $FlowFixMe
        plainRight = (plainRight:T_PlainPA);
        // $FlowFixMe
        plainUnion = (plainUnion:T_PlainPA);

        plainUnion.initialStackSymbol = '';
        plainUnion.stackAlphabet = [...plainLeft.stackAlphabet, ...plainRight.stackAlphabet];
    }
}