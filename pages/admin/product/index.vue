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
        <tr v-for="x in products" :key="x.id">
          <td>{{ x.category }}</td>
          <td>{{ x.title }}</td>
          <td class="text-right">{{ x.origin_price | currency }}</td>
          <td class="text-right">{{ x.price | currency }}</td>
          <td>
            <span v-if="x.is_enabled" class="text-success">
              enabled
            </span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openProductModal(false, x)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteProductModal(x)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="adminGetProducts" />

    <ProductModal />

    <DeleteProductModal />
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '~/components/common/Pagination'
import ProductModal from '~/components/admin/product/ProductModal'
import DeleteProductModal from '~/components/admin/product/DeleteProductModal'

export default {
  name: 'AdminProduct',
  middleware: 'Auth',
  meta: {
    requiresAuth: true
  },
  layout: 'admin',
  components: {
    Pagination,
    ProductModal,
    DeleteProductModal
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    isNewProduct() {
      return this.$store.state.admin.isNewProduct
    },
    tempProduct() {
      return this.$store.state.admin.tempProduct
    },
    products() {
      return this.$store.state.admin.adminProducts
    },
    pagination() {
      return this.$store.state.pagination.pagination
    }
  },
  created() {
    this.$store.commit('admin/adminGetProducts')
  },
  methods: {
    adminGetProducts(newPage) {
      this.$store.commit('admin/adminGetProducts', newPage)
    },
    openProductModal(isNewProduct, item) {
      if (isNewProduct) {
        this.$store.state.admin.tempProduct = {}
        this.$store.state.admin.isNewProduct = true
      } else {
        this.$store.state.admin.tempProduct = Object.assign({}, item)
        this.$store.state.admin.isNewProduct = false
      }
      $('#dashProductModal').modal('show')
    },
    openDeleteProductModal(item) {
      $('#delProductModal').modal('show')
      this.$store.state.admin.tempProduct = Object.assign({}, item)
    }
  }
}
</script>
