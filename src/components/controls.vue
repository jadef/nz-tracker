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
            <tspan x="50%" y="100%" text-anchor="middle">nz tracker</tspan>
          </text>
        </g>
      </mask>
    </svg>

    <div :class="bem('controls')">
      <div :class="bem('edit')" v-on:click="toggleAccess">
        <span v-if="editing">Editing</span>
        <span v-else>Edit Mode</span>
      </div>
      <button
        v-if="editing"
        :class="bem('toggle', 'small')"
        v-on:click="openCreate = !openCreate"
      >
        Create
      </button>
    </div>
    <transition name="slide">
      <create
        v-if="editing"
        v-show="openCreate"
        v-on:addCard="addCard"
      ></create>
    </transition>
    <transition name="slide">
      <validation
        v-if="validating"
        v-on:validated="closeValidation"
      ></validation>
    </transition>
  </div>
</template>

<script>
import entryCreate from './controls/create.vue';
import validate from './controls/validate.vue';

export default {
  name: 'controls',
  components: {
    create: entryCreate,
    validation: validate,
  },
  data: function() {
    return {
      validating: false,
      editing: false,
      openCreate: false,
    };
  },
  methods: {
    addCard: function(id) {
      var self = this;
      self.$emit('addCard', id);
      setTimeout(function() {
        self.openCreate = false;
      }, 2000);
    },
    toggleAccess: function() {
      this.editing = false;
      this.validating = !this.validating;
    },
    closeValidation: function() {
      var self = this;
      self.editing = true;
      setTimeout(function() {
        self.validating = false;
      }, 2000);
    },
  },
  watch: {
    editing: function() {
      this.$emit('editing', this.editing);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/elements/variables.scss';
@import './controls.scss';
</style>
