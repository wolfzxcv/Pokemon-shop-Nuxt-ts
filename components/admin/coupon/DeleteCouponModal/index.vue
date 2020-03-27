<template>
  <div
    id="delCouponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>Delete Coupon</span>
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
          Are you sure you want to delete
          <strong class="text-danger">
            {{ tempCoupon.title }}
          </strong>
          ? (Can't recover after deleted)
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
            class="btn btn-danger"
            @click="deleteCoupon(tempCoupon.id)"
          >
            Confirm deletion
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
    deleteCoupon(id) {
      this.$store.commit('admin/deleteCoupon', id)
      $('#delCouponModal').modal('hide')
    }
  }
}
</script>
