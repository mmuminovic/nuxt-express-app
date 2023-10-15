<template>
  <div class="wrapper">
    <b-navbar
      v-if="!['login'].includes($route.name)"
      toggleable="lg"
      type="dark"
      variant="dark"
      class="header"
    >
      <b-navbar-brand href="/">
        My Nuxt App
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/">
            Dashboard
          </b-nav-item>
          <b-nav-item v-if="isAuthenticated" @click="handleLogout">
            Logout
          </b-nav-item>
          <b-nav-item v-else href="/login">
            Login
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return { isAuthenticated: this.$store.state.auth.isAuthenticated }
  },
  async fetch () {
    try {
      const response = await this.$axios.$get('/api/check-auth')
      const isAuthenticated = response.isAuthenticated

      this.$store.commit('auth/setAuthenticated', isAuthenticated)
      this.isAuthenticated = isAuthenticated
    } catch (error) {
      this.$store.commit('auth/setAuthenticated', false)
      this.isAuthenticated = false
      this.$router.replace('/login')
    }
  },
  fetchOnServer: false,
  methods: {
    async handleLogout () {
      const response = await this.$axios.$post('/api/logout')
      this.$store.dispatch(
        'auth/updateAuthenticationStatus',
        response.isAuthenticated
      )
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #fff0c5;
  min-height: 100vh;
  padding: 20px;
}
</style>
