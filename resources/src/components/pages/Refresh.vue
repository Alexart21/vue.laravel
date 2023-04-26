<template>
  <span v-if="loader">loader...</span>
  <button @click="refresh()">refresh token</button>
  <div v-if="statusText" :class="[isOk ? 'success' : 'danger']">{{ statusText }}</div>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      isOk: true,
      statusText: '',
    }
  },
  methods: {
    async refresh() {
      this.loader = true;
      this.statusText = '';
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
        this.isOk = true;
        this.statusText = 'Ok';
        console.log(result);
        // пришел токен сохрани его
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('token_type', result.token_type);
      } else {
        this.isOk = false;
        this.statusText = `${response.status} ${response.statusText}`;
        console.log(response);
      }
      this.loader = false;
    }
  }
}
</script>

<style scoped>

</style>
