<template>
  <h1>Logout test</h1>
  <span v-if="loader">loader...</span>
  <button @click="logout()">logout</button>
  <div v-if="statusText" :class="[isOk ? 'success' : 'danger']">{{ statusText }}</div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      isOk: true,
      loader: false,
      statusText: ''
    }
  },
  methods: {
    ...mapMutations('users', ['setGuest']),
    async logout() {
      this.loader = true;
      this.statusText = '';
      let url = '/api/auth/logout';
      let token = localStorage.getItem('access_token');
      let tokenType = localStorage.getItem('token_type');
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: tokenType + ' ' + token
        },
      });
      if (response.ok) {
        let result = await response.json();
        if (result.success) {
          this.isOk = true;
          this.statusText = 'Logout ok!';
          this.setGuest();
        } else {
          console.log('Her znaet chego...')
        }
      } else {
        this.isOk = false;
        this.statusText = `${response.code} ${response.statusText}`;
      }
      this.loader = false;
    }
  },
  computed: {
    // ...mapState('users', ['user'])
  },
}
</script>

<style scoped>
.success {
  color: green;
}

.danger {
  color: red;
}
</style>
