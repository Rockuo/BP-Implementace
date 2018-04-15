//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from '../Automata/services/plainAutomata';
import {objectTypedValues} from "../Automata/services/object";

export default function prefixes(automata: FA): ?FA {
    let resAutomata = new FA(toPlain(automata));
    resAutomata.removeUselessStatesAndRules();
    for(let state of objectTypedValues(resAutomata.states)) {
        state.setAsFinal();
    }
    resAutomata.finalStates = resAutomata.states;
    return resAutomata;
}