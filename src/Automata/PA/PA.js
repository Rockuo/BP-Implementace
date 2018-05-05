//@flow
import Automata from '../Automata';
import Alphabet from "../Alphabet";
import _ from 'lodash';
import Rule from "../Rule";
import Stack from "../Stack";
import State from "../State/State";

import type {T_PlainAutomata} from '../Automata';
import type {T_PlainRule} from "../Rule";
import {toPlain} from "../services/plainPA";
import FA from "../FA/FA";


export type T_PlainPA = T_PlainAutomata & {
    initialStackSymbol: string,
    stackAlphabet: string[],
};

/**
 * Třída reprezentující zásobníkový automat
 * @type {FA}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {string} initialStackSymbol
 * @property {Alphabet} stackAlphabet
 * @property {Stack} stack
 */
export default class PA extends Automata {

    initialStackSymbol: string;
    stackAlphabet: Alphabet;
    stack: Stack;

    /**
     * @param {{
     *  states: array,
     *  alphabet: string[],
     *  rules: array,
     *  initialState: object,
     *  finalStates: array,
     *  initialStackSymbol: string,
     *  stackAlphabet: string[],
     *  }} plainAutomata
     */
    constructor(plainAutomata: T_PlainPA) {
        super(plainAutomata);
        this.initialStackSymbol = plainAutomata.initialStackSymbol;
        this.stackAlphabet = new Alphabet(...plainAutomata.stackAlphabet);
        this.stack = new Stack(this.initialStackSymbol);
    }

    /**
     * Přepisuje původní _createRules metodu, tak aby fungovala pro zásobníkový automat
     * @param {array} plainRules
     * @param {State[]} states
     * plainRules:T_PlainRule[], states:{[key:string]:State}
     * plainRules: T_PlainRule[], states:{[key:string]:State}
     */
    _createRules(plainRules: T_PlainRule[], states: { [key: string]: State }) {
        return plainRules.map(plainRule => new Rule({
            from: {state: states[plainRule.from.state.name], stackTop: plainRule.from.stackTop},
            to: {state: states[plainRule.to.state.name], stackTop: plainRule.to.stackTop},
            symbol: plainRule.symbol
        }, true));
    }

    clone(){
        return new PA(toPlain(this));
    }

}