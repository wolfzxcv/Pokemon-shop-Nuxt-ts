<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="row mt-4 outer">
      <div
        v-for="item in products"
        :key="item.id"
        class="col-md-4 mb-4"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: 25%  ; background-position: center; background-repeat: no-repeat "
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
              @click="getProduct(item.id)"
            >
              <i
                v-if="status.loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              ></i>
              Read more
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                v-if="status.loadingItem === item.id"
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

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {},
      status: {
        loadingItem: ''
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    products() {
      return this.$store.state.product.products
    }
  },
  created() {
    this.$store.commit('product/setProducts')
  },
  methods: {
    getProduct(id) {
      this.$router.push(`/product/${id}`)
    },
    addToCart(id, qty = 1) {
      this.status.loadingItem = id
      this.$store.commit('cart/addToCart', { id, qty })
      // loading effect bug
      this.status.loadingItem = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.outer {
  margin: 30px;
}
</style>
