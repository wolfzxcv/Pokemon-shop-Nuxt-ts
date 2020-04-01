import Vue from 'vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { extend, ValidationProvider } from 'vee-validate'
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'
import currencyFilter from '../plugins/filters/currency'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

Vue.component('loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.component('ValidationProvider', ValidationProvider)

axios.defaults.withCredentials = true

if (process.client) {
  require('./bootstrap')
}
