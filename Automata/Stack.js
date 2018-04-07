//@flow

export default class Stack {

    stack:string[];

    constructor(initialState:string) {
        this.stack = [initialState];
    }

    get length():number {
        return this.stack.length;
    }

    peek():string {
        return this.stack[this.length-1];
    }

    write(expectedTop:string, nextTop:string):boolean {
        if(expectedTop !== ''){
            if(expectedTop === this.peek())
            {
                this.stack.pop();
            } else {
                return false;
            }
        }

        if(nextTop.length) {
            this.stack.push(...nextTop.split(''));
        }
        return true;
    }
}