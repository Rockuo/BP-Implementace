//@flow
import FA from '../Automata/FA/FA';
import Alphabet from "../Automata/Alphabet";
import {objectValues} from "../Automata/services/object";
import State from "../Automata/State/State";
import Rule from "../Automata/Rule";
import intersectionFA from "./intersectionFA";

/**
 * Operace sekvenčního mazání
 * @param {FA} left
 * @param {FA} right
 * @param {string} specialSymbol
 * @return FA
 */
export default function sequentialDeletion(left: FA, right: FA, specialSymbol: string = '#'): FA {
    //naklonujeme automaty, abychom nezasahovali do původních
    left = left.clone();
    right = right.clone();
    //odstraníme epsilon přechody
    left.removeEmptyRules();
    right.removeEmptyRules();
    //sjednotíme abecedy
    left.alphabet = right.alphabet = new Alphabet(...right.alphabet, ...left.alphabet, specialSymbol);

    // vytvoříme kopii levého automatu (jako wprapper pro L_q,q')
    let copyLeft = left.clone();
    // tato kopie
    copyLeft.initialState.isInitial = false;
    for (let state of objectValues(copyLeft.finalStates)) {
        state.isFinal = false;
    }

    //převedeme stavy do pole
    let copyLeftStates = objectValues(copyLeft.states);

    //pro všechny kombinace q a q' jako počáteční a koncový stav si přidáme # pravidla do levého automatu
    // (levý automat se tak rovnou stává i automatem v teorii jako M')
    for (let newInitialState: State of copyLeftStates) {
        for (let newFinalState: State of copyLeftStates) {
            //nastavíme procházené stavy jako poáteční a koncový
            copyLeft.initialState = newInitialState;
            newInitialState.isInitial = true;
            copyLeft.finalStates = {[newFinalState.name]: newFinalState};
            newFinalState.isFinal = true;

            //naklonujeme takto upravený levý automat a zbavíme se nepotřebných stavů
            let partLeft = copyLeft.clone();
            partLeft.removeUnreachableStates();

            //pokud nový počáteční a koncový stav propojeny
            if (Object.keys(partLeft.finalStates).length > 0) {
                //zbavíme se dalších nepotřebných stavů
                partLeft.removeTrapStates();

                //provedeme průnik s pravým automatem a zbavíme se nepotřebných stavů
                let intersection = intersectionFA(partLeft, right);
                intersection.removeUnreachableStates();
                // pokud stále existuje cesta mezi q a q', vytvoříme mezi nima # přechod
                if (Object.keys(intersection.finalStates).length > 0) {
                    left.rules.push(new Rule({
                        from: {state: left.states[newInitialState.name]},
                        to: {state: left.states[newFinalState.name]},
                        symbol: specialSymbol
                    }));
                }
            }

            //uklidíme po práci cyklu
            newFinalState.isFinal = false;
            newInitialState.isInitial = false;
        }
    }

    return specialRulesToResultAutomata(left, right, specialSymbol);
};

/**
 * Převádí automat s # přechody na h(L(M') (průnik) Sigma*#Sigma*)
 * @param {FA} left (jako M')
 * @param {FA} right
 * @param {string} specialSymbol
 * @return FA
 */
export function specialRulesToResultAutomata(left: FA, right: FA, specialSymbol: string): FA {
    //Vytovříme automat přijímající Sigma*#Sigma*
    let sigmaIterSpecialSigmaIter = new FA();

    //vytvoříme abecedu
    sigmaIterSpecialSigmaIter.alphabet = left.alphabet;

    //vytvoříme stavy
    let initState = new State({name: 'start', isInitial: true});
    let finalState = new State({name: 'end', isFinal: true});
    sigmaIterSpecialSigmaIter.states = {[initState.name]: initState, [finalState.name]: finalState};
    initState.isInitial = true;
    sigmaIterSpecialSigmaIter.initialState = initState;
    finalState.isFinal = true;
    sigmaIterSpecialSigmaIter.finalStates = {[finalState.name]: finalState};

    // vytvoříme pravidla
    sigmaIterSpecialSigmaIter.rules = [new Rule({
        from: {state: initState},
        to: {state: finalState},
        symbol: specialSymbol
    })];
    for (let symbol of [...left.alphabet, ...right.alphabet]) {
        sigmaIterSpecialSigmaIter.rules.push(new Rule({
            from: {state: initState},
            to: {state: initState},
            symbol: symbol
        }));
        sigmaIterSpecialSigmaIter.rules.push(new Rule({
            from: {state: finalState},
            to: {state: finalState},
            symbol: symbol
        }));
    }

    //provedeme průnik M' s Sigma*#Sigma* a nahradíme # za prázné přechody
    let intersection = intersectionFA(left, sigmaIterSpecialSigmaIter);
    let index = intersection.alphabet.indexOf(specialSymbol);
    if (index !== -1) intersection.alphabet.splice(index, 1);
    for (let rule of intersection.rules) {
        if (rule.symbol === specialSymbol) {
            rule.symbol = '';
        }
    }
    //odstraníme nepotřebné stavy
    intersection.removeTrapStates();
    intersection.removeUnreachableStates();

    return intersection;
}