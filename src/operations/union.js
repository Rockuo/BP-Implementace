//@flow
import Automata from '../Automata/Automata';
import {toPlainLeft, toPlainRight} from '../Automata/services/plainFA_OR_PA';
import PA from "../Automata/PA/PA";
import FA from "../Automata/FA/FA";
import type {T_PlainPA} from '../Automata/PA/PA';
import type {T_AnyPlainAutomata} from '../Automata/services/plainFA_OR_PA';
import {overload} from "../Automata/services/overload";
import State from "../Automata/State/State";

/**
 * Sjednocení dvou Automatů
 * @param {Automata} left
 * @param  {Automata} right
 * @return Automata
 */
export default function union(left: (Automata | PA | FA), right: (Automata | PA | FA)) {
    //Nejprve řekneme Flow, o jak datový tym se jedná (Flow v tomto případě nezvládá přetypování samo)
    // $FlowFixMe
    left = (left: (left.constructor));
    // $FlowFixMe
    right = (right: (right.constructor));

    //Převedeme si automat na jeho serializovatelnou reprezentaci
    let plainLeft: T_AnyPlainAutomata = toPlainLeft(left), plainRight: T_AnyPlainAutomata = toPlainRight(right);

    // suffix pro nové stavy
    let suffix = State.randomName();


    //sestrojíme automat
    let plainUnion:T_AnyPlainAutomata = {
        states: [{name: 's' + suffix}, ...plainLeft.states, ...plainRight.states],
        alphabet: [...plainLeft.alphabet, ...plainRight.alphabet],
        finalStates: [...plainLeft.finalStates, ...plainRight.finalStates],
        initialState: {name: 's' + suffix}
    };

    // wrapper pro předávání parametrů
    let paFun = () => additionalPA(plainLeft, plainRight, plainUnion, suffix);
    // wrapper pro předávání parametrů
    let faFun = () => additionalFA(plainLeft, plainRight, plainUnion, suffix);

    // Nastavíme jaká funkce se má volat pro kterou kombinaci automatů
    //v tomto případě, pokud je jeden z automatů Zásobníkový, používáme funkci additionalPA
    return overload(
        [
            {parameters: [{value: left, type: FA}, {value: right, type: PA}], func: paFun},
            {parameters: [{value: left, type: PA}, {value: right, type: FA}], func: paFun},
            {parameters: [{value: left, type: PA}, {value: right, type: PA}], func: paFun},
            {parameters: [{value: left, type: FA}, {value: right, type: FA}], func: faFun},
        ]
    );
}

/**
 * Provede akce specifické pro zásobníkový automat
 * @param plainLeft
 * @param plainRight
 * @param plainUnion
 * @param suffix
 */
function additionalPA(
    plainLeft: T_AnyPlainAutomata,
    plainRight: T_AnyPlainAutomata,
    plainUnion: T_AnyPlainAutomata,
    suffix: string
) {
    // $FlowFixMe
    plainLeft = (plainLeft: T_PlainPA);
    // $FlowFixMe
    plainRight = (plainRight: T_PlainPA);
    // $FlowFixMe
    plainUnion = (plainUnion: T_PlainPA);

    // nastavíme
    plainUnion.initialStackSymbol = 'S';
    plainUnion.stackAlphabet = ['S', ...plainLeft.stackAlphabet, ...plainRight.stackAlphabet];
    // Přidáme přechody z nového počátečního stavu do původních počátečních stavů
    let rules = [
        {
            from: {state: {name: 's' + suffix}, stackTop: 'S'},
            to: {state: {name: plainLeft.initialState.name},stackTop: plainLeft.initialStackSymbol},
            symbol: ''
        },
        {
            from: {state: {name: 's' + suffix}, stackTop: 'S'},
            to: {state: {name: plainRight.initialState.name},stackTop: plainLeft.initialStackSymbol},
            symbol: ''
        },
    ];
    plainUnion.rules = [...rules, ...plainLeft.rules, ...plainRight.rules];
    return new PA(plainUnion);
}

/**
 * Provede akce specifické pro konečný automat
 * @param plainLeft
 * @param plainRight
 * @param plainUnion
 * @param suffix
 */
function additionalFA(
    plainLeft: T_AnyPlainAutomata,
    plainRight: T_AnyPlainAutomata,
    plainUnion: T_AnyPlainAutomata,
    suffix: string
) {
    // Přidáme přechody z nového počátečního stavu do původních počátečních stavů
    let rules = [
        {from: {state: {name: 's' + suffix}}, to: {state: {name: plainLeft.initialState.name}}, symbol: ''},
        {from: {state: {name: 's' + suffix}}, to: {state: {name: plainRight.initialState.name}}, symbol: ''},
    ];
    plainUnion.rules = [...rules, ...plainLeft.rules, ...plainRight.rules];
    return new FA(plainUnion);
}