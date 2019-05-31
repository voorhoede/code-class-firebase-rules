<template>
  <main>
    <h1>Exercise 1</h1>
    <ol class="exercise-steps">
      <li>Write rules in the firebase console, to only allow additions to the shopping list when the user is logged in.</li>
      <li>Reading the shopping list should always be allowed.</li>
      <li>Validate whether the written data has a name property</li>
    </ol>
    <section>
      <h2>Shared shopping list</h2>
      <ul class="shopping-list" v-if="shoppingListItems.length">
        <li v-for="item in shoppingListItems" :key="item.id">{{ item.name }}</li>
      </ul>
      <p v-else>No items added yet</p>
    </section>
    <ul></ul>
    <form @submit.prevent="addToShoppingList">
      <fieldset>
        <legend>Shopping list</legend>
        <input type="text" v-model="newShoppingListItem" required/>
        <button :disabled="shoppingListPending">Add</button>
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
        shoppingListPending: false,
        newShoppingListItem: '',
      }
    },
    async mounted() {
      this.removeShoppingListListener = firebase
        .firestore()
        .collection('shoppingList')
        .onSnapshot(this.onSnapshot)
    },
    beforeDestroy() {
      this.removeShoppingListListener()
    },
    methods: {
      onSnapshot(snap) {
        this.shoppingListItems = snap.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      },
      async addToShoppingList() {
        try {
          this.shoppingListPending = true
          await firebase.firestore().collection('shoppingList').add({
            name: this.newShoppingListItem
          })
          this.newShoppingListItem = ''
        } catch (error) {
          console.error(error)
        } finally {
          this.shoppingListPending = false
        }
      }
    }
  }
</script>

<style scoped>
  fieldset {
    border: none;
  }

  main {
    margin: 0 auto;
    max-width: 40em;
  }

  .exercise-steps {
    text-align: left;
  }

  .shopping-list {
    list-style: none;
    padding: 0;
  }
</style>
