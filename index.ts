import stateManager from './stateManager';

const state = {
    number: 12,
    string: 'hi there!'
}

const test: any = stateManager({
    properties: state,
    // observers: 3
});

test.$subscribe(['number', 'string'], (value, newValue, oldValue, state) => {
    console.log('test reacted to', value, 'changing from', oldValue, 'to', newValue, ', current state:', state);
})

// test2.$subscribe(['string'], (value, newValue, oldValue, state) => {
//     console.log('test2 reacted to', value, 'changing from', oldValue, 'to', newValue, ', current state:', state);
// });

setTimeout(() => {
    test.state.number = 20;
    setTimeout(() => {
        test.state.string = 'derps';
    }, 1000);
}, 2000);