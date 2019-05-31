<template>
  <div id="app">
    <button v-if="user" @click="logout">Logout</button>
    <div v-else class="nav">
      <router-link to="/login">Login</router-link>
      | <router-link to="/register">Register</router-link>
    </div>
    <div class="nav">
      <router-link to="/">Overview</router-link>
      | <router-link to="/exercise1">Exercise1</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  import firebaseConfig from '../firebase.config'

  export default {
    data() {
      return {
        user: null
      }
    },
    mounted() {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }

      firebase
        .auth()
        .onAuthStateChanged(user => this.user = user)
    },
    methods: {
      logout() {
        return firebase.auth().signOut()
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
