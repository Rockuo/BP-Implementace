const _ = require('lodash');

/**
 *
 * @type {Rule}
 */
export default class State {
    /**
     *
     * @param {object} plainRule
     */
    constructor({name, isInitial = false, isFinal = false}) {
        this._name = name;
        this._isInitial = isInitial;
        this._isFinal = isFinal;
    }

    /**
     *
     * @param {object} plainStates
     */
    static createStates(plainStates) {
        let states = {};
        _.each(plainStates, plainState => {
            states[plainState.name] = new State(plainState);
        });
        return states;
    }


    get name() {
        return this._name;
    }

    setAsInitial() {
        this._isInitial = true
    }

    setAsFinal() {
        this._isFinal = true
    }

    get isInitial() {
        return this._isInitial;
    }

    set isInitial(value) {
        this._isInitial = value;
    }

    get isFinal() {
        return this._isFinal;
    }

    set isFinal(value) {
        this._isFinal = value;
    }
};