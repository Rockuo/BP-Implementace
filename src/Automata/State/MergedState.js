//@flow
import State from "./State";


export default class MergedState extends State {

    oldLeft: State;
    oldRight: State;

    /**
     *
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


    static createName(lState: State, rState: State) {
        return `${lState.name}-${rState.name}`;
    }
};