<template>
  <main>
    <h1>Exercise 3</h1>
    <p>Extend your rules from exercise 1 to only allow updates on your own items</li></p>
    <section>
      <h2>Shared shopping list</h2>
      <ul class="shopping-list" v-if="shoppingListItems.length">
        <li v-for="item in shoppingListItems" :key="item.id">
          <input disabled type="checkbox" v-model="item.ordered"/>
          {{ item.email || 'anonymous' }} - {{ item.name }}
          <button @click="toggleOrdered(item)">Toggle</button>
        </li>
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
            name: this.newShoppingListItem,
            email: firebase.auth().currentUser.email,
            userId: firebase.auth().currentUser.uid,
          })
          this.newShoppingListItem = ''
        } catch (error) {
          console.error(error)
        } finally {
          this.shoppingListPending = false
        }
      },
      toggleOrdered(item) {
        return firebase.firestore().collection('shoppingList').doc(item.id).update({
          ordered: !item.ordered
        })
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
