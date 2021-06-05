import Vue from "vue";
// import App from "./index.vue";

// Vue.config.productionTip = true;

// new Vue({
//   render: h => h(App)
// }).$mount("#app");


// Init Vue!
var app = new Vue({
  el: '#app',
  components: {
    'grid': httpVueLoader('components/grid.vue'),
    'controls': httpVueLoader('components/controls.vue')
  },
  data: function() { return { cards: [] }}
}).vu
