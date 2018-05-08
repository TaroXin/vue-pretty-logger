// logger-parser
const typeJudge = require('./logger-type-judge')
const noteJudge = require('./logger-note-judge')
const loggerTypes = require('../constant/logger-types')

const isDevelopment = 
    process.env.NODE_ENV ? 
    (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') : 
    true

const loggerParser = {
    constant: {
        LOGGER_REG: /\/\/[^\n]*/
    }
}

loggerParser.isLoggerLine = function (line, options) {
    return line.indexOf(`// {${options.hook}}`) > -1
}

loggerParser.getLoggerNote = function (loggerLine, options) {
    const result = {}
    try {
        let contentArr = loggerParser.constant.LOGGER_REG.exec(loggerLine)
        result.logger = contentArr ? contentArr[0] : ''
        if (result.logger.indexOf(`// {${options.hook}}`) > -1) {
            result.input = contentArr.input
            result.index = contentArr.index
            return result
        } else {
            return loggerLine
        }
    } catch (error) {
        console.error('pretty-logger:', error)
        return loggerLine
    }
}

loggerParser.parseLogger = function (loggerLine, options) {
    // replace the current line with the options

    // get logger note
    const result = loggerParser.getLoggerNote(loggerLine, options)

    // judge the type of line that has logger
    const loggerType =
        typeJudge(result.logger, result.input, result.index) || {type: ''}

    if (!isDevelopment) {
        return loggerType.input
    }

    switch (loggerType.type) {
        case loggerTypes.ASSIGNMENT:
            loggerLine = noteJudge.withAssignment(loggerType, options)
            break
        case loggerTypes.FUNCTION:
            loggerLine = noteJudge.withFunction(loggerType, options)
            break
        case loggerTypes.FUNCTION_CALL:
            loggerLine = noteJudge.withFunctionCall(loggerType, options)
            break
        case loggerTypes.FUNCTION_CALLBACK:
            loggerLine = noteJudge.withFunctionCallback(loggerType, options)
        default:
            break
    }

    return loggerLine
}

module.exports = loggerParser
