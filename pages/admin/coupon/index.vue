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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ICoupon } from 'models/admin'
import {
  adminModule,
  loadingModule,
  paginationModule
} from '../../../store'
import Pagination from '../../../components/common/Pagination/index.vue'
import CouponModal from '../../../components/admin/coupon/CouponModal/index.vue'
import DelCouponModal from '../../../components/admin/coupon/DeleteCouponModal/index.vue'

@Component({
  components: {
    Pagination,
    CouponModal,
    DelCouponModal
  },
  layout: 'admin',
  middleware: ['Auth']
})
export default class AdminCoupon extends Vue {
  // meta: {
  //   requiresAuth: true
  // }

  get isLoading() {
    return loadingModule.isLoading
  }

  get isNewCoupon() {
    return adminModule.isNewCoupon
  }

  get tempCoupon() {
    return adminModule.tempCoupon
  }

  get coupons() {
    return adminModule.coupons
  }

  get pagination() {
    return paginationModule.pagination
  }

  created() {
    adminModule.getCoupons()
  }

  getCoupons(newPage: number) {
    adminModule.getCoupons(newPage)
  }

  openCouponModal(isNewCoupon: boolean, item: ICoupon) {
    if (isNewCoupon) {
      // adminModule.tempCoupon = {}
      adminModule.isNewCoupon = true
    } else {
      adminModule.tempCoupon = Object.assign({}, item)
      adminModule.isNewCoupon = false
    }
    ;($('#dashCouponModal') as any).modal('show')
  }

  openDeleteCouponModal(item: ICoupon) {
    ;($('#delCouponModal') as any).modal('show')
    adminModule.tempCoupon = Object.assign({}, item)
  }
}
</script>
