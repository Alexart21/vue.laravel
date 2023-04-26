<template>
  <h1>Test access</h1>
  <span v-if="loader">loader...</span>
  <button @click="send()">test</button>
  <div v-if="statusText" :class="[isOk ? 'success' : 'danger']">{{ statusText }}</div>
  <div v-if="user">
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loader: false,
      isOk: true,
      statusText: '',
      user: null
    }
  },
  methods: {
    async send() {
      this.loader = true;
      this.statusText = '';
      this.user = null;
      let url = '/api/auth/me';
      let token = localStorage.getItem('access_token');
      let tokenType = localStorage.getItem('token_type');
      await axios({
        method: "POST",
        url: url,
        headers: {
          Accept: "application/json",
          Authorization: tokenType + ' ' + token
        },
      })
        .then((response) => {
          this.isOk = true;
          this.statusText = 'Ok';
          console.log(response);
          // console.log(response.data);
          this.user = response.data;
        })
        .catch((err) => {
          console.log(err);
          this.isOk = false;
          this.statusText = err.message;
        })
      this.loader = false;
    }
  }

}
</script>

<style scoped>

</style>
