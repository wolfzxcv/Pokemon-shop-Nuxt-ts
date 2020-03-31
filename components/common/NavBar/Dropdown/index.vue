<template>
  <div class="dropdown ml-auto">
    <button
      class="btn btn-sm btn-cart"
      data-toggle="dropdown"
      data-flip="false"
    >
      <i
        class="fas fa-shopping-cart text-dark fa-2x"
        aria-hidden="true"
      ></i>
      <span class="badge badge-pill badge-danger">
        {{ cart.carts.length }}
      </span>
      <span class="sr-only">unread messages</span>
    </button>
    <div
      class="dropdown-menu dropdown-menu-right p-3"
      style="min-width: 300px"
      data-offset="400"
    >
      <h6 v-if="cart.total !== 0">shopping list</h6>
      <h6 v-else>Cart is empty</h6>
      <table class="table table-sm">
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle text-center">
              <a
                href="#"
                class="text-muted"
                @click.prevent="removeCartItem(item.id)"
              >
                <i class="fa fa-trash-alt" aria-hidden="true"></i>
              </a>
            </td>
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">
              {{ item.qty }}{{ item.product.unit }}
            </td>
            <td class="align-middle text-right">{{ item.total }}</td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="cart.total !== 0"
        class="btn btn-primary btn-block"
        @click="toCartPage"
      >
        <i class="fa fa-cart-plus" aria-hidden="true"></i>
        Proceed to payment
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { cartModule } from '~/store'

@Component
export default class Dropdown extends Vue {
  get cart() {
    return cartModule.cart
  }

  mounted() {
    cartModule.getCart()
  }

  removeCartItem(id: string) {
    cartModule.removeCartItem(id)
  }

  toCartPage() {
    this.$router.push('/cart')
  }
}
</script>
