<template>
  <div v-if="show">
    <div v-if="overlay" class="overlay"></div>
    <div class="modal-outher">
      <div class="my-modal">
        <div class="close-outher">
          <div @click="hide()" class="close-bt">X</div>
        </div>
        <h1>{{ modalContent.header }}</h1>
        <p>{{ modalContent.body }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  emits: ['closeEmit'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalContent: {
      type: Object,
      required: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    hide() {
      this.$emit('closeEmit');
    }
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  /*background: lime;*/
}

.modal-outher{
  width: 300px;
  height: 100%;
  position: absolute;
  z-index: 10001;
  left: calc(50% - 150px);
  /*background: lime;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-modal {
  max-width: 300px;
  background: #fff;
  padding: 1em;
  border: 1px solid #222;
}

.close-outher{
  display: flex;
  justify-content: end;
}

.close-bt{
  cursor: pointer;
}
</style>
