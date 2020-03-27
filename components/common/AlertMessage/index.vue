<template>
  <div class="message-alert">
    <div
      v-for="(item, i) in messages"
      :key="i"
      class="alert alert-dismissible"
      :class="`alert-${item.status}`"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(idx)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  computed: {
    messages() {
      return this.$store.state.alert.messages
    }
  },
  methods: {
    removeMessage(idx) {
      this.$store.commit('alert/removeMessage', idx)
    }
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
