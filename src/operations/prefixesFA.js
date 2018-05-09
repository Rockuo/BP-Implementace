//@flow
import FA from '../Automata/FA/FA';
import {objectValues} from "../Automata/services/object";
import _ from 'lodash';

/**
 * Generuhe automat přijímající prefixy zadaného automatu
 * @param {FA} automata
 * @return {FA}
 */
export default function prefixes(automata: FA): ?FA {
    //vytvoříme nový automat ze starého
    let resAutomata = automata.clone();
    resAutomata.removeTrapStates(); //odstraníme uklízecí stavy

    //všechny stavy se stávají koncovými
    for(let state of objectValues(resAutomata.states)) {
        state.setAsFinal();
    }
    resAutomata.finalStates = _.clone(resAutomata.states);

    //pro úhlednost přidáme uklízecí stav
    resAutomata.ensureOneTrapState();

    return resAutomata;
}