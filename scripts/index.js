/**
 * index.js
 * - All our useful JS goes here, awesome!
 */


// Init Vue!
var app = new Vue({
  el: '#app',
  components: {
    'grid': httpVueLoader('scripts/grid.vue'),
    'controls': httpVueLoader('scripts/controls.vue')
  },
  data: function() { return { cards: [] }}
}).vu