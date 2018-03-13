//@flow
import Automata from './Automata';
import Alphabet from "./Alphabet";
import _ from 'lodash';
import Rule from "./Rule";
import Stack from "./Stack";
import State from "./State";

import type {T_PlainAutomata} from './Automata';
import type {T_PlainRule} from "./Rule";

export type T_PlainPA = T_PlainAutomata & {
    initialStackSymbol: string,
    stackAlphabet: string[],
};

export default class PA extends Automata {

    _initialStackSymbol: string;
    _stackAlphabet: Alphabet;
    _stack: Stack;

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
        this._initialStackSymbol = plainAutomata.initialStackSymbol;
        this._stackAlphabet = new Alphabet(...plainAutomata.stackAlphabet);
        this._stack = new Stack(this._initialStackSymbol);
    }

    /**
     *
     * @param {array} plainRules
     * @param {State[]} states
     * plainRules:T_PlainRule[], states:{[key:string]:State}
     * plainRules: T_PlainRule[], states:{[key:string]:State}
     */
    _createRules(plainRules: T_PlainRule[], states: { [key: string]: State }) {
        return _.map(plainRules, plainRule => new Rule({
            from: {state: states[plainRule.from.state.name], stackTop: plainRule.from.stackTop},
            to: {state: states[plainRule.to.state.name], stackTop: plainRule.to.stackTop},
            symbol: plainRule.symbol
        }, true));
    }

    get initialStackSymbol(): string {
        return this._initialStackSymbol;
    }

    set initialStackSymbol(value: string) {
        this._initialStackSymbol = value;
    }

    get stackAlphabet(): Alphabet {
        return this._stackAlphabet;
    }

    set stackAlphabet(value: Alphabet) {
        this._stackAlphabet = value;
    }

    get stack(): Stack {
        return this._stack;
    }

    set stack(value: Stack) {
        this._stack = value;
    }
}