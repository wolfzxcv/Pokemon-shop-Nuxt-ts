<template>
  <div>
    <AlertMessage />
    <DashNav />
    <div class="container-fluid">
      <div class="row">
        <DashSide />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <nuxt />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import DashNav from '../components/admin/DashNav/index.vue'
import DashSide from '../components/admin/DashSide/index.vue'
import AlertMessage from '../components/common/AlertMessage/index.vue'

@Component({
  components: {
    DashNav,
    DashSide,
    AlertMessage
  }
})
export default class AdminLayout extends Vue {}
</script>
