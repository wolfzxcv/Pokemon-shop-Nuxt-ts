<template>
  <div>
    <div class="modal-header bg-info text-white">
      <h5 id="exampleModalLabel" class="modal-title">
        {{ product.title }}
      </h5>
    </div>
    <div class="modal-body">
      <img
        :src="product.imageUrl"
        class="img-fluid mx-auto d-block"
        alt
      />
      <blockquote class="blockquote mt-3">
        <p class="mb-0">{{ product.content }}</p>
        <footer class="blockquote-footer text-right">
          {{ product.description }}
        </footer>
      </blockquote>
      <div
        class="d-flex justify-content-between align-items-baseline"
      >
        <div v-if="!product.price" class="h4">
          {{ product.origin_price }} 元
        </div>
        <del v-if="product.price" class="h6">
          原價 {{ product.origin_price }} 元
        </del>
        <div v-if="product.price" class="h4">
          現在只要 {{ product.price }} 元
        </div>
      </div>
      <select v-model="product.num" name class="form-control mt-3">
        <option v-for="num in 10" :key="num" :value="num">
          選購 {{ num }} {{ product.unit }}
        </option>
      </select>
    </div>
    <div class="modal-footer">
      <div class="text-muted text-nowrap mr-3">
        小計
        <strong>{{ product.num * product.price }}</strong>
        元
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="addToCart(product.id, product.num)"
      >
        加到購物車
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  computed: {
    product() {
      return this.$store.state.product.product
    }
  },
  created() {
    this.$store.commit('product/setProduct', this.$route.params.id)
  },
  methods: {
    addToCart(id, qty = 1) {
      this.$store.commit('cart/addToCart', { id, qty })
    }
  }
}
</script>
