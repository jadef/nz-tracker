<template>
  <div :class="bem('wrapper')">
    <h1 :class="bem('title')">NZ Hikers</h1>
    <div :class="bem('toggle')" v-on:click="openCreate = !openCreate">
      Create
    </div>
    <create v-show="openCreate"></create>
  </div>
</template>

<script>
import entryCreate from './controls/create.vue';

export default {
  name: 'controls',
  components: {
    create: entryCreate,
  },
  data: function() {
    return {
      openCreate: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/elements/variables.scss';
@import './controls.scss';
</style>
