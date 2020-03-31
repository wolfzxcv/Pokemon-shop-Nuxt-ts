/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import admin from './admin'
import alert from './alert'
import auth from './auth'
import cart from './cart'
import loading from './loading'
import pagination from './pagination'
import product from './product'

let adminModule: admin
let alertModule: alert
let authModule: auth
let cartModule: cart
let loadingModule: loading
let paginationModule: pagination
let productModule: product

const initializer = (store: Store<any>) => {
  adminModule = getModule(admin, store)
  alertModule = getModule(alert, store)
  authModule = getModule(auth, store)
  cartModule = getModule(cart, store)
  loadingModule = getModule(loading, store)
  paginationModule = getModule(pagination, store)
  productModule = getModule(product, store)
}
export const plugins = [initializer]

export {
  initializer,
  adminModule,
  alertModule,
  authModule,
  cartModule,
  loadingModule,
  paginationModule,
  productModule
}
