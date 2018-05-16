//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from "../Automata/services/plainFA";
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";

/**
 * Operace reverse
 * @param fa
 * @return {FA}
 */
export default function reverseFA(fa: FA): FA {
    let newFA = new FA(toPlain(fa));
    //zajistíme jeden koncový stav
    newFA.forceOneFinalState();
    // nový koncový si uložíme
    let newInitial:State =  objectValues(newFA.finalStates)[0];
    //nastaváme konečný stav jako počáteční
    newInitial.isFinal = false;
    newInitial.isInitial = true;
    //uložíme si původní počáteční stav
    let newFinal = newFA.initialState;
    //nastavíme původní počáteční stav jako koncový
    newFinal.isInitial = false;
    newFinal.isFinal = true;
    //prohodíme počátěční a koncový stav
    newFA.finalStates = {[newFinal.name]:newFinal};
    newFA.initialState = newInitial;

    newFA.rules = newFA.rules.map((rule: Rule) => new Rule({from: rule.to, to: rule.from, symbol: rule.symbol}));
    return newFA;
}