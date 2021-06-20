<template>
  <div id="app">
    <controls v-on:addCard="addCard" v-on:editing="toggleEditing"></controls>
    <grid :additionalCard="additionalCard" :editing="editing"></grid>
  </div>
</template>

<script>
import grid from './components/grid.vue';
import controls from './components/controls.vue';

export default {
  name: 'app',
  components: {
    grid,
    controls,
  },
  data: function() {
    return {
      additionalCard: '',
      editing: false,
    };
  },
  methods: {
    addCard: function(id) {
      this.additionalCard = id;
    },
    toggleEditing: function(value) {
      this.editing = value;
    },
  },
};
</script>

<style lang="scss">
@import './scss/styles.scss';
</style>
