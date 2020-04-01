import axios from 'axios'
import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import {
  ICoupon,
  IAdminOrders,
  ICommonRes,
  getCouponsRes,
  getOrdersRes,
  adminGetProductsRes,
  uploadFileRes
} from 'models/admin'
import { IProduct } from 'models/product'
import { alertModule, loadingModule, paginationModule } from './index'

@Module({ name: 'admin', namespaced: true, stateFactory: true })
export default class Admin extends VuexModule {
  isNewCoupon: boolean = false
  tempCoupon: ICoupon = {
    code: '',
    due_date: '',
    id: '',
    is_enabled: 0,
    percent: '',
    title: ''
  }

  coupons: ICoupon[] = []
  adminOrders: IAdminOrders[] = []
  isNewProduct: boolean = false
  tempProduct: IProduct = {
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

  adminProducts: IProduct[] = []
  fileIsUploading: boolean = false

  @Mutation
  setIsNewCoupon(isNewCoupon: boolean) {
    this.isNewCoupon = isNewCoupon
  }

  @Mutation
  setTempCoupon(item: ICoupon) {
    this.tempCoupon = item
  }

  @Mutation
  setIsNewProduct(isNewProduct: boolean) {
    this.isNewProduct = isNewProduct
  }

  @Mutation
  setTempProduct(item: IProduct) {
    this.tempProduct = item
  }

  @Mutation
  setCoupons(data: getCouponsRes) {
    this.coupons = data.coupons
    if (data.success) {
      paginationModule.setPagination(data.pagination)
    }
  }

  @Mutation
  setAdminOrders(data: getOrdersRes) {
    this.adminOrders = data.orders
    if (data.success) {
      paginationModule.setPagination(data.pagination)
    }
  }

  @Mutation
  setAdminProducts(data: adminGetProductsRes) {
    this.adminProducts = data.products
    if (data.success) {
      paginationModule.setPagination(data.pagination)
    }
  }

  @Mutation
  setImageUrl(url: string) {
    this.tempProduct.imageUrl = url
  }

  @Action
  async getCoupons(page: number = 1) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`
    const res = await axios.get<getCouponsRes>(api)
    this.setCoupons(res.data)
    console.log('admin/getCoupons')
    loadingModule.setLoading(false)
  }

  @Action
  async deleteCoupon(id: string) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${id}`
    const res = await axios.delete<ICommonRes>(api)
    const msg = res.data.message
    alertModule.pushMessage({ message: msg })
    console.log('admin/deleteCoupon')
    this.getCoupons()
  }

  @Action
  async updateCoupon(tempCoupon: ICoupon) {
    loadingModule.setLoading(true)
    let api
    let res
    if (this.isNewCoupon === false) {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${tempCoupon.id}`
      res = await axios.put<ICommonRes>(api, {
        data: tempCoupon
      })
    } else {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`
      res = await axios.post<ICommonRes>(api, {
        data: tempCoupon
      })
    }
    const msg = res.data.message
    alertModule.pushMessage({ message: msg })
    console.log('admin/updateCoupon', res.data)
    this.getCoupons()
  }

  @Action
  async getOrders(page = 1) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`
    const res = await axios.get<getOrdersRes>(api)
    this.setAdminOrders(res.data)
    console.log('admin/getOrders')
    loadingModule.setLoading(false)
  }

  @Action
  async adminGetProducts(page = 1) {
    loadingModule.setLoading(true)
    const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/products?page=${page}`
    const res = await axios.get<adminGetProductsRes>(api)
    console.log('admin/adminGetProducts')
    this.setAdminProducts(res.data)
    loadingModule.setLoading(false)
  }

  @Action
  async deleteProduct(id: string) {
    loadingModule.setLoading(true)
    const res = await axios.delete<ICommonRes>(
      `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${id}`
    )
    const msg = res.data.message
    alertModule.pushMessage({ message: msg })
    console.log('admin/deleteProduct')
    this.adminGetProducts()
  }

  @Action
  async updateProduct(tempProduct: IProduct) {
    loadingModule.setLoading(true)
    let api
    let res
    if (this.isNewProduct === false) {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${tempProduct.id}`
      res = await axios.put<ICommonRes>(api, {
        data: tempProduct
      })
    } else {
      api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/product`
      res = await axios.post<ICommonRes>(api, {
        data: tempProduct
      })
    }

    const msg = res.data.message
    alertModule.pushMessage({ message: msg })
    console.log('admin/updateProduct', res.data)
    this.adminGetProducts()
  }

  @Action
  async uploadFile(uploadedFile: File) {
    this.fileIsUploading = true
    const formData = new FormData()
    formData.append('file-to-upload', uploadedFile)
    const url = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`
    const res = await axios.post<uploadFileRes>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (res.data.success) {
      this.setImageUrl(res.data.imageUrl as string)
      alertModule.pushMessage({ message: 'Upload success' })
    } else {
      alertModule.pushMessage({
        message: 'Upload failed',
        status: 'danger'
      })
    }
    console.log('admin/uploadFile', res.data)
    this.fileIsUploading = false
  }
}
