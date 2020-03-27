<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">
              {{ item.qty }}/{{ item.product.unit }}
            </td>
            <td class="align-middle text-right">
              {{ Math.round(item.final_total) | currency }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Total</td>
            <td class="text-right">{{ order.total | currency }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="200">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>TEL</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>Payment status</th>
            <td>
              <span v-if="!order.is_paid">Haven't paid</span>
              <span v-else class="text-success">Paid</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="order.is_paid === false" class="text-right">
        <button class="btn btn-danger">Confirm payment</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  computed: {
    order() {
      return this.$store.state.cart.order
    }
  },
  created() {
    this.$store.commit('cart/getCheckoutInfo', this.$route.params.id)
  },
  methods: {
    payOrder() {
      this.$store.commit('cart/payOrder', this.$route.params.id)
    }
  }
}
</script>
