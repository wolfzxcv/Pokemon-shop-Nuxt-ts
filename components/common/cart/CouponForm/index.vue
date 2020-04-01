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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { cartModule } from '../../../../store'

@Component
export default class CouponForm extends Vue {
  coupon_code: string = ''

  addCouponCode(couponCode: string) {
    cartModule.addCouponCode(couponCode)
  }
}
</script>
