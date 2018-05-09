import Vue from 'vue'
import Foo from './source.vue'
import Example from './example.js'

Example('I\' a test str')

new Vue({
    el: '#app',
    render: h => h(Foo)
})