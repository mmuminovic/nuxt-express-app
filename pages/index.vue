<template>
  <div>
    <b-tabs justified justified-nav>
      <b-tab title="Items" active>
        <div class="pt-4">
          <h2>All items</h2>
        </div>
        <div>
          <b-row>
            <b-col v-for="item in items" :key="item.id" md="4">
              <b-card class="my-2">
                <b-card-body>
                  <h4 class="card-title">
                    {{ item.name }}
                  </h4>
                  <p class="card-text">
                    Date: {{ item.date }}
                  </p>
                  <p class="card-text">
                    Important: {{ item.important }}
                  </p>
                  <nuxt-link :to="`/items/${item.id}`">
                    <b-button variant="primary">
                      Edit
                    </b-button>
                  </nuxt-link>
                  <b-button
                    variant="outline-danger"
                    @click="deleteItem(item.id)"
                  >
                    Delete
                  </b-button>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>

          <b-row class="justify-content-center pt-2">
            <nuxt-link :to="'/items/create'">
              <b-button variant="outline-primary">
                Create New Item
              </b-button>
            </nuxt-link>
          </b-row>
        </div>
      </b-tab>

      <b-tab
        title="User Profile"
        :disabled="!$store.state.auth.isAuthenticated"
      >
        <div class="pt-4">
          <h2>Edit User Profile</h2>
          <b-form @submit="updateUserProfile">
            <b-form-group label="Username:" label-for="username">
              <b-form-input
                id="username"
                v-model="userProfile.username"
                required
              />
            </b-form-group>
            <b-form-group label="Email:" label-for="email">
              <b-form-input id="email" v-model="userProfile.email" required />
            </b-form-group>
            <b-form-group label="First Name:" label-for="firstName">
              <b-form-input id="firstName" v-model="userProfile.firstName" />
            </b-form-group>
            <b-form-group label="Last Name:" label-for="lastName">
              <b-form-input id="lastName" v-model="userProfile.lastName" />
            </b-form-group>
            <b-form-group label="Biography:" label-for="biography">
              <b-form-textarea id="biography" v-model="userProfile.biography" />
            </b-form-group>
            <b-button type="submit" variant="primary">
              Save Changes
            </b-button>
          </b-form>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      userProfile: {}
    }
  },
  async fetch () {
    try {
      const items = await this.$axios.$get('/api/items')
      this.items = items.map((item) => {
        if (item.date) {
          const date = new Date(item.date)
          const formattedDate = date.toISOString().split('T')[0]
          item.date = formattedDate
        }
        return item
      })
      try {
        const userProfile = await this.$axios.$get('/api/profile')
        this.userProfile = userProfile
      } catch (err) {}
    } catch (error) {
      this.items = []
    }
  },
  fetchOnServer: false,
  methods: {
    async deleteItem (id) {
      if (this.$store.state.auth.isAuthenticated) {
        try {
          await this.$axios.$delete(`/api/items/${id}`)
          // If the deletion was successful, update the item list
          const updatedItems = this.items.filter(item => item.id !== id)
          this.items = updatedItems
        } catch (error) {
          // console.error('Error deleting item:', error)
        }
      }
    },
    async updateUserProfile () {
      await this.$axios.$patch('/api/profile', this.userProfile)
    }
  }
}
</script>

<style scoped>
.titleBar {
  background-color: #9dcbe17b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
}
</style>
