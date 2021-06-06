import Vue from 'vue';
import App from './index.vue';
import bemPlugin from 'vue-bem-cn';

Vue.use(bemPlugin, { methodName: 'bem' });

new Vue({
  el: '#app',
  render: (h) => h(App),
});
