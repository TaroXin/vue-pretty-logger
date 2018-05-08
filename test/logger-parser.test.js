const loggerParser = require('../lib/utils/logger-parser')

test('test parse logger with normal', () => {
    let test = 'let a = 0 // {#}'
    let testResult = 'let a = 0\nconsole.log(a)'
    expect(loggerParser.parseLogger(test, {hook: '#'})).toBe(testResult)
})

test('test function declaration', () => {
    let test = 'test () { // {#}'
    let testResult = 'test () {'
    expect(loggerParser.parseLogger(test, {hook: '#'})).toBe(testResult)
})

test('test function declaration with params', () => {
    let test = 'test (a, b) { // {#}'
    let testResult = 'test (a, b) {\nconsole.log(a, b)'
    expect(loggerParser.parseLogger(test, {hook: '#'})).toBe(testResult)
})
