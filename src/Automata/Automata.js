//@flow
import State from './State/State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';


import type {T_PlainRule} from './Rule';
import type {T_PlainState} from './State/State';
import {objectValues} from "./services/object";
import {AbstractClassException} from "./exceptions";


/**
 * Datový typ pro čistý automat
 */
export type T_PlainAutomata = {
    states: T_PlainState[],
    alphabet: string[],
    rules: T_PlainRule[],
    initialState: T_PlainState,
    finalStates: T_PlainState[],
};

/**
 * @abstract
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
    _ignoreRules: { [key: string]: string };

    /**
     * @param {T_PlainAutomata} settings
     */
    constructor(settings?: T_PlainAutomata) {
        if(this.constructor.name === 'Automata') {
            throw new AbstractClassException(this.constructor.name)
        }
        if (settings) {
            this._initFromPlain(settings);
        }
    }

    /**
     * @param {{}} states
     * @param {{}} alphabet
     * @param {{}} rules
     * @param {{}} initialState
     * @param {{}} finalStates
     * @private
     */
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
        return objectValues(this.states).find(state => {
            if (state.name === name) {
                state.setAsInitial();
                return true;
            }
            return false;
        });
    }

    /**
     * Vynutí, aby byl pouze jeden konečný stav
     */
    forceOneFinalState() {
        let newFinalState = new State({
            name: 'F-' + objectValues(this.finalStates).map((state: State) => state.name).join('-'),
            isFinal: true
        });
        for (let state of objectValues(this.finalStates)) {
            state.isFinal = false;
            this.rules.push(new Rule({from: {state}, to: {state: newFinalState}, symbol: ''}))
        }
        this.finalStates = {[newFinalState.name]: newFinalState};
        this.states[newFinalState.name] = newFinalState;
    }

    /**,
     * @param {array} finalStates
     * @returns {object}
     * @private
     */
    _findFinalStates(finalStates: T_PlainState[]): { [key: string]: State } {
        let finalNames = finalStates.map((state:State)=> state.name);
        return _.pickBy(this.states, state => {
            if (finalNames.includes(state.name)) {
                state.setAsFinal();
                return true;
            }
            return false;
        });
    }

    /**
     * Odstraní nedostupné stavy
     */
    removeUnreachableStates() {
        this.states = {[this.initialState.name]: this.initialState};
        this._ignoreRules = {};
        this._removeUnreachableStates([this.initialState]);
        this._removeUnattachedRules();
        for (let fState:State of objectValues(this.finalStates)){
            if(!this.states[fState.name]){
                delete this.finalStates[fState.name];
            }
        }
    }

    /**
     * Smaže neukončující stavy(a přechody k nim)
     */
    removeTrapStates() {
        this.states = {...this.finalStates};
        this._ignoreRules = {};
        this._removeTrapStates(objectValues(this.finalStates));
        this._removeUnattachedRules();
        this.states[this.initialState.name] = this.initialState;
    }

    _removeUnattachedRules() {
        let newRules = [];
        let states = objectValues(this.states);
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


    _removeUnreachableStates(reachables: State[] = [this.initialState]) {
        for (let reachable of reachables) {
            let newReachable = this.rules
                .filter((rule: Rule) => rule.from.state.equals(reachable) && !this.states[rule.to.state.name])
                .map((rule: Rule) => {
                    let state = rule.to.state;
                    this.states[state.name] = state;
                    return state
                });

            if (newReachable.length) {
                this._removeUnreachableStates(newReachable);
            }
        }
    }


    _removeTrapStates(useful: State[]) {
        for (let finalState of (useful: State[])) {
            let newUseful = this.rules
                .filter((rule: Rule) => rule.to.state.name === finalState.name && !this.states[rule.from.state.name])
                .map((rule: Rule) => {
                    let state = rule.from.state;
                    this.states[state.name] = state;
                    return state
                });

            if (newUseful.length) {
                this._removeTrapStates(newUseful);
            }
        }
    }

    _findRules(from: State, symbol?: (string|void) = undefined): Rule[] {
        return this.rules
            .filter((rule: Rule) => !(this._ignoreRules[rule.from.state.name] === rule.symbol))
            .filter((rule: Rule) => rule.from.state.name === from.name)
            .filter((rule: Rule) => symbol === undefined || rule.symbol === symbol);
    }

    /**
     * ajistí právě jeden uklízecí stav
     */
    ensureOneTrapState() {
        this.removeTrapStates();
        let cleanState = new State({
            name: `clean(id_${State.randomName()})`
        });
        this.states[cleanState.name] = cleanState;
        for (let state of objectValues(this.states)) {
            let existingSymbols = this._findRules(state).map((rule: Rule) => rule.symbol);
            for (let symbol of this.alphabet) {
                if (existingSymbols.indexOf(symbol) < 0) {
                    this.rules.push(new Rule({from: {state}, to: {state: cleanState}, symbol}));
                }
            }
        }
        for (let symbol of this.alphabet) {
            this.rules.push(new Rule({from: {state: cleanState}, to: {state: cleanState}, symbol}));
        }
    }

    _followEmptyRules(state: State) {
        let found;
        do {
            let emptyRules = this._findRules(state, '');
            found = !!emptyRules.length;
            for (let emptyRule of emptyRules) {
                _.remove(this.rules, (rule: Rule) => rule.equals(emptyRule));
                let nextStateRules = this._findRules(emptyRule.to.state);
                for (let nextStateRule of nextStateRules) {
                    this.rules.push(new Rule({
                        from: {state: state},
                        symbol: nextStateRule.symbol,
                        to: nextStateRule.to
                    }));
                }
                if (emptyRule.to.state.isFinal) {
                    state.isFinal = true
                }
            }
        } while (found)
    }

    /**
     * Odstraní sigma pravidla
     */
    removeEmptyRules() {
        //vyčstíme si ignore rules (jen pro jistotu)
        this._ignoreRules = {};
        for (let state of objectValues(this.states)) {
            this._followEmptyRules(state);
        }
        this.removeUnreachableStates();
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
};