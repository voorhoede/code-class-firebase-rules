<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Overview</router-link>
      | <router-link to="/exercise1">Exercise1</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'

  import firebaseConfig from '../firebase.config'

  export default {
    mounted() {
      firebase.initializeApp(firebaseConfig)
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
