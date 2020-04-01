<template>
  <div class="cart-content">
    <loading :active.sync="isLoading" />

    <!--Cart's detail-->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">Delete</th>
          <th>Product</th>
          <th width="100">Amount</th>
          <th width="100" class="text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in cart.carts" :key="x.id">
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(x.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
          <td>
            {{ x.product.title }}
            <div v-if="x.coupon" class="text-success">
              with coupon
            </div>
          </td>
          <td>{{ x.qty }}</td>
          <td class="text-right">{{ x.total | currency }}</td>
        </tr>
        <tr v-if="cart.total == 0">
          <td></td>
          <td class="text-center">Oops! The cart is empty!!</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">Total</td>
          <td class="text-right">{{ cart.total | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td colspan="3" class="text-right text-success">
            Special price
          </td>
          <td class="text-right text-success">
            {{ cart.final_total | currency }}
          </td>
        </tr>
      </tfoot>
    </table>

    <!--Coupon code input form-->
    <CouponForm />
    <!--Recipient's information-->
    <RecipientInfo v-if="cart.total !== 0" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { cartModule, loadingModule } from '../../store'
import CouponForm from '../../components/common/cart/CouponForm/index.vue'
import RecipientInfo from '../../components/common/cart/RecipientInfo/index.vue'

@Component({
  components: {
    CouponForm,
    RecipientInfo
  }
})
export default class Cart extends Vue {
  get isLoading() {
    return loadingModule.isLoading
  }

  get cart() {
    return cartModule.cart
  }

  created() {
    cartModule.getCart()
  }

  removeCartItem(id: string) {
    cartModule.removeCartItem(id)
  }

  addCouponCode(couponCode: string) {
    cartModule.addCouponCode(couponCode)
  }
}
</script>

<style lang="scss" scoped>
.cart-content {
  margin: 0 auto;
  width: 50vw;
}
</style>
