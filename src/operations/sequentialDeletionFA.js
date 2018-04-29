//@flow
import FA from '../Automata/FA/FA';
import Alphabet from "../Automata/Alphabet";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";
import Rule from "../Automata/Rule";
import intersectionFA from "./intersectionFA";
import {toPlain} from "../Automata/services/plainFA";


export default function sequentialDeletion(left: FA, right: FA, specialSymbol: string = '#'): FA {
    left = left.clone();
    right = right.clone();
    left.removeEmptyRules();
    right.removeEmptyRules();
    left.alphabet = right.alphabet = new Alphabet(...right.alphabet, ...left.alphabet, specialSymbol);

    let copyLeft = left.clone();
    copyLeft.initialState.isInitial = false;
    for (let state of objectValues(copyLeft.finalStates)) {
        state.isFinal = false;
    }

    let copyLeftStates = objectValues(copyLeft.states);
    for (let newInitialState: State of copyLeftStates) {
        for (let newFinalState: State of copyLeftStates) {
            copyLeft.initialState = newFinalState;
            newInitialState.isInitial = true;
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
                        from: {state: left.states[newInitialState.name]},
                        to: {state: left.states[newFinalState.name]},
                        symbol: specialSymbol
                    }));
                }
            }

            newFinalState.isFinal = false;
            newInitialState.isInitial = false;
        }
    }
    let sigmaIterSpecialSigmaIter = new FA();
    sigmaIterSpecialSigmaIter.alphabet = left.alphabet;
    let initState = new State({name:'start', isInitial:true});
    let finalState = new State({name:'end', isFinal:true});
    sigmaIterSpecialSigmaIter.states = {[initState.name]:initState, [finalState.name]:finalState};
    initState.isInitial = true;
    sigmaIterSpecialSigmaIter.initialState = initState;
    finalState.isFinal = true;
    sigmaIterSpecialSigmaIter.finalStates = {[finalState.name]:finalState};
    sigmaIterSpecialSigmaIter.rules = [new Rule({from:{state:initState}, to:{state:finalState}, symbol:specialSymbol})];
    for (let symbol of [...left.alphabet, ...right.alphabet]) {
        sigmaIterSpecialSigmaIter.rules.push(new Rule({from:{state:initState}, to:{state:initState}, symbol:symbol}));
        sigmaIterSpecialSigmaIter.rules.push(new Rule({from:{state:finalState}, to:{state:finalState}, symbol:symbol}));
    }

    let intersection = intersectionFA(left,sigmaIterSpecialSigmaIter);
    let index = intersection.alphabet.indexOf(specialSymbol);
    if (index !== -1) intersection.alphabet.splice(index, 1);
    for (let rule of intersection.rules) {
        if(rule.symbol === specialSymbol) {
            rule.symbol = '';
        }
    }
    intersection.removeTrapStates();
    intersection.removeUnreachableStates();

    return intersection;
};

