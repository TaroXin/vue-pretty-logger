function Example (test) { // {#} -sign -w -t Example
    let a = 123

    testFunc(a) // {#} -sign -i -from -time -profile

    testFuncCallback((val) => { // {#} -sign -d
        // do something
    })
}

function testFunc (form) {
    return 'Return me!'
}

function testFuncCallback (cb) {
    cb && cb('Callback return me')
}

export default Example