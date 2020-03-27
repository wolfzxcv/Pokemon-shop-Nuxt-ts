export const state = () => ({
  isLoading: false
})

export const mutations = {
  setLoading(state, status) {
    state.isLoading = status
  }
}
