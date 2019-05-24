<template>
  <div id="app">
    <div id="firebaseui-auth-container"/>
    <div class="nav">
      <router-link to="/">Overview</router-link>
      | <router-link to="/exercise1">Exercise1</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import * as firebaseui from 'firebaseui'
  import 'firebase/auth'

  import firebaseConfig from '../firebase.config'

  export default {
    data() {
      return {
        user: null
      }
    },
    mounted() {
      firebase.initializeApp(firebaseConfig)

      const auth = firebase.auth()
      auth.onAuthStateChanged(user => this.user = user)

      const ui = new firebaseui.auth.AuthUI(auth)
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: false,
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
          }
        ]
      })
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
