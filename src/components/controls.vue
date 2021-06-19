<template>
  <div :class="bem()">
    <svg :class="bem('knockout')">
      <rect
        :class="bem('knockout-bg')"
        fill="#fff"
        width="100%"
        height="100%"
        fill-opacity="1"
        mask="url(#knockout-text)"
      />
      <mask id="knockout-text">
        <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
        <g
          id="knockout-logo"
          fill="#000"
          font-family="Roboto-Bold, Roboto"
          font-size="36"
          font-weight="400"
        >
          <text>
            <tspan x="50%" y="100%" text-anchor="middle">nz hike keeper</tspan>
          </text>
        </g>
      </mask>
    </svg>

    <div :class="bem('toggle')" v-on:click="openCreate = !openCreate">
      Create
    </div>

    <transition name="slide">
      <create v-show="openCreate" v-on:addCard="addCard"></create>
    </transition>
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
  methods: {
    addCard: function(id) {
      var self = this;
      self.$emit('addCard', id);
      setTimeout(function() {
        self.openCreate = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/elements/variables.scss';
@import './controls.scss';
</style>
