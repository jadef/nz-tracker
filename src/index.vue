<template>
  <div id="app">
    <controls></controls>
    <grid :cards="cards"></grid>
  </div>
</template>

<script lang="ts">
import grid from './components/grid.vue';
import controls from './components/controls.vue';

export default {
  name: 'app',
  components: {
    grid,
    controls,
  },
  data: function() {
    return { cards: [] };
  },
};
</script>

<style lang="scss">
@import './scss/styles.scss';
</style>
