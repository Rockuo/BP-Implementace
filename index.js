var automata = {
    FA: require('./dist/Automata/FA/FA.js').default,
    DFA: require('./dist/Automata/FA/DFA').default,
    PA: require('./dist/Automata/PA/PA').default,
    Automata: require('./dist/Automata/Automata').default,
    State: require('./dist/Automata/State/State').default,
    MergedState: require('./dist/Automata/State/MergedState').default,
    Alphabet: require('./dist/Automata/Alphabet').default,
    Rule: require('./dist/Automata/Rule').default,
    Stack: require('./dist/Automata/Stack').default,
};

var exceptions = require('./dist/Automata/exceptions');

var services = {
    object: require('./dist/Automata/services/object'),
    overload: require('./dist/Automata/services/overload'),
    plainPA: require('./dist/Automata/services/plainPA'),
    plainFA: require('./dist/Automata/services/plainFA'),
    plainFA_OR_PA: require('./dist/Automata/services/plainFA_OR_PA'),
};

var _intersection = require('./dist/operations/intersectionFA');

automata.generateStates = _intersection.generateStates;

var operations = {
    complementFA: require('./dist/operations/complementFA').default,
    concatenationFA: require('./dist/operations/concatenationFA').default,
    differenceFA: require('./dist/operations/differenceFA').default,
    differentUnionFA: require('./dist/operations/differentUnionFA').default,
    fullAlphabetDeletionFA: require('./dist/operations/fullAlphabetDeletionFA').default,
    interlacementFA: require('./dist/operations/interlacementFA').default,
    intersectionFA: _intersection.default,
    operationDifferentFA: require('./dist/operations/operationDifferentFA').default,
    parallelInsertionFA: require('./dist/operations/parallelInsertionFA').default,
    popsFA: require('./dist/operations/popFA'),
    prefixesFA: require('./dist/operations/prefixesFA').default,
    reverseFA: require('./dist/operations/reverseFA').default,
    sequentialDeletionFA: require('./dist/operations/sequentialDeletionFA').default,
    sequentialInsertionFA: require('./dist/operations/sequentialInsertionFA').default,
    shuffleFA: require('./dist/operations/shuffleFA').default,
    union: require('./dist/operations/union').default,
    uniqueConcatenationFA: require('./dist/operations/uniqueConcatenationFA').default,
};

module.exports = {
    automata: automata,
    exceptions: exceptions,
    services: services,
    operations: operations,
};