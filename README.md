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
 * So the result is the console print 123.
 * Did you feel cool?
 */
let a = 123 // {#}
```


