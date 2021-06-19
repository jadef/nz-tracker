<template>
  <div :class="bem('wrapper')">
    <form id="delete-bin" @submit.prevent="processForm">
      <button :class="bem('submit', { size: 'small' })" type="submit">
        Delete
      </button>
      <transition name="slide">
        <div :class="bem('response')" v-show="response">{{ response }}</div>
      </transition>
    </form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'delete',
  props: ['binId'],
  data: function() {
    return {
      response: '',
    };
  },
  methods: {
    processForm: function() {
      var self = this;
      var binURL = 'https://api.jsonbin.io/v3/b/' + this.binId;
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      const binDeleteOptions = {
        method: 'DELETE',
        url: binURL,
        headers: {
          'X-Master-Key': key,
        },
      };

      axios(binDeleteOptions)
        .then(function(response) {
          // Success!
          self.response = response.data.message;
          self.$emit('removeCard');
        })
        .catch(function(error) {
          console.log('error3: delete error | ' + error);
        })
        .then(function() {
          // always executed
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './delete.scss';
</style>
