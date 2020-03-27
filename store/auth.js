import axios from 'axios'
export const mutations = {
  async signin(state, loginData) {
    const res = await axios.post(
      `${process.env.VUE_APP_PATH}/admin/signin`,
      loginData
    )
    const msg = res.data.message
    console.log('auth/signin', res.data)
    if (res.data.success) {
      this.$router.push('/admin/product')
      this.commit('alert/setMessage', { message: msg })
    }
  },
  async signout() {
    const res = await axios.post(`${process.env.VUE_APP_PATH}/logout`)
    const msg = res.data.message
    console.log('auth/signout', res.data)
    if (res.data.success) {
      this.$router.push('/login')
      this.commit('alert/setMessage', {
        message: msg,
        status: 'danger'
      })
    }
  }
}
