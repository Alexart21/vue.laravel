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
    csrf_token: document.getElementById("csrf_token")?.content,
    isOk: true,
    alertMsg: '',
  },
  mutations: {
    clearMsgs(state){
      state.isOk = true;
      state.alertMsg = '';
    },
    addErrorMsg(state, msg){
      state.isOk = false;
      state.alertMsg = msg;
    },
    addSuccessMsg(state, msg){
      state.isOk = true;
      state.alertMsg = msg;
    }
  },
  actions: {
    alert(context, inp){
      if (inp.type === 'success'){
        context.commit('addSuccessMsg', inp.msg);
      }else if(inp.type === 'error'){
        context.commit('addErrorMsg', inp.msg)
      }else{
        context.commit('addSuccessMsg', inp.msg);
      }
      setTimeout(() => {
        context.commit('clearMsgs')
      }, 3000);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);
