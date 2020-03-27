<template>
  <div>
    <NavBar />
    <AlertMessage />
    <nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/common/NavBar'
import AlertMessage from '~/components/common/AlertMessage'

export default {
  components: {
    NavBar,
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

<style lang="scss">
@import '~/assets/all.scss';
</style>
