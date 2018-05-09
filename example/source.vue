<template>
    <div class="container">
        <header class="header">Vue-Pretty-Logger</header>
        <section class="section">
            The console is more cool to use, easier to debug, and more fun log output. Enjoy the vue-pretty-logger in the vue project.
        </section>
        <section class="section">
            npm install vue-pretty-logger -D
            <br><br>
            yarn add --dev vue-pretty-logger
        </section>
        <section class="section">
           Please press F12 !!!
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tes$tObj: {
                    test (str1, func2) {
                        func2(str1)
                    }
                }
            }
        },
        mounted () {
            // /**
            //  * test assignment
            //  */
            // let a = 123 // {#} -sign

            // let b
            // b = 456 // {#} -i -t TEST -sign

            // /**
            //  * test function declaration
            //  */
            // this.testFunc1("This is testFunc1")
            // this.testFunc2("This is testFunc2", {
            //     name: 'Yangxin',
            //     age: '15'
            // })

            // /**
            //  * test function call
            //  */
            // this.testFunc3() // {#} -w -sign
            
            // // no support for the time being
            // // this.testFunc4(1, { // {#}
            // //     count: 1
            // // }) 
            // // recommend to use this like this
            // this.testFunc4(1, {count: 1}) // {#}

            // this.testFunc5('with -time') // {LOG} -time -sign

            // this.testFunc6('with -profile') // {#} -stop -profile

            // let str1 = 'Hello World' // {#}



            // let str2 = 'Hello World' // {#} -e
            // let str3 = 'Hello World' // {#} -d
            // let str4 = 'Hello World' // {#} -w
            // let str5 = 'Hello World' // {#} -i

            // this.testFunc('Hello', 'World') // {#} -time -stop

            // this.tes$tObj.test('Return me!', (val) => { // {#} -e -sign

            // })
            // this.testLambda$().test((val) => { // {#} -e

            // }) 

            // this.testAsync()
            // this.testFunc("p1", "p2") 

            this.testForm("hello", "world") // {#} -from -sign
        },

        methods: {
            testForm (p1, p2) { // {#} -sign
                
            },
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
            },

            testFunc5 (command) {
                
            },
            
            testFunc6 (command) {

            },

            testFunc (p1, p2) { // {#} -i -t TestFunc -sign -count

            },

            testLambda$() {
                return {
                    test (func2) {
                        func2('Return Me!')
                    }
                }
            },

            async testAsync (p) { // {#} -sign
                async function test () { 
                    await test2() 
                }

                function test2 () {
                    return new Promise((resolve, reject) => {
                        resolve('I am return')
                    })
                }

                test().then((val) => {
                    console.log(val)
                })
            }
        }
    }
</script>


<style scoped>
    .container {
        width: 100%;
        height: 100%;
        background: #e9e9e9;
        font-family: 'Source Code Pro', 'Courier New', Courier, monospace 
    }
    .header {
        position: relative;
        height: 150px;
        text-align: center;
        top: 100px;
        font-size: 80px;
        font-weight: bold;
        color: #41B883;
        user-select: none;
        -webkit-user-select: none;
    }

    .section {
        position: relative;
        top: 60px;
        width: 700px;
        padding: 15px 25px;
        box-sizing: border-box;
        margin: 0 auto;
        background: #333;
        color: #FFF;
        margin-bottom: 15px;
    }
</style>
