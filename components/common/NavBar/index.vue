<template>
  <nav class="d-flex flex-row">
    <div>
      <ul id="pills-tab" class="nav nav-pills mb-3" role="tablist">
        <li class="nav-item">
          <nuxt-link
            id="pills-home-tab"
            class="nav-link"
            :class="{ active: $route.name === 'index' }"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            to="/"
          >
            <i class="fas fa-home"></i>
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            id="pills-home-tab"
            class="nav-link"
            :class="{ active: $route.name === 'login' }"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            to="/login"
          >
            <i class="fas fa-user-friends"></i>
            Login
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            id="pills-profile-tab"
            class="nav-link"
            :class="{ active: $route.name === 'product' }"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            to="product"
          >
            <i class="fas fa-boxes"></i>
            Product
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            id="pills-contact-tab"
            class="nav-link"
            :class="{ active: $route.name === 'cart' }"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
            to="/cart"
          >
            <i class="fas fa-cart-plus"></i>
            Cart
          </nuxt-link>
        </li>
      </ul>
    </div>
    <Dropdown />
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Dropdown from './Dropdown/index.vue'

@Component({
  components: {
    Dropdown
  }
})
export default class NavBar extends Vue {}
</script>
