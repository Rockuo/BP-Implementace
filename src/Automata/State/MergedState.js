//@flow
import State from "./State";


/**
 * @type {State}
 * @property {string} name
 * @property {boolean} isInitial
 * @property {boolean} isFinal
 * @property {State} oldLeft
 * @property {State} oldRight
 */
export default class MergedState extends State {
    oldLeft: State;
    oldRight: State;

    /**
     * @param lState
     * @param rState
     */
    constructor(lState: State, rState: State) {
        super({
            name: MergedState.createName(lState, rState),
            isInitial: lState.isInitial && rState.isInitial,
            isFinal: lState.isFinal && rState.isFinal
        });
        this.oldLeft = lState;
        this.oldRight = rState;
    }

    /**
     * Vrací spojené jméno
     * @param lState
     * @param rState
     * @return {string}
     */
    static createName(lState: State, rState: State) {
        return `${lState.name}-${rState.name}`;
    }
};