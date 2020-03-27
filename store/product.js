import axios from 'axios'

export const state = () => ({
  product: [],
  products: [],
  categories: []
})
export const mutations = {
  async setProducts(state) {
    this.commit('loading/setLoading', true)
    const res = await axios.get(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products/all`
    )
    console.log('product/setProducts', res.data)

    state.products = res.data.products
    // make categories
    const newCategories = new Set()
    res.data.products.forEach(i => newCategories.add(i.category))
    state.categories = Array.from(newCategories)
    console.log('categories', state.categories)
    this.commit('loading/setLoading', false)
  },
  async setProduct(state, routeId) {
    this.commit('loading/setLoading', true)
    if (routeId.length > 15) {
      const res = await axios.get(
        `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/product/${routeId}`
      )
      console.log('product/setProduct', res.data.product)
      state.product = res.data.product
      state.product.num = 1
    } else {
      this.$router.push(`/product`)
    }
    this.commit('loading/setLoading', false)
  }
}
