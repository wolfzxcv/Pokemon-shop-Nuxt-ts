import axios from 'axios'

export const state = () => ({
  cart: {
    carts: []
  },
  order: {
    user: {}
  }
})

export const mutations = {
  async getCart(state) {
    this.commit('loading/setLoading', true)
    const res = await axios.get(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`
    )
    this.commit('loading/setLoading', false)
    console.log('cart/getCart', res.data.data)
    state.cart = res.data.data
  },
  async removeCartItem(state, id) {
    const res = await axios.delete(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
    )
    const msg = res.data.message
    this.commit('cart/getCart')
    console.log('cart/removeCartItem', res.data)
    this.commit('alert/setMessage', {
      message: msg,
      status: 'danger'
    })
  },
  async addToCart(state, { id, qty = 1 }) {
    const cart = {
      product_id: id,
      qty
    }
    const res = await axios.post(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/cart`,
      { data: cart }
    )
    const msg = res.data.message
    console.log('cart/addToCart', res.data)
    this.commit('alert/setMessage', { message: msg })
    this.commit('cart/getCart')
  },
  async addCouponCode(state, couponCode) {
    const coupon = {
      code: couponCode
    }
    const res = await axios.post(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/coupon`,
      { data: coupon }
    )
    const msg = res.data.message
    console.log('cart/addCouponCode', res.data)
    this.commit('alert/setMessage', { message: msg })
    this.commit('cart/getCart')
  },
  async placeOrder(state, formInfo) {
    this.commit('loading/setLoading', true)
    const res = await axios.post(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order`,
      { data: formInfo }
    )
    const msg = res.data.message
    console.log('cart/placeOrder', res.data)
    if (res.data.success) {
      this.$router.push(`/checkout/${res.data.orderId}`)
      this.commit('alert/setMessage', { message: msg })
      this.commit('loading/setLoading', false)
    } else {
      this.commit('alert/setMessage', {
        message: msg,
        status: 'danger'
      })
      console.log('lacking some guest info')
    }
  },
  async getCheckoutInfo(state, routeId) {
    this.commit('loading/setLoading', true)
    if (routeId.length > 15) {
      const res = await axios.get(
        `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/order/${routeId}`
      )
      console.log('cart/getCheckoutInfo', routeId)
      state.order = res.data.order
    } else {
      this.$router.push(`/`)
    }
    this.commit('loading/setLoading', false)
  },
  async payOrder(state, routeId) {
    const res = await axios.post(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/pay/${routeId}`
    )
    const msg = res.data.message
    this.commit('cart/getCheckoutInfo')
    console.log('cart/payOrder', res.data)
    this.commit('alert/setMessage', { message: msg })
  }
}
