<template>
  <form class="login" @submit.prevent="login">
    <label for="email">Email</label>
    <input id="email" type="email" name="email" v-model="email"/>
    <label for="password">Password</label>
    <input id="password" type="password" name="password" v-model="password"/>
    <button type="submit">Login</button>
  </form>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        return firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.replace('/'))
      }
    }
  }
</script>

<style>
  .login {
    margin: 0 auto;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .login input {
    margin-bottom: 1rem;
  }
</style>
