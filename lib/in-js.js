// Vue-pretty-logger-loader
const loaderUtils = require('loader-utils')
const compiler = require('vue-template-compiler')
const loggerParser = require('./utils/logger-parser')
const defaultOptions = require('./constant/options')

module.exports = function (source, map) {
    const loaderContext = this
    loaderContext.cacheable && loaderContext.cacheable()

    const {
        resourcePath
    } = loaderContext
    
    const isJsFile = /\.js$/.test(resourcePath)

    // default options
    const options = Object.assign(
        defaultOptions,
        loaderUtils.getOptions(this)
    )

    // script has logger note ?
    let isScriptHasLoggerLine = false

    // get scripts
    let scripts = ''
    if (isJsFile) {
        scripts = source
    } else {
        return source
    }

    let scriptArray = scripts.split(/\r?\n/)
    // parse logger
    scriptArray = scriptArray.map(scriptLine => {
        if (loggerParser.isLoggerLine(scriptLine, options)) {
            // is logger line
            isScriptHasLoggerLine = true
            return loggerParser.parseLogger(scriptLine, options)
        } else {
            return scriptLine
        }
    })

    // do replace
    if (isScriptHasLoggerLine && scriptArray.length > 0) {
        source = scriptArray.join('\n')
    }
    
    return source
}
