//@flow
import FA from '../Automata/FA/FA';
import Alphabet from "../Automata/Alphabet";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";
import Rule from "../Automata/Rule";
import intersectionFA from "./intersectionFA";
import {toPlain} from "../Automata/services/plainFA";
import {specialRulesToResultAutomata} from "./sequentialDeletionFA";

export function rPop(left: FA, right: FA, specialSymbol: string = '#'): FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    left.alphabet = right.alphabet = new Alphabet(...right.alphabet, ...left.alphabet, specialSymbol);

    let copyLeft = left.clone();
    copyLeft.initialState.isInitial = false;

    let copyLeftStates = objectValues(copyLeft.states);
    for (let newInitialState: State of copyLeftStates) {
        for (let finalState: State of objectValues(copyLeft.finalStates)) {
            copyLeft.initialState = newInitialState;
            newInitialState.isInitial = true;

            let partLeft = copyLeft.clone();
            partLeft.removeUnreachableStates();
            if (Object.keys(partLeft.finalStates).length > 0) {
                partLeft.removeTrapStates();
                let intersection = intersectionFA(partLeft, right);
                intersection.removeUnreachableStates();
                if (Object.keys(intersection.finalStates).length > 0) {
                    left.rules.push(new Rule({
                        from: {state: left.states[newInitialState.name]},
                        to: {state: left.states[finalState.name]},
                        symbol: specialSymbol
                    }));
                }
            }
            newInitialState.isInitial = false;
        }
    }

    return specialRulesToResultAutomata(left,right,specialSymbol)
}

export function lPop(left: FA, right: FA, specialSymbol: string = '#'): FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    left.alphabet = right.alphabet = new Alphabet(...right.alphabet, ...left.alphabet, specialSymbol);

    let copyLeft = left.clone();
    for (let state of objectValues(copyLeft.finalStates)) {
        state.isFinal = false;
    }

    let copyLeftStates = objectValues(copyLeft.states);
    for (let newFinalState: State of copyLeftStates) {
        copyLeft.finalStates = {[newFinalState.name]: newFinalState};
        newFinalState.isFinal = true;
        let partLeft = copyLeft.clone();
        partLeft.removeUnreachableStates();
        if (Object.keys(partLeft.finalStates).length > 0) {
            partLeft.removeTrapStates();
            let intersection = intersectionFA(partLeft, right);
            intersection.removeUnreachableStates();
            if (Object.keys(intersection.finalStates).length > 0) {
                left.rules.push(new Rule({
                    from: {state: left.states[copyLeft.initialState.name]},
                    to: {state: left.states[newFinalState.name]},
                    symbol: specialSymbol
                }));
            }
        }
        newFinalState.isFinal = false;
    }

    return specialRulesToResultAutomata(left,right,specialSymbol)
}

