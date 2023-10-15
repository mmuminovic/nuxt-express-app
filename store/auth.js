export const state = () => ({
  isAuthenticated: null
})

export const mutations = {
  setAuthenticated (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  }
}

export const actions = {
  updateAuthenticationStatus ({ commit }, isAuthenticated) {
    commit('setAuthenticated', isAuthenticated)
  }
}
