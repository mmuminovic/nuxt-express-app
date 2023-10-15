<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <form class="p-4 border rounded" @submit.prevent="login">
      <h1 class="mb-4">
        Login
      </h1>
      <b-form-group label="Username" label-for="username">
        <b-form-input
          id="username"
          v-model="username"
          type="text"
          name="username"
        />
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          name="password"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Login
      </b-button>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  methods: {
    async login () {
      await this.$axios.$post('/api/login', {
        username: this.username,
        password: this.password
      })
      this.$store.dispatch('auth/updateAuthenticationStatus', true)
      this.$router.push('/')
    }
  }
}
</script>
