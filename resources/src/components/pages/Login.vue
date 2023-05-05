<template>
  <h1>Login</h1>
  <form @submit.prevent="send()" name="loginForm">
    <label for="email">email</label>
    <input type="text" name="email">
    <br>
    <label for="password">password</label>
    <input type="password" name="password">
    <br>
    <span v-if="loader">loader...</span>
    <button type="submit">submit</button>
    <div v-if="alertMsg" :class="[isOk ? 'success' : 'danger']">{{ alertMsg }}</div>
  </form>
</template>
<script>
import {mapMutations, mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      loader: false,
    }
  },
  methods: {
    ...mapMutations(['clearMsgs']),
    ...mapMutations('users', ['setUser']),
    ...mapActions(['alert']),
    async send() {
      this.loader = true;
      this.clearMsgs();
      let form = document.forms.loginForm;
      let formData = new FormData(form);
      let url = '/api/auth/login';
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        this.alert({type: 'success', msg: 'Ok!'});
        console.log(result);
        // пришел токен сохрани его
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('token_type', result.token_type);
        this.setUser(result.name);
      } else {
        this.alert({type: 'error', msg: `${response.status} ${response.statusText}`});
        console.log(response);
      }
      this.loader = false;
    }
  },
  computed: {
    ...mapState(['isOk', 'alertMsg'])
  },
  mounted() {

  }
}
</script>

<style>
.success {
  color: green;
}

.danger {
  color: red;
}
</style>
