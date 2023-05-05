<template>
  <h1>Registration</h1>
  <form name="registrationForm" @submit.prevent="send()">
    <label for="name">name</label>
    <input name="name" type="text">
    <div class="err-msg">{{ errMsgs.name }}</div>
    <br>
    <label for="email">email</label>
    <input name="email" type="text">
    <div class="err-msg">{{ errMsgs.email }}</div>
    <br>
    <label for="password">password</label>
    <input name="password" type="password">
    <div class="err-msg">{{ errMsgs.password }}</div>
    <br>
    <label for="password">confirm password</label>
    <input name="password_confirmation" type="password">
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
      errMsgs: {}
    }
  },
  methods: {
    ...mapMutations(['clearMsgs']),
    ...mapMutations('users', ['setUser']),
    ...mapActions(['alert']),
    async send() {
      this.clearMsgs();
      this.loader = true;
      this.errMsgs = {};
      let form = document.forms.registrationForm;
      let formData = new FormData(form);
      let url = '/api/auth/registration';
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
      } else {
        if (response.status == 422) { // ошибки валидации
          let result = await response.json();
          let errors = result.errors;
          this.alert({type: 'error', msg: 'Некорректные данные!'});
          console.log(errors);
          // далее обрабатываешь массив errors
          for (let key in errors) {
            this.errMsgs[key] = errors[key][0];
          }
          console.log(this.errMsgs)
        } else { // другие ошибки
          this.alert({type: 'error', msg: `${response.status} ${response.statusText}`});
          console.log(response);
        }
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
.err-msg {
  color: red;
}
</style>
