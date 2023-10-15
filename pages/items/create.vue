<template>
  <div class="form-wrapper">
    <h1>Create New Item</h1>
    <b-form @submit.prevent="saveItem">
      <b-form-group
        id="name-group"
        label="Name"
        label-for="name"
        label-align="left"
      >
        <b-form-input
          id="name"
          v-model="newItem.name"
          type="text"
          placeholder="Enter name"
        />
      </b-form-group>

      <b-form-group
        id="date-group"
        label="Date"
        label-for="date"
        label-align="left"
      >
        <b-form-input
          id="date"
          v-model="newItem.date"
          type="date"
          placeholder="Select date"
        />
      </b-form-group>

      <b-form-checkbox id="important" v-model="newItem.important" switch>
        Important
      </b-form-checkbox>

      <b-button type="submit" variant="primary">
        {{ editingItem ? 'Update Item' : 'Create Item' }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    const date = new Date()
    const formattedDate = date.toISOString().split('T')[0]
    return {
      newItem: {
        name: '',
        date: formattedDate,
        important: false
      }
    }
  },
  methods: {
    async saveItem () {
      await this.$axios.$post('/api/items', this.newItem)
      this.$router.push('/items')
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 20px;
}
</style>
