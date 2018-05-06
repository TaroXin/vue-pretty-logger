// Vue-pretty-logger-loader

const loaderUtils = require('loader-utils')
const compiler = require('vue-template-compiler')
const loggerParser = require('./utils/logger-parser')

const defaultOptions = {
    tag: '',
    dev: true,
    hook: '#',
    tagStyle: '',

    infoTag: 'INFO',
    infoTagStyle: 'color: #3838AD; font-weight: bold;',
    infoContentStyle: 'color: #333333, font-weight: bold;',

    warnTag: 'WARN',
    warnTagStyle: 'color: #DA9D32; font-weight: bold;',
    warnContentStyle: 'color: #333333, font-weight: bold;',

    debugTag: 'DEBUG',
    debugTagStyle: 'color: #22D015; font-weight: bold;',
    debugContentStyle: 'color: #333333, font-weight: bold;',

    errorTag: 'ERROR',
    errorTagStyle: 'color: #CD2931; font-weight: bold;',
    errorContentStyle: 'color: #333333, font-weight: bold;',

}

module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    // default options
    const options = Object.assign(
        defaultOptions,
        loaderUtils.getOptions(this)
    )

    // script has logger note ?
    let isScriptHasLoggerLine = false

    // get scripts
    const templateCompileContent = compiler.parseComponent(source, { pad: 'line' })
    const scripts = templateCompileContent.script.content
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
