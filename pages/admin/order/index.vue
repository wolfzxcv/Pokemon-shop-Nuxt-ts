<template>
  <div>
    <loading :active.sync="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Date</th>
          <th>id</th>
          <th>email</th>
          <th>summary</th>
          <th>Price</th>
          <th>Payment status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in orders" :key="x.id">
          <td>
            {{
              new Date(x.create_at * 1000).toLocaleDateString('en-GB')
            }}
          </td>
          <td>{{ x.id }}</td>
          <td>{{ x.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in x.products" :key="i">
                {{ product.product.title }} {{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ x.total | currency }}</td>
          <td>
            <span v-if="x.is_paid" class="text-success">Paid</span>
            <span v-else>haven't paid</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getOrders" />
  </div>
</template>

<script>
import Pagination from '~/components/common/Pagination'
export default {
  name: 'AdminOrder',
  middleware: 'Auth',
  meta: {
    requiresAuth: true
  },
  layout: 'admin',
  components: { Pagination },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    orders() {
      return this.$store.state.admin.adminOrders
    },
    pagination() {
      return this.$store.state.pagination.pagination
    }
  },
  created() {
    this.$store.commit('admin/getOrders')
  },
  methods: {
    getOrders(newPage) {
      this.$store.commit('admin/getOrders', newPage)
    }
  }
}
</script>
