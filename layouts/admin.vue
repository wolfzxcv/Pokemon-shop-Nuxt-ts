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

<script>
import DashNav from '../components/admin/DashNav'
import DashSide from '../components/admin/DashSide'
import AlertMessage from '~/components/common/AlertMessage'
export default {
  components: {
    DashNav,
    DashSide,
    AlertMessage
  },
  head() {
    return {
      title: 'Pick up your Pokemon!!!',
      meta: [
        {
          hid: 'description',
          name: 'index name',
          content: 'Pick up your Pokemon content!'
        }
      ]
    }
  }
}
</script>
