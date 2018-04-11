//@flow
import FA from '../Automata/FA';
import {toPlain} from '../Automata/services/plainAutomata';

export default function prefixes(automata: FA): ?FA {
    let resAutomata = new FA(toPlain(automata));
    resAutomata.removeUselessStatesAndRules();
    for(let state of Object.values(resAutomata.states)) {
        state.setAsFinal();
    }
    resAutomata.finalStates = resAutomata.states;
    return resAutomata;
}