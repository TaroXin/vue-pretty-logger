// logger-note-judge
const loggerNoteJudge = {
    tagCommand: '-t',
    signCommand: '-sign',
    countCommand: '-count',
    timeCommand: '-time',
    profileCommand: '-profile',
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
        consoleLine += `console.${currentLevel.value}('%c[${options[levelTag]}][${localTag}]', '${options[levelTagStyle]}', `
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


loggerNoteJudge.hasSignCommand = function (logger, options) {
    logger = logger.substring(`// {${options.hook}}`.length, logger.length).trim()
    let loggerCommands = logger.split(/\s+/)
    return loggerCommands.indexOf(loggerNoteJudge.signCommand) > -1
}

loggerNoteJudge.withAssignment = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    
    let consoleStrArr = []
    let hasSignCommand = loggerNoteJudge.hasSignCommand(loggerType.logger, options)
    if (hasSignCommand) {
        consoleStrArr.push(`'${loggerType.var}: '`)
    }
    consoleStrArr.push(loggerType.var)

    let generateNote = loggerNoteJudge.generateNote(loggerType.logger, options, consoleStrArr)
    loggerLine += '\n' + generateNote
    return loggerLine
}

loggerNoteJudge.withFunction = function (loggerType, options) {
    let loggerLine = ''
    loggerLine += loggerType.input
    let consoleStrArr = []
    let hasSignCommand = loggerNoteJudge.hasSignCommand(loggerType.logger, options)

    for (let i = 0; i < loggerType.var.length; i++) {
        if (hasSignCommand) {
            consoleStrArr.push(`'${loggerType.var[i]}: '`)
        }
        consoleStrArr.push(`${loggerType.var[i]}`)
    }
    
    if (loggerType.var.length > 0) {
        loggerLine += `\n` + loggerNoteJudge.generateNote(loggerType.logger, options, consoleStrArr)
    }

    // check -count
    let logger = loggerType.logger.substring(`// {${options.hook}}`.length, loggerType.logger.length).trim()
    let loggerCommands = logger.split(/\s+/)
    if (loggerCommands.indexOf(loggerNoteJudge.countCommand) > -1) {
        // has -count
        loggerLine += `\nconsole.count('${loggerType.functionName}')`
    }

    return loggerLine
}

loggerNoteJudge.withFunctionCall = function (loggerType, options) {
    let loggerLine = ''

    // check -time -profile
    let logger = loggerType.logger.substring(`// {${options.hook}}`.length, loggerType.logger.length).trim()
    let loggerCommands = logger.split(/\s+/)
    let hasTimeCommand = false
    let hasProfileCommand = false
    if (loggerCommands.indexOf(loggerNoteJudge.timeCommand) > -1) {
        hasTimeCommand = true
    }

    if (loggerCommands.indexOf(loggerNoteJudge.profileCommand) > -1) {
        hasProfileCommand = true
    }

    if (hasProfileCommand) {
        loggerLine += `console.profile('${loggerType.functionName}')`
    }

    if (hasTimeCommand) {
        loggerLine += `\nconsole.time('${loggerType.functionName}')`
    }

    let resultName = 'result_' + Math.floor(Math.random() * 100000000)
    loggerLine += `\nconst ${resultName} = ${loggerType.input}`

    if (hasTimeCommand) {
        loggerLine += `\nconsole.timeEnd('${loggerType.functionName}')`
    }

    if (hasProfileCommand) {
        loggerLine += `\nconsole.profileEnd('${loggerType.functionName}')`
    }


    let consoleStrArr = []
    if (loggerNoteJudge.hasSignCommand(loggerType.logger, options)) {
        consoleStrArr.push(`'result: '`)
    }
    consoleStrArr.push(resultName)
    loggerLine += `\n` + loggerNoteJudge.generateNote(loggerType.logger, options, consoleStrArr)
    return loggerLine
}

module.exports = loggerNoteJudge
