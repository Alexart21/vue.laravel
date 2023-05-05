<template>
  <span v-if="loader">loader...</span>
  <button @click="refresh()">refresh token</button>
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
    ...mapActions(['alert']),
    async refresh() {
      this.loader = true;
      this.clearMsgs();
      this.user = null;
      let url = '/api/auth/refresh';
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
        this.alert({type: 'success', msg: 'Ok!'});
        console.log(result);
        // пришел токен сохрани его
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('token_type', result.token_type);
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

<style scoped>

</style>
