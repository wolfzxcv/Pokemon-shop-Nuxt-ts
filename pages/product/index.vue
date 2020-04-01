<template>
  <div>
    <div class="row mt-4 outer">
      <div
        v-for="item in products"
        :key="item.id"
        class="col-md-4 mb-4"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 180px; background-size: 25%  ; background-position: center; background-repeat: no-repeat "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">
              {{ item.category }}
            </span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div
              class="d-flex justify-content-between align-items-baseline"
            >
              <del class="h6">
                WAS {{ item.origin_price | currency }}
              </del>
              <div class="h5">NOW {{ item.price | currency }}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="goToProduct(item.id)"
            >
              Read more
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                v-if="loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              ></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IProduct } from 'models/product'
import { cartModule, loadingModule, productModule } from '../../store'

@Component
export default class Product extends Vue {
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

  get loadingItem() {
    return loadingModule.loadingItem
  }

  get isLoading() {
    return loadingModule.isLoading
  }

  get products() {
    return productModule.products
  }

  created() {
    productModule.getProducts()
  }

  goToProduct(id: string) {
    this.$router.push(`/product/${id}`)
  }

  addToCart(id: string, qty: number = 1) {
    cartModule.addToCart({ id, qty })
  }
}
</script>

<style lang="scss" scoped>
.outer {
  margin: 30px;
}
</style>
