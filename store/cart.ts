import axios from 'axios'
import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import { ICommonRes } from 'models/admin'
import {
  ICart,
  IOrder,
  addToCart,
  placeOrder,
  routeIdnRouter,
  getCartRes,
  addToCartRes,
  addCouponCodeRes,
  placeOrderRes,
  getCheckoutInfoRes
} from 'models/cart'

import { alertModule, loadingModule } from './index'

@Module({ name: 'cart', namespaced: true, stateFactory: true })
export default class Cart extends VuexModule {
  cart: ICart = { carts: [], total: 0, final_total: 0 }

  order: IOrder = {
    create_at: 0,
    id: '',
    is_paid: false,
    message: '',
    payment_method: '',
    products: [],
    total: 100,
    user: { address: '', email: '', name: '', tel: '' }
  }

  @Mutation
  setCart(cart: ICart) {
    this.cart = cart
  }

  @Mutation
  setOrder(order: IOrder) {
    this.order = order
  }

  @Action
  async getCart() {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`
    const res = await axios.get<getCartRes>(api)
    this.setCart(res.data.data)
    console.log('cart/getCart')
    loadingModule.setLoading(false)
    loadingModule.setLoadingItem('')
  }

  @Action
  async removeCartItem(id: string) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
    const res = await axios.delete<ICommonRes>(api)
    const msg = res.data.message
    alertModule.pushMessage({ message: msg, status: 'danger' })
    console.log('cart/removeCartItem')
    this.getCart()
  }

  @Action
  async addToCart({ id, qty = 1 }: addToCart) {
    loadingModule.setLoading(true)
    loadingModule.setLoadingItem(id)
    const cart = {
      product_id: id,
      qty
    }
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`
    const res = await axios.post<addToCartRes>(api, { data: cart })
    const msg = res.data.message
    alertModule.pushMessage({ message: msg })
    console.log('cart/addToCart')
    this.getCart()
  }

  @Action
  async addCouponCode(couponCode: string) {
    loadingModule.setLoading(true)
    const coupon = {
      code: couponCode
    }
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/coupon`
    const res = await axios.post<addCouponCodeRes>(api, {
      data: coupon
    })
    const msg = res.data.message
    if (res.data.success) {
      alertModule.pushMessage({ message: msg })
    } else {
      alertModule.pushMessage({ message: msg, status: 'danger' })
    }
    console.log('cart/addCouponCode')
    this.getCart()
  }

  @Action
  async placeOrder({ formInfo, useRouter }: placeOrder) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order`
    const res = await axios.post<placeOrderRes>(api, {
      data: formInfo
    })
    const msg = res.data.message
    if (res.data.success) {
      useRouter.push(`/checkout/${res.data.orderId}`)
      alertModule.pushMessage({ message: msg })
    } else {
      alertModule.pushMessage({ message: msg, status: 'danger' })
      console.log('lacking some guest info')
    }
    console.log('cart/placeOrder')
    loadingModule.setLoading(false)
  }

  @Action
  async getCheckoutInfo({ routeId, useRouter }: routeIdnRouter) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order/${routeId}`
    if (routeId.length > 15) {
      const res = await axios.get<getCheckoutInfoRes>(api)
      this.setOrder(res.data.order)
    } else {
      useRouter.push(`/`)
    }
    console.log('cart/getCheckoutInfo')
    loadingModule.setLoading(false)
  }

  @Action
  async payOrder({ routeId, useRouter }: routeIdnRouter) {
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/pay/${routeId}`
    const res = await axios.post<ICommonRes>(api)
    const msg = res.data.message
    this.getCheckoutInfo({ routeId, useRouter })
    alertModule.pushMessage({ message: msg })
    console.log('cart/payOrder')
  }
}
