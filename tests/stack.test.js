const runTest = require('ava');
const Stack = require('../dist/Automata/Stack').default;


runTest('simple', test => {
    let stack = new Stack('S');
    test.is(stack.length,1);
    test.is(stack.peek(),'S');

    test.true(stack.write('S','a'),'Sa');
    test.is(stack.peek(),'a');
});
