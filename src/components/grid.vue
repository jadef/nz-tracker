<template>
  <div class="grid__wrapper">
    <card
      :card="card"
      class="grid__card"
      v-for="(card, index) in cards"
      :key="index"
    ></card>
  </div>
</template>

<script>
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

      var req = new XMLHttpRequest();

      req.open('GET', collectionURL, (async = true));
      req.setRequestHeader('Content-Type', 'application/json');
      req.setRequestHeader('X-Master-Key', key);

      req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
          // Success!
          var data = JSON.parse(req.responseText);
          self.getAllCards(data);
        } else {
          console.log('error1: getRecords non-success');
        }
      };

      req.onerror = function() {
        console.log('error1: getRecords onerror');
      };

      req.send();
    },
    getAllCards: function(records) {
      records.forEach(record => this.getCard(record.record));
    },
    getCard: function(id) {
      var self = this;
      var dataURL = 'https://api.jsonbin.io/v3/b/' + id + '/latest';
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';
      var req = new XMLHttpRequest();

      req.open('GET', dataURL, (async = true));
      req.setRequestHeader('Content-Type', 'application/json');
      req.setRequestHeader('X-Master-Key', key);

      req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
          // Success!
          var data = JSON.parse(req.responseText);
          data['record']['id'] = id; // Tack id on for bin visibility

          self.cards.push(data['record']);
        } else {
          console.log('error2: getCard non-success');
        }
      };

      req.onerror = function() {
        console.log('error2: getCard onerror');
      };

      req.send();
    },
  },
  created() {
    this.getRecords();
  },
};
</script>

<style lang="scss" scoped>
// @import "./grid.scss";
</style>
