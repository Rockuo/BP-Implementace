//@flow
import FA from '../Automata/FA';
import {toPlainLeft} from "../Automata/services/plainAny";
import type {T_AnyPlainAutomata} from "../Automata/services/plainAny";

//todo: test
export default function concatenation(left: FA, right: FA): ?FA {
    let plainLeft:T_AnyPlainAutomata = toPlainLeft(Left), plainRight:T_AnyPlainAutomata = toPlainRight(Right);
    let rules = [];
    for (let finalState of plainLeft.finalStates) {
        rules.push({
            from: {state:{name: finalState.name}},
            to: {state: plainRight.initialState},
            symbol: ''
        });
    }

    let plainUnion = {
        states: [...plainLeft.states, ...plainRight.states],
        alphabet: [...plainLeft.alphabet, ...plainRight.alphabet],
        rules: [...rules, ...plainLeft.rules, ...plainRight.rules],
        finalStates: [{name: 'f'}],
        initialState: plainLeft.initialState
    };

    return new FA(plainUnion);
}
