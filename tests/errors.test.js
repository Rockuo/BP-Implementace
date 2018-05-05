let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const Automata = require(`../${source}/Automata/Automata`).default;

runTest('abstract', test => {
    let ex;
    try {
        new Automata();
    } catch (e) {
        ex = e;
    }
    test.is(ex.className, 'AbstractClassException');
});
