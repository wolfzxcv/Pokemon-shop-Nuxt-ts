<template>
  <div>
    <NavBar />
    <AlertMessage />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavBar from '../components/common/NavBar/index.vue'
import AlertMessage from '../components/common/AlertMessage/index.vue'

@Component({
  components: {
    NavBar,
    AlertMessage
  }
})
export default class DefaultLayout extends Vue {
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
