//@flow
import FA from '../Automata/FA/FA';
import {toPlain} from '../Automata/services/plainFA';
import {generateStates} from "./intersectionFA";
import Alphabet from "../Automata/Alphabet";
import MergedState from "../Automata/State/MergedState";
import Rule from "../Automata/Rule";
import {objectValues} from "../Automata/services/object";

/**
 * Sekvenční vkládání
 * @param {FA} left
 * @param {FA} right
 * @return {FA}
 */
export default function sequentialInserion(left: FA, right: FA): FA {
    //budeme upravovat left a right a nechceme měnit vstupní automaty
    left = left.clone();
    right = right.clone();
    // nechceme přemýšlet nad prázdnými stavy => odstraníme je
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

function createRules(left: FA, right: FA, newStates: { [key: string]: MergedState }): Rule[] {
    let newRules = [];
    for (let mergedState of objectValues(newStates)) {
        if (mergedState.oldRight.isFinal || mergedState.oldRight.isInitial) {
            newRules = left.rules
                .filter((rule: Rule) => rule.from.state.name === mergedState.oldLeft.name)
                .map((rule: Rule) => new Rule({
                    from: {state: mergedState},
                    to: {state: newStates[MergedState.createName(rule.to.state, mergedState.oldRight)]},
                    symbol: rule.symbol
                }))
                .concat(newRules);
        }

        if (!mergedState.oldRight.isFinal) {
            newRules = right.rules
                .filter((rule: Rule) => rule.from.state.name === mergedState.oldRight.name)
                .map((rule: Rule) => new Rule({
                    from: {state: mergedState},
                    to: {state: newStates[MergedState.createName(mergedState.oldLeft, rule.to.state)]},
                    symbol: rule.symbol
                }))
                .concat(newRules);
        }
    }
    return newRules;
}