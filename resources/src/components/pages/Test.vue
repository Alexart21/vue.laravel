<template>
  <h1>Test component</h1>
  <div style="display: flex">
    <div v-if="users.length">
      <table class="test-table">
        <tr v-for="user in users">
          <td>
            <mdicon name="CardAccountMailOutline"/>
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      table: []
    };
  },
  methods: {
    ...mapActions('users', ['getUsers']),
  },
  computed: {
    ...mapState('users', ['users'])
  },
  watch: {
    users: {
      handler() {
        console.log(this.users);
      }
    }
  },
  mounted() {
    this.getUsers();
  },
};
</script>
<style scoped>
.test-table tr td {
  padding: .5em;
  border: 1px solid #999;
}
</style>
