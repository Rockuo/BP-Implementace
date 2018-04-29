//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from '../Automata/services/plainFA';
import {objectValues} from "../Automata/services/object";

export default function prefixes(automata: FA): ?FA {
    let resAutomata = new FA(toPlain(automata));
    resAutomata.removeTrapStates();
    for(let state of objectValues(resAutomata.states)) {
        state.setAsFinal();
    }
    resAutomata.finalStates = resAutomata.states;
    return resAutomata;
}