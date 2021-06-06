<template>
  <div :class="bem('wrapper')">
    <h1 :class="bem('title')">NZ Hikers</h1>
    <div
      :class="bem('toggle')"
      v-on:click="
        (openToggles = !openToggles) &&
          (openDelete = false) &&
          (openCreate = false)
      "
    >
      Edit
    </div>
    <div :class="bem('toggles')" v-show="openToggles">
      <button
        :class="bem('create')"
        v-on:click="(openCreate = !openCreate) && (openDelete = false)"
      >
        Create
      </button>
      <button
        :class="bem('delete')"
        v-on:click="(openDelete = !openDelete) && (openCreate = false)"
      >
        Delete
      </button>
    </div>
    <create v-show="openToggles && openCreate"></create>
    <delete v-show="openToggles && openDelete"></delete>
  </div>
</template>

<script>
import entryCreate from './controls/create.vue';
import entryDelete from './controls/delete.vue';

export default {
  name: 'controls',
  components: {
    create: entryCreate,
    delete: entryDelete,
  },
  data: function() {
    return {
      openToggles: false,
      openCreate: false,
      openDelete: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/elements/variables.scss';
@import './controls.scss';
</style>
