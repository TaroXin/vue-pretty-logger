const loaderParser = require('../lib/logger-parser')

test('test parse logger with normal', () => {
    let test = 'let a = 0 // {#}'
    let testResult = 'let a = 0\nconsole.log(a)'
    expect(loaderParser.parseLogger(test)).toBe(testResult)
})