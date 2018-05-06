<template>
    <div class="test">
        Cool logger for Vue !!!
    </div>
</template>

<script>
    export default {
        mounted () {
            /**
             * test assignment
             */
            let a = 123 // {#} -sign

            let b
            b = 456 // {#} -i -t TEST -sign

            /**
             * test function declaration
             */
            this.testFunc1("This is testFunc1")
            this.testFunc2("This is testFunc2", {
                name: 'Yangxin',
                age: '15'
            })

            /**
             * test function call
             */
            this.testFunc3() // {#} -w -sign
            
            // no support for the time being
            // this.testFunc4(1, { // {#}
            //     count: 1
            // }) 
            // recommend to use this like this
            this.testFunc4(1, {count: 1}) // {#}
        },

        methods: {
            testFunc1 (testStr) { // {#} -e
                // console.log(testStr)
            },
            testFunc2 (testSrt1, testObject2) { // {#} -w -sign -count
                // console.count('test')
            },

            testFunc3 () {
                return 'Hello, I\'m return!'
            },
            testFunc4 (num, data) {
                return num + data.count
            }
        }
    }
</script>
