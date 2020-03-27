export const state = () => ({
  messages: []
})

export const mutations = {
  setMessage(state, { message, status = 'success' }) {
    const timestamp = Math.floor(new Date() / 1000)
    state.messages.push({
      message,
      status,
      timestamp
    })
    this.commit('alert/removeMessageWithTiming', timestamp)
    console.log('alert/setMessage')
  },
  // remove by clicking manually
  removeMessage(idx) {
    state.messages.splice(idx, 1)
    console.log('alert/removeMessage')
  },
  // remove actively after 5s
  removeMessageWithTiming(state, timestamp) {
    setTimeout(() => {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      })
    }, 5000)
  }
}
