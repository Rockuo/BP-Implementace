//@flow
import Automata from '../Automata/Automata';
import {toPlainLeft, toPlainRight} from '../Automata/services/plainFA_OR_PA';
import PA from "../Automata/PA/PA";
import FA from "../Automata/FA/FA";

import type {T_PlainAutomata} from '../Automata/Automata';
import type {T_PlainPA} from '../Automata/PA/PA';
import type {T_AnyPlainAutomata} from '../Automata/services/plainFA_OR_PA';
import {overload} from "../Automata/services/overload";





    /**
     *
     * @param  Left
     * @param  Right
     * @param automataType
     */
export default function union(Left:(Automata|PA|FA), Right:(Automata|PA|FA)) {
    // $FlowFixMe
    Left = (Left:(Left.constructor));
    // $FlowFixMe
    Right = (Right:(Right.constructor));

    let plainLeft:T_AnyPlainAutomata = toPlainLeft(Left), plainRight:T_AnyPlainAutomata = toPlainRight(Right);
    // přidání pravidel s prázdnými přechody
    let rules = [
        {from: {state:{name:'s'}}, to: {state: {name: plainLeft.initialState.name}}, symbol: ''},
        {from: {state:{name:'s'}}, to: {state: {name: plainRight.initialState.name}}, symbol: ''},
    ];
    for (let finalState of [...plainLeft.finalStates, ...plainRight.finalStates]) {
        rules.push({
            from: {state:{name: finalState.name}},
            to: {state: {name:'f'}},
            symbol: ''
        });
    }

    let plainUnion = {
        states: [{name: 's'}, {name: 'f'}, ...plainLeft.states, ...plainRight.states],
        alphabet: [...plainLeft.alphabet, ...plainRight.alphabet],
        rules: [...rules, ...plainLeft.rules, ...plainRight.rules],
        finalStates: [{name: 'f'}],
        initialState: {name: 's'}
    };

    let paFun = (l,r) => {additional(l,r,plainUnion)};
    overload(
        [
            {parameters: [{value: Left, type: FA}, {value: Right, type: PA}], func: paFun},
            {parameters: [{value: Left, type: PA}, {value: Right, type: FA}], func: paFun},
            {parameters: [{value: Left, type: PA}, {value: Right, type: PA}], func: paFun},
            {parameters: [{value: Left, type: FA}, {value: Right, type: FA}], func: ()=>{}},
        ]
    );

    return new Left.constructor(plainUnion);
}


function additional(plainLeft: T_AnyPlainAutomata, plainRight: T_AnyPlainAutomata, plainUnion: T_AnyPlainAutomata) {
    // $FlowFixMe
    plainLeft = (plainLeft: T_PlainPA);
    // $FlowFixMe
    plainRight = (plainRight: T_PlainPA);
    // $FlowFixMe
    plainUnion = (plainUnion: T_PlainPA);

    plainUnion.initialStackSymbol = '';
    plainUnion.stackAlphabet = [...plainLeft.stackAlphabet, ...plainRight.stackAlphabet];

}