<template>
  <main>
    <h1>Exercise 2</h1>
    <p>Only allow read and write access to users on their personal shopping list, by setting rules in the firebase console.</p>
    <section>
      <h2>My personal shopping list</h2>
      <router-link
        v-if="!user"
        to="/login"
      >Login to see access personal shopping list</router-link>
      <ul v-else-if="shoppingListItems.length" class="shopping-list">
        <li v-for="item in shoppingListItems" :key="item.id">{{ item.name }}</li>
      </ul>
      <p v-else>No items added yet...</p>
    </section>
    <form @submit.prevent="addItem">
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
  import 'firebase/auth'
  import 'firebase/firestore'

  export default {
    props: {
      user: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        shoppingListItems: [],
        newShoppingListItem: '',
        shoppingListPending: false,
      }
    },
    mounted() {
      // Firebase calls this listener on initiate as well
      this.removeAuthStateListener = firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          await this.$nextTick()
          this.listenToChanges()
        } else {
          this.removeCollectionListener()
        }
      })
    },
    beforeDestroy() {
      this.removeCollectionListener()
      this.removeAuthStateListener() // remove auth state listener
    },
    methods: {
      listenToChanges() {
        this.collectionListener = firebase
          .firestore()
          .collection('users')
          .doc(this.user.uid)
          .collection('shoppingList')
          .onSnapshot(this.onSnapshot)
      },
      removeCollectionListener() {
        if (this.collectionListener) {
          return this.collectionListener()
        }
      },
      onSnapshot(snapshot) {
        this.shoppingListItems = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      },
      async addItem() {
        try {
          this.shoppingListPending = true
          await firebase
            .firestore()
            .collection('users')
            .doc(this.user.uid)
            .collection('shoppingList')
            .add({ name: this.newShoppingListItem })

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

  .shopping-list {
    list-style: none;
    padding: 0;
  }
</style>
