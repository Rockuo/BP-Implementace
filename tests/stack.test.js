let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const Stack = require(`../${source}/Automata/Stack`).default;


runTest('simple', test => {
    let stack = new Stack('S');
    test.is(stack.length,1);
    test.is(stack.peek(),'S');

    test.true(stack.write('S','a'),'Sa');
    test.is(stack.peek(),'a');
});
