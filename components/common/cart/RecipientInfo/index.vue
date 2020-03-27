<template>
  <div class="my-5 row justify-content-center">
    <form
      class="col-md-6"
      autocomplete="on"
      @submit.prevent="placeOrder(form)"
    >
      <div class="form-group">
        <label for="useremail">Email</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
        >
          <input
            id="useremail"
            v-model="form.user.email"
            type="email"
            class="form-control"
            name="email"
            placeholder="Please enter your Email"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="username">Name</label>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <input
            id="username"
            v-model="form.user.name"
            type="text"
            class="form-control"
            name="name"
            placeholder="Please enter your name"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="usertel">TEL (number only)</label>
        <ValidationProvider v-slot="{ errors }" rules="numeric|min:8">
          <input
            id="usertel"
            v-model="form.user.tel"
            type="tel"
            class="form-control"
            placeholder="Please enter your phone number"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="useraddress">Address</label>
        <ValidationProvider
          v-slot="{ errors }"
          name="address"
          rules="required"
        >
          <input
            id="useraddress"
            v-model="form.user.address"
            type="text"
            class="form-control"
            name="address"
            placeholder="Please enter your address"
            required
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="comment">Message</label>
        <textarea
          id="comment"
          v-model="form.message"
          name
          class="form-control"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div class="text-right">
        <button class="btn btn-danger">Place the order</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RecipientInfo',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    placeOrder(formInfo) {
      this.$store.commit('cart/placeOrder', formInfo)
    }
  }
}
</script>
