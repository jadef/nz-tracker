<template>
  <div :class="bem('wrapper')">
    <form id="delete-bin" @submit.prevent="processForm">
      <div :class="bem('field')" v-show="false">
        <label :class="bem('label')" for="bin-id">Bin ID</label>
        <input
          :class="bem('input')"
          type="text"
          name="bin-id"
          v-model="binId"
        />
      </div>

      <button :class="bem('submit', { size: 'small' })" type="submit">
        Delete
      </button>

      <div :class="bem('response')" v-show="response">{{ response }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'delete',
  props: ['binId'],
  data: function() {
    return {
      response: '',
      binId: '',
    };
  },
  methods: {
    processForm: function() {
      var self = this;
      var dataURL = 'https://api.jsonbin.io/b/' + this.binId;
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          var data = JSON.parse(req.responseText);
          console.log(data);
          self.response = data.message;
        }
      };

      req.open('DELETE', dataURL, true);
      req.setRequestHeader('secret-key', key);
      req.send();

      req.onerror = function() {
        console.log('error3: delete onerror');
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './delete.scss';
</style>
