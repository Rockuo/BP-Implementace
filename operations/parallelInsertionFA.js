//@flow
import FA from '../Automata/FA';
import {toPlain} from '../Automata/services/plainAutomata';
import {generateStates} from "./intersectionFA";
import Alphabet from "../Automata/Alphabet";
import MergedState from "../Automata/MergedState";
import Rule from "../Automata/Rule";
import {objectTypedValues} from "../extensions/simple";


export default function parallelInsertion(left: FA, right: FA): FA {
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
    for (let mergedState of objectTypedValues(newStates, MergedState)) {

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