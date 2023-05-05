<template>
  <h1>Test access</h1>
  <span v-if="loader">loader...</span>
  <button @click="send()">test</button>
  <div v-if="alertMsg" :class="[isOk ? 'success' : 'danger']">{{ alertMsg }}</div>
  <div v-if="user">
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>
<script>
import axios from "axios";
import {mapMutations, mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      loader: false,
      user: null
    }
  },
  methods: {
    ...mapMutations(['clearMsgs']),
    ...mapActions(['alert']),
    async send() {
      this.loader = true;
      this.clearMsgs();
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
          this.alert({type: 'success', msg: 'Ok!'});
          console.log(response);
          // console.log(response.data);
          this.user = response.data;
        })
        .catch((err) => {
          console.log(err);
          this.alert({type: 'error', msg: err.message});
        })
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
