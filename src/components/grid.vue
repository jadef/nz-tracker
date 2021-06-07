<template>
  <div :class="bem('wrapper')">
    <card
      :card="card"
      :class="bem('card')"
      v-for="(card, index) in cards"
      :key="index"
    ></card>
  </div>
</template>

<script>
const axios = require('axios');
import card from './grid/card.vue';

export default {
  name: 'grid',
  components: {
    card: card,
  },
  data: function() {
    return { cards: [] };
  },
  methods: {
    getRecords: function() {
      var self = this;
      // This fetches json data from my stored collection
      var collectionURL =
        'https://api.jsonbin.io/v3/c/5f83f9ee7243cd7e824e36d8/bins';
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      const collectionGetOptions = {
        method: 'GET',
        url: collectionURL,
        headers: {
          'content-type': 'application/json',
          'X-Master-Key': key,
        },
      };

      axios(collectionGetOptions)
        .then(function(response) {
          // Success!
          self.getAllCards(response.data);
        })
        .catch(function(error) {
          console.log('error1: getRecords non-success | ' + error);
        })
        .then(function() {
          // always executed
        });
    },
    getAllCards: function(records) {
      records.forEach((record) => this.getCard(record.record));
    },
    getCard: function(id) {
      var self = this;
      var binURL = 'https://api.jsonbin.io/v3/b/' + id + '/latest';
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
          var data = response.data.record;
          data['id'] = id; // Tack id on for bin visibility

          self.cards.push(data);
        })
        .catch(function(error) {
          console.log('error2: getCard non-success | ' + error);
        })
        .then(function() {
          // always executed
        });
    },
  },
  created() {
    this.getRecords();
  },
};
</script>

<style lang="scss" scoped>
@import './../scss/elements/variables.scss';
@import './grid.scss';
</style>
