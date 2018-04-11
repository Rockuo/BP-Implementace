//@flow
import FA from '../Automata/FA';
import {toPlain} from '../Automata/services/plainAutomata';


//todo: před tímhle musí být automat deterministický
export default function complement(automata: FA): ?FA {
    let resAutomata = new FA(toPlain(automata));
    resAutomata.finalStates = {};
    for(let state of Object.values(resAutomata.states)) {
        state.isFinal = !state.isFinal;
        if(state.isFinal) {
            resAutomata.finalStates[state.name] = state;
        }
    }
    return resAutomata;
}