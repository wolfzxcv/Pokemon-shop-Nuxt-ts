<template>
  <div>
    <nav
      class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        Pokemon shop
      </a>

      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authModule } from '../../../store'

@Component
export default class DashNav extends Vue {
  signout() {
    authModule.signout(this.$router)
  }
}
</script>
