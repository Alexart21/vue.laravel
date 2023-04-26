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
    <div v-if="statusText" :class="[isOk ? 'success' : 'danger']">{{ statusText }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      isOk: true,
      statusText: '',
      errMsgs: {}
    }
  },
  methods: {
    async send() {
      this.loader = true;
      this.statusText = '';
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
        this.isOk = true;
        this.statusText = 'Ok';
        console.log(result);
        // пришел токен сохрани его
      } else {
        if (response.status == 422) { // ошибки валидации
          let result = await response.json();
          let errors = result.errors;
          this.isOk = false;
          this.statusText = 'Некорректные данные!';
          console.log(errors);
          // далее обрабатываешь массив errors
          for (let key in errors) {
            this.errMsgs[key] = errors[key][0];
          }
          console.log(this.errMsgs)
        } else { // другие ошибки
          this.isOk = false;
          this.statusText = `${response.status} ${response.statusText}`;
          console.log(response);
        }
      }
      this.loader = false;
    }
  },
}
</script>

<style scoped>
.err-msg {
  color: red;
}
</style>
