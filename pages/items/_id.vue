<template>
  <div>
    <h1>Edit Item</h1>
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
    return {
      newItem: {
        name: '',
        date: '',
        important: false
      }
    }
  },
  async created () {
    if (this.$route.params.id) {
      this.editingItem = true
      const itemToEdit = await this.$axios.$get(
        `/api/items/${this.$route.params.id}`
      )

      if (itemToEdit.date) {
        const date = new Date(itemToEdit.date)
        const formattedDate = date.toISOString().split('T')[0]
        itemToEdit.date = formattedDate
      }

      this.newItem = { ...itemToEdit }
    }
  },
  methods: {
    async saveItem () {
      await this.$axios.$patch(
        `/api/items/${this.$route.params.id}`,
        this.newItem
      )
      this.$router.push('/items')
    }
  }
}
</script>
