//@flow
import State from './State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';


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
    _states: {[key: string]:State};
    _alphabet:Alphabet;
    _rules:Rule[];
    _initialState:State;
    _finalStates:{[key: string]:State};


    /**
     * @param {array} states
     * @param {array} alphabet
     * @param {array} rules
     * @param {object} initialState
     * @param {array} finalStates
     */
    constructor({states, alphabet, rules, initialState, finalStates}:T_PlainAutomata) {
        this._states = State.createStates(states);
        this._alphabet = new Alphabet(...alphabet);
        this._rules = this._createRules(rules, this._states);
        this._initialState = this._findInitialState(initialState.name);
        this._finalStates = this._findFinalStates(finalStates);
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
        return _.find(this._states, state => {
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


    /**
     * @param {State} state
     */
    addState(state:State) {
        this._states[state.name] = state;
    }

    /**
     * @param {string} symbol
     */
    addSymbol(symbol:string) {
        this._alphabet.push(symbol);
    }

    /**
     * @param {Rule} rule
     */
    addRule(rule:Rule) {
        this._rules.push(rule);
    }

    get states():{[key: string]:State} {
        return this._states;
    }

    get alphabet():Alphabet {
        return this._alphabet;
    }

    /**
     *
     * @return {Rule[]}
     */
    get rules():Rule[] {
        return this._rules;
    }

    get initialState():State {
        return this._initialState;
    }

    get finalStates():{[key: string]:State} {
        return this._finalStates;
    }


    set states(value:{[key: string]:State}) {
        this._states = value;
    }

    set alphabet(value:Alphabet) {
        this._alphabet = value;
    }

    /**
     * @param {Rule[]} value
     */
    set rules(value:Rule[]) {
        this._rules = value;
    }

    set initialState(value:State) {
        this._initialState = value;
    }

    set finalStates(value:{[key: string]:State}) {
        this._finalStates = value;
    }
};