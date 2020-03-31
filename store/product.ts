import axios from 'axios'
import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import {
  IProduct,
  getProduct,
  getProductsRes,
  getProductRes
} from 'models/product'

import { loadingModule } from './index'

@Module({ name: 'product', namespaced: true, stateFactory: true })
export default class Product extends VuexModule {
  product: IProduct = {
    category: '',
    content: '',
    description: '',
    id: '',
    imageUrl: '',
    is_enabled: 1,
    num: 1,
    origin_price: '',
    price: '',
    title: '',
    unit: ''
  }

  products: IProduct[] = []
  categories: string[] = []

  @Mutation
  setProduct(product: IProduct) {
    this.product = product
    this.product.num = 1
  }

  @Mutation
  setProducts(products: IProduct[]) {
    this.products = products
  }

  @Mutation
  setCategories(categories: string[]) {
    this.categories = categories
  }

  @Action
  async getProducts() {
    loadingModule.setLoading(true)
    const res = await axios.get<getProductsRes>(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/products/all`
    )
    console.log('product/getProducts', res.data)

    this.setProducts(res.data.products)

    const newCategories = new Set<string>()
    res.data.products.forEach(item => {
      newCategories.add(item.category)
    })
    this.setCategories(Array.from(newCategories))
    console.log('categories', this.categories)
    loadingModule.setLoading(false)
  }

  @Action
  async getProduct({ routeId, useRouter }: getProduct) {
    loadingModule.setLoading(true)
    if (routeId.length > 15) {
      const res = await axios.get<getProductRes>(
        `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/product/${routeId}`
      )
      console.log('product/getProduct', res.data.product)
      this.setProduct(res.data.product)
    } else {
      useRouter.push(`/product`)
    }
    loadingModule.setLoading(false)
  }
}
