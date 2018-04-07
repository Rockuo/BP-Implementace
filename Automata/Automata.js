//@flow
import State from './State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';
import {toPlain} from './services/plainAutomata';


import type {T_PlainRule} from './Rule';
import type {T_PlainState} from './State';

export type T_PlainAutomata = {
    states: T_PlainState[],
    alphabet: string[],
    rules: T_PlainRule[],
    initialState: T_PlainState,
    finalStates: T_PlainState[],
};

/**
 *
 * @type {Automata}
 * @property {{name:State}} states
 * @property {string[]} alphabet
 * @property {Rule[]} rules
 * @property {State} initialState
 * @property {{name:State}} finalStates
 */
export default class Automata {
    states: {[key: string]:State};
    alphabet:Alphabet;
    rules:Rule[];
    initialState:State;
    finalStates:{[key: string]:State};


    /**
     */
    constructor(settings?:T_PlainAutomata) {
        if(settings) {
            this._initFromPlain(settings);
        }
    }

    _initFromPlain({states, alphabet, rules, initialState, finalStates}:T_PlainAutomata) {
        this.states = State.createStates(states);
        this.alphabet = new Alphabet(...alphabet);
        this.rules = this._createRules(rules, this.states);
        this.initialState = this._findInitialState(initialState.name);
        this.finalStates = this._findFinalStates(finalStates);
    }

    /**
     *
     * @param {array} plainRules
     * @param states
     */
    _createRules(plainRules:T_PlainRule[], states:{[key:string]:State}):Rule[] {
        return _.map(plainRules, plainRule => new Rule({
            from: {state: states[plainRule.from.state.name]},
            to: {state: states[plainRule.to.state.name]},
            symbol: plainRule.symbol
        }));
    }

    /**
     *
     * @param {string} name
     */
    _findInitialState(name:string):State {
        return _.find(this.states, state => {
            if(state.name === name) {
                state.setAsInitial();
                return true;
            }
            return false;
        })
    }

    /**
     * @param {array} finalStates
     * @returns {object}
     * @private
     */
    _findFinalStates(finalStates: T_PlainState[]):{[key: string]:State} {
        let finalNames = _.map(finalStates, state => state.name);
        return _.pickBy(this.states, state => {
            if(finalNames.includes(state.name)){
                state.setAsFinal();
                return true;
            }
            return false;
        });
    }

    _findRules(from:State, symbol:string):Rule[] {
        let rules = this.rules
            .filter((rule:Rule) => rule.from.state.name === from.name)
            .filter((rule:Rule) => rule.symbol === symbol);



        return this.rules
            .filter((rule:Rule) => rule.from.state.name === from.name)
            .filter((rule:Rule) => rule.symbol === symbol);
    }

    accepts(word:string, state:State = this.initialState):boolean {
        if(!word) {
            return state.isFinal;
        }
        let symbol = word[0];
        word = word.slice(1);

        for (let rule of this._findRules(state, symbol)) {
            let result = this.accepts(word, rule.to.state);
            if(result) return true;
        }
        return false;
    }

    /**
     * @param {State} state
     */
    addState(state:State) {
        this.states[state.name] = state;
    }

    /**
     * @param {string} symbol
     */
    addSymbol(symbol:string) {
        this.alphabet.push(symbol);
    }

    /**
     * @param {Rule} rule
     */
    addRule(rule:Rule) {
        this.rules.push(rule);
    }

    equals(automata:Automata):boolean
    {
        return _.isEqual(toPlain(this), toPlain(automata));
    }
};