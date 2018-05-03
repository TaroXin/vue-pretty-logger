const loggerTypes = require('../constant/logger-types')

const assignmentTag = ['let', 'const', 'var']

module.exports = (logger, input, index) => {
    // 判断是否为赋值语句
    input = input.substring(0, index).trim()
    const result = {
        logger: logger,
        input: input
    }

    let assignmentVar = ''
    assignmentTag.forEach(tag => {
        if (input.indexOf(tag) > -1 && input.indexOf('=') > -1) {
            assignmentVar = input.substring(
                input.indexOf(tag) + tag.length,
                input.indexOf('=')
            ).trim()
        }
    })

    // 如果是赋值语句, 直接返回赋值的变量名称
    if (assignmentVar) {
        result.type = loggerTypes.ASSIGNMENT
        result.var = assignmentVar
        return result
    }

    return null
}
