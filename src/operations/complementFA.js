//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from '../Automata/services/plainFA';
import {objectValues} from "../Automata/services/object";

/**
 * Doplněk Konečného automatu
 * @param automata
 * @return {FA}
 */
export default function complement(automata: FA): FA {
    let resAutomata = new FA(toPlain(automata));

    // Odstraníme prázdné přechody, nedostupné stavy a zavedeme jeden globální uklízecí stav
    resAutomata.removeEmptyRules();
    resAutomata.removeUnreachableStates();
    resAutomata.ensureOneTrapState();

    // Otočíme koncové stavy za nekoncové
    resAutomata.finalStates = {};
    for(let state of objectValues(resAutomata.states)) {
        state.isFinal = !state.isFinal;
        if(state.isFinal) {
            resAutomata.finalStates[state.name] = state;
        }
    }
    // voila
    return resAutomata;
}

