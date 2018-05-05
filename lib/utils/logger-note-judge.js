// logger-note-judge
const loggerNoteJudge = {
    tagCommand: '-t',
    loggerLevels: [
        {
            name: '-e',
            value: 'error'
        },
        {
            name: '-d',
            value: 'debug'
        },
        {
            name: '-w',
            value: 'warn'
        },
        {
            name: '-i',
            value: 'info'
        },
    ]
}

loggerNoteJudge.generateNote = function(logger, options, ...consoleStrArr) {
    // logger => // {#} -d
    logger = logger.substring(`// {${options.hook}}`.length, logger.length).trim()
    let loggerCommands = logger.split(/\s+/)
    let consoleLine = ''
    
    // check -t
    let localTag = options.tag
    let tagIndex = loggerCommands.findIndex(comm => comm === loggerNoteJudge.tagCommand)
    if (tagIndex > -1) {
        localTag = loggerCommands[tagIndex + 1]
    }

    // find logger levels
    let currentLevel = loggerNoteJudge.loggerLevels.find(level => {
        for (let i = 0; i < loggerCommands.length; i++) {
            if (loggerCommands[i] === level.name) {
                // get
                return true
            }
        }
        return false
    })

    if (currentLevel) {
        let levelTag = `${currentLevel.value}Tag`
        let levelTagStyle = `${currentLevel.value}TagStyle`
        consoleLine += `console.log('%c[${options[levelTag]}][${localTag}]', '${options[levelTagStyle]}', `
        for (let i = 0; i < consoleStrArr.length; i++) {
            consoleLine += `${consoleStrArr[i]}`

            if (i !== consoleStrArr.length - 1) {
                consoleLine += ', '
            }
        }
        consoleLine += `)`
    } else {
        consoleLine += `console.log(`
        for (let i = 0; i < consoleStrArr.length; i++) {
            consoleLine += `${consoleStrArr[i]}`
            if (i !== consoleStrArr.length - 1) {
                consoleLine += ', '
            }
        }
        consoleLine += `)`
    }

    return consoleLine
}

loggerNoteJudge.withAssignment = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    
    let generateNote = loggerNoteJudge.generateNote(loggerType.logger, options,  loggerType.var)
    loggerLine += '\n' + generateNote
    return loggerLine
}

loggerNoteJudge.withFunction = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    let consoleStrArr = []
    for (let i = 0; i < loggerType.var.length; i++) {
        // consoleStrArr.push(`'${loggerType.var[i]}: '`)
        consoleStrArr.push(`${loggerType.var[i]}`)
    }
    loggerLine += `\n` + loggerNoteJudge.generateNote(loggerType.logger, options, consoleStrArr)
    return loggerLine
}

loggerNoteJudge.withFunctionCall = function (loggerType, options) {
    let loggerLine = ''
    let resultName = 'result_' + Math.floor(Math.random() * 100000000)
    loggerLine += `const ${resultName} = ${loggerType.input}`
    loggerLine += `\n` + loggerNoteJudge.generateNote(loggerType.logger, options, resultName)
    return loggerLine
}

module.exports = loggerNoteJudge
