//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from '../Automata/services/plainFA';
import {generateStates} from "./intersectionFA";
import Alphabet from "../Automata/Alphabet";
import MergedState from "../Automata/State/MergedState";
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";

/**
 * Paralelní vkládání
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
export default function parallelInsertion(left: FA, right: FA): FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    let {newStates, newFinals, newInitial} = generateStates(left.states, right.states),
        newAutomata = new FA();

    // $FlowFixMe
    newAutomata.states = newStates;
    // $FlowFixMe
    newAutomata.finalStates = newFinals;
    // $FlowFixMe
    newAutomata.initialState = newInitial;
    newAutomata.alphabet = new Alphabet(...[...left.alphabet, ...right.alphabet]);
    newAutomata.rules = createRules(left, right, newStates);

    return newAutomata;
}

/**
 * Generuje pravidla pro paralelní vkládání
 * @param left
 * @param right
 * @param newStates
 * @return {Array}
 */
function createRules(left: FA, right: FA, newStates: { [key: string]: MergedState }): Rule[] {
    let newRules = [];
    for (let mergedState of objectValues(newStates)) {
        // pokud jsme v koncovém stavu levého automatu, přidáme přechody z levého automatu
        if (mergedState.oldRight.isFinal) {
            newRules = left.rules
                .filter((rule: Rule) => rule.from.state.name === mergedState.oldLeft.name)
                .map((rule: Rule) => new Rule({
                    from: {state: mergedState},
                    to: {state: newStates[MergedState.createName(rule.to.state, right.initialState)]},
                    symbol: rule.symbol
                }))
                .concat(newRules);
        }
        // přidáme přechody z pravého automatu
        newRules = right.rules
            .filter((rule: Rule) => rule.from.state.name === mergedState.oldRight.name)
            .map((rule: Rule) => new Rule({
                from: {state: mergedState},
                to: {state: newStates[MergedState.createName(mergedState.oldLeft, rule.to.state)]},
                symbol: rule.symbol
            }))
            .concat(newRules);
    }
    return newRules;
}