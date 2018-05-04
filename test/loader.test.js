const vuePrettyLoggerLoader = require('../lib')

let source = `
    <template>
        <div>This is Test</div>
    </template>
    <script>
        export default {
            mounted () {
                let a = 1 
            }
        }
    </script>
`
test('test normal vue file', () => {
    expect(vuePrettyLoggerLoader(source)).toBe(source)
})

