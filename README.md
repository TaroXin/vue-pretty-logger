# vue-pretty-logger

> **NOTE:** This is a loader of .vue file

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

