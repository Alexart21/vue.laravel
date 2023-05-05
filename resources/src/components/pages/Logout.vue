<template>
  <h1>Logout test</h1>
  <span v-if="loader">loader...</span>
  <button @click="logout()">logout</button>
  <div v-if="alertMsg" :class="[isOk ? 'success' : 'danger']">{{ alertMsg }}</div>
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
    ...mapMutations('users', ['setGuest']),
    ...mapActions(['alert']),
    async logout() {
      this.loader = true;
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
          this.alert({type: 'success', msg: 'Logout ok!'});
          this.setGuest();
        } else {
          console.log('Her znaet chego...')
        }
      } else {
        this.alert({type: 'error', msg: `${response.status} ${response.statusText}`});
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

<style scoped>
.success {
  color: green;
}

.danger {
  color: red;
}
</style>
