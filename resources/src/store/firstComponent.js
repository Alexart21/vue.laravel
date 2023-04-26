export default {
  namespaced: true,
  state: {
    first: 'first-component data',
  },
  getters: {
    first: state => state.first,
    result: state => state.first + ' + добавили текст',
  },
  mutations: {},
  actions: {},
}
