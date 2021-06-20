<template>
  <div :class="bem()">
    <transition name="fade-out" duration="1500">
      <div v-if="loadingMain" :class="bem('loading-main')">
        <p :class="bem('loading')">Loading</p>
      </div>
    </transition>

    <card
      :class="bem('card')"
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :editing="editing"
      v-on:removeCard="removeCard"
      v-on:updateCard="updateCard"
    ></card>

    <div
      :class="bem('loading-card')"
      v-for="(loadingCard, loadingIndex) in loadingCards"
      :key="loadingIndex"
    >
      <div :class="bem('loading-content')">
        <p :class="bem('loading')">Card Loading</p>
      </div>
      <div :class="bem('loading-attributes')"></div>
    </div>

    <div v-if="records.length >= 10" :class="bem('pagination')">
      <button v-on:click="getRecords(records.slice(-1)[0].record)">
        Get more
      </button>
    </div>
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
    return {
      loadingMain: true,
      loadingCards: [],
      records: [],
      cards: [],
    };
  },
  props: ['additionalCard', 'editing'],
  watch: {
    additionalCard: function() {
      this.getCard(this.additionalCard);
    },
  },
  methods: {
    getRecords: function(lastBin) {
      var self = this;
      // This fetches json data from my stored collection
      var collectionURL =
        'https://api.jsonbin.io/v3/c/5f83f9ee7243cd7e824e36d8/bins';
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';
      // For pagination
      if (lastBin) {
        collectionURL = collectionURL + '/' + lastBin;
      }
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
          self.records = response.data;
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
      let cards = records.map((record) => {
        return new Promise((resolve) => {
          this.getCard(record.record);
          resolve();
        });
      });

      Promise.all(cards).then((value) => {
        this.loadingMain = false;
        this.loadingCards = value;
      });

      // records.forEach((record) => this.getCard(record.record));
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
          self.loadingCards = self.loadingCards.slice(1);
        });
    },
    removeCard: function(id) {
      this.cards = this.cards.filter(function(obj) {
        return obj.id !== id;
      });
    },
    updateCard: function(data) {
      var cardData = data.record;
      cardData['id'] = data.metadata.parentId; // Tack id on for bin visibility
      // Find and replace the exact card data

      var index = this.cards.findIndex((x) => x.id === data.metadata.parentId);
      this.cards[index] = cardData;

      console.log(
        "TODO: this doesn't actually refresh the card, though we've updated the card in cards. Need to fix"
      );
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
