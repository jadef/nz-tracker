<template>
  <div id="app">
    <controls v-on:addCard="addCard"></controls>
    <grid :additionalCard="additionalCard"></grid>
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
    return { additionalCard: '' };
  },
  methods: {
    addCard: function(id) {
      this.additionalCard = id;
    },
  },
};
</script>

<style lang="scss">
@import './scss/styles.scss';
</style>
