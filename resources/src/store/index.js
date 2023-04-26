import {createStore} from 'vuex'

import firstComponent from './firstComponent'
import users from './users'

const store = {
  modules: {
    firstComponent,
    users,
  },
  state: {
    common: 'bla-bla',
    csrf_token: document.getElementById("csrf_token")?.content
  },
  mutations: {
    /*setCsrf(state, csrf) {
        state.csrf_token = document.getElementById("csrf_token").content;
    },*/
  },
  actions: {
  },
  strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);
