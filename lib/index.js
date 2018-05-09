// Vue-pretty-logger-loader
const loaderUtils = require('loader-utils')
const compiler = require('vue-template-compiler')
const loggerParser = require('./utils/logger-parser')
const defaultOptions = require('./constant/options')

module.exports = function (source, map) {
    loaderContext.cacheable && loaderContext.cacheable()

    // default options
    const options = Object.assign(
        defaultOptions,
        loaderUtils.getOptions(this)
    )

    // script has logger note ?
    let isScriptHasLoggerLine = false

    // get scripts
    const { script } = compiler.parseComponent(source, { pad: 'line' })
    if (script === null) {
        return source
    }

    const scripts = script.content

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
        source = source.replace(
            /<script[^>]*?>[\s\S]*?<\/script>/i,
            '<script>' + scriptArray.join('\n') + '</script>'
        )
    }
    
    return source
}
