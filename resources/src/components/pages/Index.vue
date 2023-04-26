<template>
  <h1>Index component</h1>
    <h2>{{ common }}</h2>
    <h2>csrf={{ csrf_token }}</h2>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {
      // ...mapGetters('firstComponent', ['first', 'result']),
      ...mapState(['common', 'csrf_token'])
  },
  created() {
  },
  mounted() {

  },
};
</script>

<style>
.test{
    color: blue;
}
.test2{
    color: rgb(30, 255, 0);
}
</style>
