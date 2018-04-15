//@flow
import State from './State/State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';
import {toPlain} from './services/plainAutomata';


import type {T_PlainRule} from './Rule';
import type {T_PlainState} from './State/State';
import {objectTypedValues} from "./services/object";


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
    states: { [key: string]: State };
    alphabet: Alphabet;
    rules: Rule[];
    initialState: State;
    finalStates: { [key: string]: State };
    _ignoreRules: {[key: string]: string };

    /**
     */
    constructor(settings?: T_PlainAutomata) {
        if (settings) {
            this._initFromPlain(settings);
        }
    }

    _initFromPlain({states, alphabet, rules, initialState, finalStates}: T_PlainAutomata) {
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
    _createRules(plainRules: T_PlainRule[], states: { [key: string]: State }): Rule[] {
        return plainRules.map(plainRule => new Rule({
            from: {state: states[plainRule.from.state.name]},
            to: {state: states[plainRule.to.state.name]},
            symbol: plainRule.symbol
        }));
    }

    /**
     *
     * @param {string} name
     */
    _findInitialState(name: string): State {
        return objectTypedValues(this.states, State).find(state => {
            if (state.name === name) {
                state.setAsInitial();
                return true;
            }
            return false;
        })
    }

    /**
     * Vynutí, aby byl pouze jeden konečný stav
     */
    forceOneFinalState() {
        let newFinalState = new State({
            name: 'F-'+objectTypedValues(this.finalStates,State).map((state:State) => state.name).join('-'),
            isFinal:true
        });
        for (let state of objectTypedValues(this.finalStates,State)) {
            state.isFinal = false;
            this.rules.push(new Rule({from: {state}, to: {state:newFinalState}, symbol: ''}))
        }
        this.finalStates = {[newFinalState.name]:newFinalState};
        this.states[newFinalState.name] = newFinalState;
    }

    /**,
     * @param {array} finalStates
     * @returns {object}
     * @private
     */
    _findFinalStates(finalStates: T_PlainState[]): { [key: string]: State } {
        let finalNames = _.map(finalStates, state => state.name);
        return _.pickBy(this.states, state => {
            if (finalNames.includes(state.name)) {
                state.setAsFinal();
                return true;
            }
            return false;
        });
    }

    /**
     * Smaže neukončující stavy(a přechody k nim)
     */
    removeUselessStatesAndRules() {
        this.states = {};
        this._removeUselessStates(objectTypedValues(this.finalStates));
        this._removeUselessRules();
    }

    _removeUselessRules() {
        let newRules = [];
        let states = objectTypedValues(this.states);
        for (let rule of this.rules) {
            if (
                states.filter(state => rule.from.state.name === state.name).length > 0 &&
                states.filter(state => rule.to.state.name === state.name).length > 0
            ) {
                newRules.push(rule);
            }
        }
        this.rules = newRules;
    }

    _removeUselessStates(useful: State[]) {
        for (let finalState of (useful: State[])) {
            let newUseful = this.rules
                .filter((rule: Rule) => rule.to.state.name === finalState.name && !this.states[rule.from.state.name])
                .map((rule: Rule) => {
                    let state = rule.from.state;
                    this.states[state.name] = state;
                    return state
                });

            if (!newUseful.length) return;

            this._removeUselessStates(newUseful);
        }
    }

    _findRules(from: State, symbol: string): Rule[] {
        // let rules = this.rules
        //     .filter((rule: Rule) => !(this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol))
        //     .filter((rule:Rule) => rule.from.state.name === from.name)
        //     .filter((rule:Rule) => rule.symbol === symbol);
        //
        // for (let rule of this.rules) {
        //     let a =!(!!this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol);
        //     let e = rule.from.state.name;
        //     let c = this._ignoreRules[rule.from.state.name] === rule.symbol;
        //     let b = !!this._ignoreRules[rule.from.state.name];
        //     let d =!(this._ignoreRules[rule.from.state.name] && this._ignoreRules[rule.from.state.name] === rule.symbol);
        // }

        return this.rules
            .filter((rule: Rule) => !(this._ignoreRules[rule.from.state.name] === rule.symbol))
            .filter((rule: Rule) => rule.from.state.name === from.name)
            .filter((rule: Rule) => rule.symbol === symbol);
    }

    accepts(word: string, state: State = this.initialState, initialCall = true): boolean {
        if(initialCall) {
            this._ignoreRules = {};
            // this.debugRoute=[];
        }


        if (!word) {
            if(state.isFinal) return true;
            for (let rule of this._findRules(state, '')) {
                if (rule.to.state.isFinal) return true;
            }
            return false;
        }
        let symbol = word[0];
        word = word.slice(1);

        for (let rule of this._findRules(state, symbol)) {
            let ignoreBackup = this._ignoreRules;
            this._ignoreRules = {};
            let result = this.accepts(word, rule.to.state, false);
            this._ignoreRules = ignoreBackup;
            if (result) {
                // this.debugRoute.push({from:rule.from.state.name, symbol:rule.symbol, to:rule.to.state.name});
                return true
            }
        }

        word = symbol + word;
        for (let rule of this._findRules(state, '')) {
            let ignoreBackup = this._ignoreRules;
            this._ignoreRules[rule.from.state.name] = '';
            let result = this.accepts(word, rule.to.state, false);
            this._ignoreRules = ignoreBackup;
            if (result) return true;
        }


        return false;
    }

    /**
     * @param {State} state
     */
    addState(state: State) {
        this.states[state.name] = state;
    }

    /**
     * @param {string} symbol
     */
    addSymbol(symbol: string) {
        this.alphabet.push(symbol);
    }

    /**
     * @param {Rule} rule
     */
    addRule(rule: Rule) {
        this.rules.push(rule);
    }

    equals(automata: Automata): boolean {
        return _.isEqual(toPlain(this), toPlain(automata));
    }
};