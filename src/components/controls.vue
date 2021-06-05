<template>
  <div class="controls__wrapper">
    <h1 class="controls__title">NZ Hikers</h1>
    <div
      class="controls__toggle"
      v-on:click="
        (openToggles = !openToggles) &&
          (openDelete = false) &&
          (openCreate = false)
      "
    >
      Edit
    </div>
    <div class="controls__toggles" v-show="openToggles">
      <button
        class="controls__create"
        v-on:click="(openCreate = !openCreate) && (openDelete = false)"
      >
        Create
      </button>
      <button
        class="controls__delete"
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
module.exports = {
  name: "controls",
  components: {
    create: httpVueLoader("scripts/controls/create.vue"),
    delete: httpVueLoader("scripts/controls/delete.vue"),
  },
  data: function () {
    return {
      openToggles: false,
      openCreate: false,
      openDelete: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./controls.scss";
</style>
