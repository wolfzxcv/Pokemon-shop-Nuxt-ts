<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        Add New Coupon
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Coupon Name</th>
          <th>Code</th>
          <th width="100">Percentage</th>
          <th width="100">EXP</th>
          <th width="100">Enabled</th>
          <th width="100">Edit</th>
          <th width="100">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in coupons" :key="x.id">
          <td>{{ x.title }}</td>
          <td>{{ x.code }}</td>
          <td>{{ x.percent }}</td>
          <td>
            {{
              new Date(x.due_date * 1000).toLocaleDateString('en-GB')
            }}
          </td>
          <td>
            <span v-if="x.is_enabled" class="text-success">
              enabled
            </span>
            <span v-else>disabled</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, x)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteCouponModal(x)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getCoupons" />

    <CouponModal />

    <DelCouponModal />
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '~/components/common/Pagination'
import CouponModal from '~/components/admin/coupon/CouponModal'
import DelCouponModal from '~/components/admin/coupon/DeleteCouponModal'

export default {
  name: 'AdminCoupon',
  middleware: 'Auth',
  meta: {
    requiresAuth: true
  },
  layout: 'admin',
  components: { Pagination, CouponModal, DelCouponModal },
  computed: {
    isLoading() {
      return this.$store.state.loading.isLoading
    },
    isNewCoupon() {
      return this.$store.state.admin.isNewCoupon
    },
    tempCoupon() {
      return this.$store.state.admin.tempCoupon
    },
    coupons() {
      return this.$store.state.admin.coupons
    },
    pagination() {
      return this.$store.state.pagination.pagination
    }
  },
  created() {
    this.$store.commit('admin/getCoupons')
  },
  methods: {
    getCoupons(newPage) {
      this.$store.commit('admin/getCoupons', newPage)
    },
    openCouponModal(isNewCoupon, item) {
      if (isNewCoupon) {
        this.$store.state.admin.tempCoupon = {}
        this.$store.state.admin.isNewCoupon = true
      } else {
        this.$store.state.admin.tempCoupon = Object.assign({}, item)
        this.$store.state.admin.isNewCoupon = false
      }
      $('#dashCouponModal').modal('show')
    },
    openDeleteCouponModal(item) {
      $('#delCouponModal').modal('show')
      this.$store.state.admin.tempCoupon = Object.assign({}, item)
    }
  }
}
</script>
