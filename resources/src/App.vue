<template>
  <modal :show="showModal" :modal-content="modalContent" :overlay="true" @closeEmit="close()"/>
  <ul>
    <li>
      <router-link :to="{ name: 'index' }"> index</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'test' }"> test</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'login' }"> login</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'registration' }"> registration</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'me' }"> me</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'refresh' }"> refresh_token</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'logout' }"> logout</router-link>
    </li>
    <li>
      <button @click="showModal = true">modal-test</button>
    </li>
    <li>
      <router-link :to="{ name: 'table-test' }"> table-test</router-link>
    </li>
  </ul>
  <router-view/>
  <div>user: {{ user }}</div>
</template>
<script>
import Modal from './components/ui/Modal.vue';
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      modalContent: {
        header: 'Modal header',
        body: 'Modal body text'
      }
    }
  },
  methods: {
    ...mapActions('users', ['getUser']),
    close() {
      this.showModal = false
    }
  },
  computed: {
    ...mapState('users', ['user'])
  },
  mounted() {
    this.getUser();
    console.log(this.user);
  }
}
</script>
<style scoped>
li {
  display: inline;
  margin: .5em;
  list-style: none;
}

li a, li a:visited {
  text-decoration: none;
  padding: 0 .5em;
}

.router-link-active {
  border: 1px solid green;

}
</style>
