//@flow
import FA from '../Automata/FA/FA';
import MergedState from "../Automata/State/MergedState";
import {generateStates} from "./intersectionFA";
import Rule from "../Automata/Rule";
import Alphabet from "../Automata/Alphabet";
import {objectValues} from "../Automata/services/object";


/**
 *
 * @param  left
 * @param  right
 */
export default function shuffle(left: FA, right: FA): ?FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    let rules = [];
    let {newStates, newFinals, newInitial} = generateStates(left.states, right.states);
    let automata = new FA();
    automata.alphabet = new Alphabet(...[...left.alphabet, ...right.alphabet]);
    // $FlowFixMe
    automata.states = newStates;
    // $FlowFixMe
    automata.finalStates = newFinals;
    // $FlowFixMe
    automata.initialState = newInitial;
    automata.rules = createRules(left, right, newStates);
    return automata;
}

/**
 * Generuje přechody pro Shuffle
 * @param {FA} left
 * @param {FA} right
 * @param {Object<MergedState>} newStates
 * @return {Array}
 */
function createRules(left: FA, right: FA, newStates: { [key: string]: MergedState }): Rule[] {
    let newRules = [];
    //pro každý nový stav generujeme přechody
    for (let newState: MergedState of objectValues(newStates)) {
        //generujeme přechody z levého automatu
        let leftRules = left.rules.filter((rule: Rule) => rule.from.state.name === newState.oldLeft.name);
        for (let rule: Rule of leftRules) {
            newRules.push(new Rule({
                from: {state: newState},
                symbol: rule.symbol,
                to: {state: newStates[MergedState.createName(rule.to.state, newState.oldRight)]}
            }));
        }

        //generujeme přechody z pravého automatu
        let rightRules = right.rules.filter((rule: Rule) => rule.from.state.name === newState.oldRight.name);
        for (let rule: Rule of rightRules) {
            newRules.push(new Rule({
                from: {state: newState},
                symbol: rule.symbol,
                to: {state: newStates[MergedState.createName(newState.oldLeft, rule.to.state)]}
            }));
        }

    }
    return newRules;
}