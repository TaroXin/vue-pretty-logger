# vue-pretty-logger

[![Scrutinizer Build](https://img.shields.io/npm/v/vue-pretty-logger.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-pretty-logger) [![Scrutinizer Build](https://img.shields.io/scrutinizer/build/g/filp/whoops.svg?style=for-the-badge)](https://travis-ci.org/TaroXin/vue-pretty-logger) [![npm](https://img.shields.io/npm/l/express.svg?style=for-the-badge)
](https://opensource.org/licenses/mit-license.php)


[README for Chinese](https://juejin.im/post/5aef271c51882506a36c69a7)
### Table of content

* [Introduce](#introduce)
* [Install](#install)
* [Usage](#usage)
* [Example](#example)
* [Options](#options)
* [Commands](#commands)
* [Change Log](#changeLog)

<span id="introduce"></span>
### What is Vue pretty logger loader ?
`vue-pretty-logger` is a loader for webpack, you can use it  in your .vue file

``` vue
<template>
  <div>This is Test Message</div>
</template>

<script>
  export default {
    mounted () {
      let a = 123 // {#}

      let str = 'Test' // {#}
    }
  }
</script>
```

### You don't know what to do?

``` javascript
/**
 * // {#} is hook
 * So the result is the console prints 123.
 * Did you feel cool?
 */
let a = 123 // {#}
```

<span id="install"></span>
### Install

``` javascript
npm install vue-pretty-logger -D
// or
yarn add --dev vue-pretty-logger
```
 **in your webpack config file** 
> **NOTE:** `vue-pretty-logger` must be executed prior to `vue-loader`, Putting it at the bottom of the list of loaders is the best choice
``` javascript
...
module: {
  rules: [
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader'
        },
        {
          loader: 'vue-pretty-logger',
          options: {
            ...
          }
        }
      ]
    }
  ]
}
...
```

<span id="usage"></span>
### Usage

**in your vue file**
``` vue
<template>
  <div>Cool console</div>
</template>

<script>
  export default {
    mounted () {
      let a = 123 // {#}
      // equals: console.log(a)

      a = 456 // {#}
      // equals: console.log(a)
    
      this.testFunc1()

      this.testFunc2('test') // {#}
      /**
        * equals:
        * const result = this.testFunc2('test')
        * console.log(result)
        */
    },

    methods: {
      testFunc1 (a, b) { // {#}
        // equals: console.log(a, b)
      },

      testFunc2 (a) {
        return a
      }
    }
  }
</script>
```

<span id="example"></span>
### Example
Example can be found in `example/`

<span id="options"></span>
### Options

* **tag**
`Globally specified log display tag`
`default: ''`
* **hook**
`Globally specified log Hook`
`default: '#'`
* **infoTag**
`Globally specified log info tag`
`default: 'INFO'`
* **infoTagStyle**
`Globally specified log info tag style`
`default: ''`
* **error, debug, warn are the same as info**
 
<span id="commands"></span>
### Commands

* **-e**
`Output as error`
* **-d**
`Output as debug`
* **-w**
`Output as warn`
* **-i**
`Output as info`
* **-t**
`Specify local log comment tag`
* **-sign**
`The variable name corresponding to the output value when outputting the value`
* **-count**
`Number of times the output function was called`
`Only valid at function declaration`
* **-time**
`Output function execution time-consunming`
`Only valid at function call`
* **-profile**
`Create a profile for your function`
`Only valid at function call`
* **-stop**
`Stop default actions`

<span id="changeLog"></span>
### Change Log
* `V0.9.0` [issues](https://github.com/TaroXin/vue-pretty-logger/issues/8)
``` javascript
// add support for js files

{
    test: /\.js$/,
    use: ['babel-loader', 'vue-pretty-logger/lib/in-js'],
    exclude: /node_modules/
}
```

* `V0.8.8` [issues](https://github.com/TaroXin/vue-pretty-logger/issues/5)
``` javascript
// add the -form command

this.testFuncCall(p1, p2) // {#} -sign -from

// equals:
console.log(`p1: ${p1}, p2: ${p2}`)
const result = this.testFuncCall(p1, p2)
console.log(`result: ${result}`)
```

* `V0.8.7` [issues](https://github.com/TaroXin/vue-pretty-logger/issues/3)
``` javascript
// Add support for await statements, consistent with function call

await test() // {#} -e -sign -time
// equals: const result = await test(); console.error(`result: ${result}`)
```

* `V0.8.6` [issues](https://github.com/TaroXin/vue-pretty-logger/issues/2)
``` javascript
// Support callback function use, output callback function parameters.

this.$bus.$on('gotData', (data) => { // {#} -i -sign
    // equals: console.info(`data: ${data}`)
})

this.$bus.$on('gotData', function (data) { // {#} -i -sign
    // equals: console.info(`data: ${data}`)
})

```

* `V0.8.5` [issues](https://github.com/TaroXin/vue-pretty-logger/issues/1)
```
fix bug: Can not read property 'content' of null
```

