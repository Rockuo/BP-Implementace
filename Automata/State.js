//@flow
import _ from 'lodash';

export type T_PlainState = { name: string }

/**
 *
 * @type {Rule}
 */
export default class State {

    _name: string;
    _isInitial: boolean;
    _isFinal: boolean;

    /**
     *
     * @param {object} plainRule
     */
    constructor({name, isInitial = false, isFinal = false}: { name: string, isInitial: boolean, isFinal: boolean }) {
        this._name = name;
        this._isInitial = isInitial;
        this._isFinal = isFinal;
    }

    /**
     *
     * @param {object} plainStates
     */
    static createStates(plainStates:T_PlainState[]): { [key: string]: State } {
        let states = {};
        _.each(plainStates, plainState => {
            states[plainState.name] = new State(plainState);
        });
        return states;
    }


    get name():string {
        return this._name;
    }

    setAsInitial() {
        this._isInitial = true
    }

    setAsFinal() {
        this._isFinal = true
    }

    get isInitial():boolean {
        return this._isInitial;
    }

    set isInitial(value:boolean) {
        this._isInitial = value;
    }

    get isFinal():boolean {
        return this._isFinal;
    }

    set isFinal(value:boolean) {
        this._isFinal = value;
    }
};