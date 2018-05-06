# vue-pretty-logger

[![Build Status](https://travis-ci.org/TaroXin/vue-pretty-logger.svg?branch=master)](https://travis-ci.org/TaroXin/vue-pretty-logger)

### Table of content

* [Introduce](#introduce)
* [Install](#install)
* [Usage](#usage)
* [Options](#options)
* [Commands](#commands)

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

<span id="options"></span>
### Options
| name | effect | default |note |
| - | :- | :-: | -: | 
| tag | Globally specified log display tag  |  |  |
| hook | Globally specified log Hook  | # |  |
| infoTag | Globally specified log info tag  | INFO |  |
| infoTagStyle | Globally specified log info tag style  |  |  |
| warnTag | Globally specified log warn tag  | WARN |  |
| warnTagStyle | Globally specified log warn tag style  |  |  |
| debugTag | Globally specified log debug tag  | DEBUG |  |
| debugTagStyle | Globally specified log debug tag style  |  |  |
| errorTag | Globally specified log error tag  | ERROR |  |
| errorTagStyle | Globally specified log error tag style  |  |  |


<span id="commands"></span>
### Commands

| name | effect | note |
| - | :- | - |
| -e | Output as error |  |
| -d | Output as debug |  |
| -w | Output as warn |  |
| -i | Output as info |  |
| -t | Specify local log comment tag |  |
| -sign | The variable name corresponding to the output value when outputting the value |  |
| -count | Number of times the output function was called | Only valid at function declaration |
| -time | Output function execution time-consunming | Only valid at function call |
| -profile | Create a profile for your function | Only valid at function call |
| -stop | Stop default actions | |



