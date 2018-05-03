// Vue-pretty-logger-loader

const loaderUtils = require('loader-utils')
const compiler = require('vue-template-compiler')
const loggerParser = require('./logger-parser')

const defaultOptions = {

}

module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    // default options
    const options = Object.assign(
        loaderUtils.getOptions(this) || {},
        defaultOptions
    )

    // script has logger note ?
    let isScriptHasLoggerLine = false

    // get scripts
    const templateCompileContent = compiler.parseComponent(source, { pad: 'line' })
    const scripts = templateCompileContent.script.content
    let scriptArray = scripts.split(/\r?\n/)
    // parse logger
    scriptArray = scriptArray.map(scriptLine => {
        if (loggerParser.isLoggerLine(scriptLine)) {
            // is loged line
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
