<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pages.total_pages"
        :key="page"
        class="page-item"
        :class="{ active: pages.current_page === page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="updatePage(page)"
        >
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    updatePage(newPage) {
      this.$emit('emitPages', newPage)
      console.log('pagination emit! page=', newPage)
    }
  }
}
</script>
