// logger-note-judge
const loggerNoteJudge = {
    prefix: ' {#}',
    tag: '-t',
    dev: '-d',
    form: '-f',
    return: '-r'
}

loggerNoteJudge.withAssignment = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    loggerLine += `\nconsole.log(${loggerType.var})`
    return loggerLine
}

loggerNoteJudge.withFunction = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    let consoleStr = ''
    for (let i = 0; i < loggerType.var.length; i++) {
        consoleStr += `'${loggerType.var[i]}:', ${loggerType.var[i]}`
        if (i !== loggerType.var.length - 1) {
            consoleStr += ', '
        }
    }
    loggerLine += `\nconsole.log(${consoleStr})`
    return loggerLine
}

loggerNoteJudge.withFunctionCall = function (loggerType, options) {
    let loggerLine = ''
    let resultName = 'result_' + Math.floor(Math.random() * 100000000)
    loggerLine += `const ${resultName} = ${loggerType.input}`
    loggerLine += `\nconsole.log(${resultName})`
    return loggerLine
}

module.exports = loggerNoteJudge
