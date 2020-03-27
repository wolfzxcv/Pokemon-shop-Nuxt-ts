<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>Admin</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :class="{ active: $route.name === 'admin-product' }"
            to="/admin/product"
          >
            <i class="fas fa-boxes"></i>
            Product
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :class="{ active: $route.name === 'admin-order' }"
            to="/admin/order"
          >
            <i class="fas fa-paste"></i>
            Order
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link"
            :class="{ active: $route.name === 'admin-coupon' }"
            to="/admin/coupon"
          >
            <i class="fas fa-money-check-alt"></i>
            Coupon
          </nuxt-link>
        </li>
      </ul>

      <!----down---->
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>Guests</span>
        <a
          class="d-flex align-items-center text-muted"
          href="#"
          aria-label="Add a new report"
        >
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/product">
            <i class="fas fa-shopping-basket"></i>
            Go shopping
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DashSide'
}
</script>
