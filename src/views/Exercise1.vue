<template>
  <main>
    <h1>Exercise 1</h1>
    <section>
      <h2>Shopping list</h2>
      <ul v-if="shoppingListItems.length">
        <li v-for="item in shoppingListItems" :key="item">{{ item }}</li>
      </ul>
      <p v-else>No items added yet</p>
    </section>
    <ul></ul>
    <form @submit.prevent="addToShoppingList">
      <fieldset>
        <legend>Shopping list</legend>
        <input type="text" v-model="newShoppingListItem" required/>
        <button>Add</button>
      </fieldset>
    </form>
  </main>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/firestore'

  export default {
    data() {
      return {
        shoppingListItems: [],
        newShoppingListItem: '',
      }
    },
    methods: {
      async addToShoppingList() {
        const db = firebase.firestore()
        await db.collection('shoppingList').add({
          name: this.newShoppingListItem
        })
        this.newShoppingListItem = ''
      }
    }
  }
</script>

<style scoped>
  fieldset {
    border: none;
  }
</style>
