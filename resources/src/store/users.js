export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: '',
    users: [],
  },
  mutations: {
    setUsers(state, response) {
      state.users = response.users;
    },
    setUser(state, name) {
      state.user = name;
    },
    setGuest(state) {
      state.user = 'Guest';
    }
  },
  actions: {
    async getUsers(context) {
      let url = '/users';
      let formData = new FormData();
      formData.append('_token', context.rootState.csrf_token);
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData
      });
      if (response.ok) {
        response = await response.json();
        context.commit("setUsers", response);
      } else {
        console.log("Ошибка в action");
        console.log(response);
      }
    },
    async getUser(context) {
      let token = localStorage.getItem('access_token');
      let tokenType = localStorage.getItem('token_type');
      if (!token) {
        context.commit("setGuest");
      } else {
        let response = await fetch('/api/auth/me', {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: tokenType + ' ' + token
          },
        });
        if (response.ok) {
          let result = await response.json();
          context.commit("setUser", result.name);
          // console.log(this.isAuth);
        } else {
          if (response.status == 401) {
            console.log('here')
            context.commit("setGuest");
          }
          console.log(response);
        }
      }

    }
  }
}
