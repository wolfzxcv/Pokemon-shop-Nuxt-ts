<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openProductModal(true)">
        Add New Product
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">Category</th>
          <th>Name</th>
          <th width="100" class="text-right">Was</th>
          <th width="100" class="text-right">Price</th>
          <th width="100">Enabled</th>
          <th width="80">Edit</th>
          <th width="80">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">
            {{ product.origin_price | currency }}
          </td>
          <td class="text-right">{{ product.price | currency }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">
              enabled
            </span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openProductModal(false, product)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteProductModal(product)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="adminGetProducts" />

    <ProductModal :product="localProduct" />

    <DeleteProductModal />
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import { Component, Vue } from 'nuxt-property-decorator'
import { IProduct } from 'models/product'
import {
  adminModule,
  loadingModule,
  paginationModule
} from '../../../store'
import Pagination from '../../../components/common/Pagination/index.vue'
import ProductModal from '../../../components/admin/product/ProductModal/index.vue'
import DeleteProductModal from '../../../components/admin/product/DeleteProductModal/index.vue'

@Component({
  components: {
    Pagination,
    ProductModal,
    DeleteProductModal
  },
  layout: 'admin',
  middleware: ['Auth'],
  meta: {
    requireAuth: true
  }
})
export default class AdminProduct extends Vue {
  get isLoading() {
    return loadingModule.isLoading
  }

  get products() {
    return adminModule.adminProducts
  }

  get pagination() {
    return paginationModule.pagination
  }

  created() {
    adminModule.adminGetProducts()
  }

  adminGetProducts(newPage: number) {
    adminModule.adminGetProducts(newPage)
  }

  localProduct: IProduct = {
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

  openProductModal(isNewProduct: boolean, item: IProduct) {
    if (isNewProduct) {
      const newTempProduct: IProduct = {
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
      this.localProduct = newTempProduct
    } else {
      this.localProduct = { ...item }
    }
    ;($('#dashProductModal') as any).modal('show')
  }

  openDeleteProductModal(item: IProduct) {
    ;($('#delProductModal') as any).modal('show')
    adminModule.setTempProduct(item)
  }
}
</script>
