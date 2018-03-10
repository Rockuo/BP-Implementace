import State from './State';
import Alphabet from './Alphabet';
import Rule from './Rule';
import _ from 'lodash';

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

    /**
     * @param {array} states
     * @param {array} alphabet
     * @param {array} rules
     * @param {object} initialState
     * @param {array} finalStates
     */
    constructor({states, alphabet, rules, initialState, finalStates}) {
        this._states = State.createStates(states);
        this._alphabet = new Alphabet(...alphabet);
        this._rules = Rule.createRules(rules);
        this._initialState = this._findInitialState(initialState.name);
        this._finalStates = this._findFinalStates(finalStates);
    }

    /**
     *
     * @param {string} name
     */
    _findInitialState(name) {
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
    _findFinalStates(finalStates) {
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
    addState(state) {
        this._states[state.name] = state;
    }

    /**
     * @param {string} symbol
     */
    addSymbol(symbol) {
        this._alphabet.push(symbol);
    }

    /**
     * @param {Rule} rule
     */
    addRule(rule) {
        this._rules.push(rule);
    }

    get states() {
        return this._states;
    }

    get alphabet() {
        return this._alphabet;
    }

    get rules() {
        return this._rules;
    }

    get initialState() {
        return this._initialState;
    }

    get finalStates() {
        return this._finalStates;
    }


    set states(value) {
        this._states = value;
    }

    set alphabet(value) {
        this._alphabet = value;
    }

    set rules(value) {
        this._rules = value;
    }

    set initialState(value) {
        this._initialState = value;
    }

    set finalStates(value) {
        this._finalStates = value;
    }
};