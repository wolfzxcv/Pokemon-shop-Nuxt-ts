<template>
  <div class="input-group mb-3 input-group-sm">
    <input
      v-model="coupon_code"
      type="text"
      class="form-control"
      placeholder="Please enter coupon code"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="addCouponCode(coupon_code)"
      >
        Validate
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponForm',
  data() {
    return {
      coupon_code: ''
    }
  },
  methods: {
    addCouponCode(couponCode) {
      this.$store.commit('cart/addCouponCode', couponCode)
    }
  }
}
</script>
