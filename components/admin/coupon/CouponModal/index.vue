<template>
  <div
    id="dashCouponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>Coupon's detail</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">Coupon Name</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="Please enter coupon name"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="code">Coupon code</label>
                <input
                  id="code"
                  v-model="tempCoupon.code"
                  type="text"
                  class="form-control"
                  placeholder="Please enter coupon code"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="percentage">Percentage</label>
                <input
                  id="percentage"
                  v-model="tempCoupon.percent"
                  type="number"
                  class="form-control"
                  placeholder="Please enter percentage"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="timestamp">Expiration date</label>
              <input
                id="timestamp"
                v-model="tempCoupon.due_date"
                type="text"
                class="form-control"
                placeholder="Please enter an expiration date in timestamp formate"
              />
            </div>
            <hr />
            <div class="form-group">
              <div class="form-check">
                <input
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">
                  Enabled
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="updateCoupon(tempCoupon)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  computed: {
    tempCoupon() {
      return this.$store.state.admin.tempCoupon
    }
  },
  methods: {
    updateCoupon(tempCoupon) {
      this.$store.commit('admin/updateCoupon', tempCoupon)
      $('#dashCouponModal').modal('hide')
    }
  }
}
</script>
