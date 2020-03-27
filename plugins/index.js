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
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

Vue.component('loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.component('ValidationProvider', ValidationProvider)

axios.defaults.withCredentials = true
// 由於 Nuxt 在打包的時候會將放在 plugins 一起打包進去 server，那麼就會導致某些外掛是不能正常運作(因為要取得 window)
// 要解決這個方式就是要讓 Nuxt 在打包的時候，不要將套件打包進去 server，那麼解決方式很簡單只需要以下語法就可以解決了
if (process.client) {
  require('./bootstrap')
}
