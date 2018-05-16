//@flow

export type T_PlainState = { name: string }

/**
 * Stav automatu
 * @type {State}
 * @property {string} name
 * @property {boolean} isInitial
 * @property {boolean} isFinal
 */
export default class State {

    name: string;
    isInitial: boolean;
    isFinal: boolean;

    /**
     * @param {object} plainRule
     */
    constructor({name, isInitial = false, isFinal = false}: { name: string, isInitial?: boolean, isFinal?: boolean }) {
        this.name = name;
        this.isInitial = isInitial;
        this.isFinal = isFinal;
    }

    /**
     * Přijímá čistý objekt stavu a vrací instanci State
     * @param {object} plainStates
     */
    static createStates(plainStates: T_PlainState[]): { [key: string]: State } {
        let states = {};
        for (let plainState of plainStates){
            states[plainState.name] = new State(plainState);
        }
        return states;
    }

    setAsInitial() {
        this.isInitial = true
    }

    setAsFinal() {
        this.isFinal = true
    }

    /**
     * Vrací náhodné jméno stavu s prefixem
     * @param {string} prefix
     * @return {string}
     */
    static randomName(prefix:string = ''):string{
        return prefix+Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    }

    equals(state: State) {
        return this.name === state.name;
    }
};