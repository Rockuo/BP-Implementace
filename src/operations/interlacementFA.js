//@flow
import FA from '../Automata/FA/FA';
import MergedState from "../Automata/State/MergedState";
import {generateStates} from "./intersectionFA";
import Rule from "../Automata/Rule";
import Alphabet from "../Automata/Alphabet";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";


const ZERO_PREFIX = '_0_';
const ONE_PREFIX = '_1_';

/**
 *
 * @param  left
 * @param  right
 */
export default function interlacement(left: FA, right: FA): ?FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    let rules = [];
    let decStates = {
        [ZERO_PREFIX]: new State({name: ZERO_PREFIX, isInitial: true, isFinal: true}),
        [ONE_PREFIX]: new State({name: ONE_PREFIX})
    };
    let {newStates, newFinals, newInitial} = generateStates(decStates, generateStates(left.states, right.states).newStates);
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

function createRules(left: FA, right: FA,newStates: { [key: string]: MergedState }): Rule[] {
    let newRules = [];
    for (let newState: MergedState of objectValues(newStates)) {
        if (newState.oldLeft.name === ZERO_PREFIX) {
            let leftRules = left.rules.filter((rule: Rule) => rule.from.state.equals(newState.oldRight.oldLeft));
            for (let rule: Rule of leftRules) {
                newRules.push(new Rule({
                    from: {state: newState},
                    symbol: rule.symbol,
                    to: {
                        state: newStates[MergedState.createName(
                            ONE_PREFIX,
                            MergedState.createName(rule.to.state, newState.oldRight.oldRight)
                        )]
                    }
                }));
            }
        } else {
            let rightRules = right.rules.filter((rule: Rule) => rule.from.state.equals(newState.oldRight.oldRight));
            for (let rule: Rule of rightRules) {
                newRules.push(new Rule({
                    from: {state: newState},
                    symbol: rule.symbol,
                    to: {
                        state: newStates[MergedState.createName(
                            ZERO_PREFIX,
                            MergedState.createName(newState.oldRight.oldLeft, rule.to.state)
                        )]
                    }
                }));
            }
        }
    }

    return newRules;
}