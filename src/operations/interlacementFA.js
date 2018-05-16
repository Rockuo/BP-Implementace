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
 * Propletení automatů
 * @param  left
 * @param  right
 */
export default function interlacement(left: FA, right: FA): ?FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    let rules = [];
    /** Přidá stavy {0,1}*/
    let decStates = {
        [ZERO_PREFIX]: new State({name: ZERO_PREFIX, isInitial: true, isFinal: true}),
        [ONE_PREFIX]: new State({name: ONE_PREFIX})
    };
    /// {0,1}X stavy levého X stavy pravého
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

/**
 * Vytvoří pravidla pro inerlacement
 * @param {FA} left
 * @param {FA} right
 * @param {{}}newStates
 * @return {Array}
 */
function createRules(left: FA, right: FA,newStates: { [key: string]: MergedState }): Rule[] {
    let newRules = [];
    //pro všechny mergnuté stavy ({0,1} X L X R)
    for (let newState: MergedState of objectValues(newStates)) {
        // pokud je v 0 používáme praidla levého stavu
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
        // pokud je v 1 používáme praidla pravého stavu
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