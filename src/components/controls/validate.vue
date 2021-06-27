<template>
  <div :class="bem()">
    <form :class="bem('form')" @submit.prevent="validateAnswer">
      <div :class="bem('field')">
        <label :class="bem('label')" for="answer">{{ choice.question }}</label>
        <span :class="bem('spacer')"> : </span>
        <input
          :class="bem('input')"
          type="password"
          name="answer"
          v-model="answer"
        />
      </div>

      <button :class="bem('submit')" type="submit">
        Submit
      </button>

      <transition name="slide">
        <div :class="bem('response', 'form-response')" v-show="response">
          {{ response }}
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'validate',
  data: function() {
    return {
      response: '',
      choice: {},
      answer: '',
    };
  },
  methods: {
    retrieveEntry: function() {
      var self = this;
      var binURL = 'https://api.jsonbin.io/v3/b/60d7b8458a4cd025b7a675c3';
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      const binGetOptions = {
        method: 'GET',
        url: binURL,
        headers: {
          'content-type': 'application/json',
          'X-Master-Key': key,
        },
      };

      axios(binGetOptions)
        .then(function(response) {
          // Success!
          self.chooseQuestion(response.data.record);
        })
        .catch(function(error) {
          console.log('error6: validate get error | ' + error);
        })
        .then(function() {
          // always executed
        });
    },
    chooseQuestion: function(data) {
      var max = Math.floor(data.length);
      var choice = Math.floor(Math.random() * max);
      this.choice = data[choice];
    },
    validateAnswer: function() {
      if (this.answer.toLowerCase() === this.choice.answer) {
        // Success
        this.response = 'Success!';
        this.$emit('validated');
      } else {
        this.response = 'Incorrect!';
      }
    },
  },
  beforeMount: function() {
    this.retrieveEntry();
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './validate.scss';
</style>
