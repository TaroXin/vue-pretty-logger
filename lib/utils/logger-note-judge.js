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

module.exports = loggerNoteJudge
