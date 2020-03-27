import axios from 'axios'

export const state = () => ({
  isNewCoupon: false,
  tempCoupon: {},
  coupons: [],
  adminOrders: [],
  isNewProduct: false,
  tempProduct: {},
  adminProducts: [],
  status: {
    fileUploading: false
  }
})

export const mutations = {
  async getCoupons(state, page = 1) {
    this.commit('loading/setLoading', true)
    const res = await axios.get(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`
    )
    this.commit('loading/setLoading', false)
    console.log('admin/getCoupons', res.data)
    state.coupons = res.data.coupons
    this.state.pagination.pagination = res.data.success
      ? res.data.pagination
      : { has_pre: false }
  },
  async deleteCoupon(state, id) {
    this.commit('loading/setLoading', true)
    const res = await axios.delete(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${id}`
    )
    const msg = res.data.message
    console.log('admin/deleteCoupon', res.data)
    this.commit('alert/setMessage', { message: msg })
    this.commit('admin/getCoupons')
  },
  async updateCoupon(state, tempCoupon) {
    let httpMethod = 'post'
    let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`
    if (state.isNewCoupon === false) {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${tempCoupon.id}`
      httpMethod = 'put'
    }
    const res = await axios[httpMethod](api, {
      data: tempCoupon
    })
    console.log('admin/updateCoupon', res.data)
    const msg = res.data.message
    this.commit('admin/getCoupons')
    this.commit('alert/setMessage', { message: msg })
  },
  async getOrders(state, page = 1) {
    this.commit('loading/setLoading', true)
    const res = await axios.get(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`
    )
    this.commit('loading/setLoading', false)
    console.log('admin/getOrders', res.data)
    state.adminOrders = res.data.orders
    this.state.pagination.pagination = res.data.success
      ? res.data.pagination
      : { has_pre: false }
  },
  async getProducts(state, page = 1) {
    this.commit('loading/setLoading', true)
    const res = await axios.get(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products?page=${page}`
    )
    this.commit('loading/setLoading', false)
    console.log('admin/getProducts', res.data)
    state.adminProducts = res.data.products
    this.state.pagination.pagination = res.data.success
      ? res.data.pagination
      : { has_pre: false }
  },
  async deleteProduct(state, id) {
    this.commit('loading/setLoading', true)
    const res = await axios.delete(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${id}`
    )
    const msg = res.data.message
    console.log('admin/deleteProduct', res.data)
    this.commit('alert/setMessage', { message: msg })
    this.commit('admin/getProducts')
  },
  async updateProduct(state, tempProduct) {
    let httpMethod = 'post'
    let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product`
    if (state.isNewProduct === false) {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${tempProduct.id}`
      httpMethod = 'put'
    }
    const res = await axios[httpMethod](api, {
      data: tempProduct
    })
    console.log('admin/updateProduct', res.data)
    const msg = res.data.message
    this.commit('admin/getProducts')
    this.commit('alert/setMessage', { message: msg })
  },
  async uploadFile(state, uploadedFile) {
    const formData = new FormData()
    formData.append('file-to-upload', uploadedFile)
    state.status.fileUploading = true
    const url = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('admin/uploadFile', res.data)
    state.status.fileUploading = false

    if (res.data.success) {
      state.tempProduct.imageUrl = res.data.imageUrl
      this.commit('alert/setMessage', {
        message: 'Upload success'
      })
    } else {
      this.commit('alert/setMessage', {
        message: 'Upload failed',
        status: 'danger'
      })
    }
  }
}
