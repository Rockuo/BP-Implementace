//@flow
import FA from '../Automata/FA/FA';
import {toPlain, toPlainLeft, toPlainRight} from "../Automata/services/plainFA_OR_PA";
import type {T_AnyPlainAutomata} from "../Automata/services/plainFA_OR_PA";

/**
 * Konkatenace
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
export default function concatenation(left: FA, right: FA): FA {
    let plainLeft:T_AnyPlainAutomata = toPlainLeft(left), plainRight:T_AnyPlainAutomata = toPlainRight(right);
    let rules = [];
    for (let finalState of plainLeft.finalStates) {
        rules.push({
            from: {state:{name: finalState.name}},
            to: {state: plainRight.initialState},
            symbol: ''
        });
    }

    let plainConcatenation = {
        states: [...plainLeft.states, ...plainRight.states],
        alphabet: [...plainLeft.alphabet, ...plainRight.alphabet],
        rules: [...rules, ...plainLeft.rules, ...plainRight.rules],
        finalStates: plainRight.finalStates,
        initialState: plainLeft.initialState
    };

    return new FA(plainConcatenation);
}

