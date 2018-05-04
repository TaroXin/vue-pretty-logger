// logger-parser
const typeJudge = require('./utils/logger-type-judge')
const noteJudge = require('./utils/logger-note-judge')
const loggerTypes = require('./constant/logger-types')

const loggerParser = {
    loggerNote: '// {#}',
    constant: {
        LOGGER_REG: /\/\/[^\n]*/
    }
}

loggerParser.isLoggerLine = function (line) {
    return line.indexOf(loggerParser.loggerNote) >= 0
}

loggerParser.getLoggerNote = function (loggerLine) {
    const result = {}
    try {
        let contentArr = loggerParser.constant.LOGGER_REG.exec(loggerLine)
        result.logger = contentArr ? contentArr[0] : ''
        if (result.logger.indexOf(loggerParser.loggerNote) > -1) {
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
    const result = loggerParser.getLoggerNote(loggerLine)
    // if (result === loggerLine) {
    //     return loggerLine
    // }

    // judge the type of line that has logger
    const loggerType =
        typeJudge(result.logger, result.input, result.index) || {type: ''}

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
    default:
        break
    }

    return loggerLine
}

module.exports = loggerParser
