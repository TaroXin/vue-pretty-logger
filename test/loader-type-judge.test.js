const loggerTypeJudge = require('../lib/utils/logger-type-judge')

test('test loggerTypeJudge assignment', () => {
    const input = {
        logger: '// {#}',
        input: 'let a = 0 // {#}',
        index: 10
    }

    const output = {
        logger: '// {#}',
        input: 'let a = 0',
        var: 'a',
        type: 'ASSIGNMENT',
        functionName: ''
    }
    
    expect(JSON.stringify(loggerTypeJudge(input.logger, input.input, input.index))).toBe(JSON.stringify(output))
})

test('test loggerTypeJudge function', () => {
    const input = {
        logger: '// {#}',
        input: 'test (a, b) { // {#}',
        index: 14
    }

    const output = {
        logger: '// {#}',
        input: 'test (a, b) {',
        var: ['a', ' b'],
        type: 'FUNCTION',
        functionName: 'test'
    }
    
    expect(JSON.stringify(loggerTypeJudge(input.logger, input.input, input.index))).toBe(JSON.stringify(output))
})

test('test loggerTypeJudge function call', () => {
    const input = {
        logger: '// {#}',
        input: 'this.test(p1, p2) // {#}',
        index: 18
    }

    const output = {
        logger: '// {#}',
        input: 'this.test(p1, p2)',
        var: ['p1', ' p2'],
        type: 'FUNCTION_CALL',
        functionName: 'test'
    }
    
    expect(JSON.stringify(loggerTypeJudge(input.logger, input.input, input.index))).toBe(JSON.stringify(output))
})

test('test loggerTypeJudge function call with await', () => {
    const input = {
        logger: '// {#}',
        input: 'await test() // {#}',
        index: 13
    }

    const output = {
        logger: '// {#}',
        input: 'await test()',
        var: [],
        type: 'FUNCTION_CALL',
        functionName: 'test'
    }
    
    expect(JSON.stringify(loggerTypeJudge(input.logger, input.input, input.index))).toBe(JSON.stringify(output))
})

test('test loggerTypeJudge function callback', () => {
    const input = {
        logger: '// {#}',
        input: 'this.test("test", (result) => { // {#}',
        index: 32
    }

    const output = {
        logger: '// {#}',
        input: 'this.test("test", (result) => {',
        var: ['result'],
        type: 'FUNCTION_CALLBACK',
        functionName: 'test'
    }
    
    expect(JSON.stringify(loggerTypeJudge(input.logger, input.input, input.index))).toBe(JSON.stringify(output))
})
