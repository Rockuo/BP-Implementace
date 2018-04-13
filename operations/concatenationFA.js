//@flow
import FA from '../Automata/FA';
import {toPlain} from "../Automata/services/plainAny";
import type {T_AnyPlainAutomata} from "../Automata/services/plainAny";


export default function concatenation(left: FA, right: FA): FA {
    let plainLeft:T_AnyPlainAutomata = toPlain(left), plainRight:T_AnyPlainAutomata = toPlain(right);
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

