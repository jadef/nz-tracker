<template>
<div :id="'card-' + encodeURIComponent(card.name)" class="card__wrapper">
  <div class="card__content">
    <div class="card__action" v-on:click='isOpen = !isOpen' :class="'card__cat--' + card.category" v-bind:style="{ backgroundImage: 'url(' + card.image + ')' }">
      <span class="card__title" :class="{ open: isOpen}">{{ card.name }}</span>
    </div>
    <transition name="slide">
    <div class="card__details" v-show="isOpen">
      <ul class="card__actions">
        <li v-if="card.maps"><a :href="card.maps" class="card__actions--maps" target="_blank">Maps</a></li>
        <li v-if="card.photos"><a :href="card.photos" class="card__actions--photos" target="_blank">Photos</a></li>
        <li v-if="card.doc"><a :href="card.doc" class="card__actions--doc" target="_blank">DOC Link</a></li>
      </ul>
      <div class="card__description" v-html="card.description"></div>
      <div class="card__date" v-on:click='isOpen = !isOpen'>{{ card.date }}</div>
      <div class="card__id">bin id: {{ card.id }}</div>
      <ul v-if="card.relevant" class="card__relevant">
        <li v-for="item in card.relevant"><a class="card__relevant--entry" :href="'#card-' + encodeURIComponent(item)">{{ item }}</a></li>
      </ul>
    </div>
    </transition>
  </div>
  <div class="card__attributes" :class="'card__cat--' + card.category">
    <ul class="card__stats">
      <li v-if="card.activity" class="card__activity" :class="'card__activity--' + card.activity" :title="card.activity">{{ card.activity }}</li>
      <li v-if="card.effort && card.effort != 'na'" class="card__effort" :class="'card__effort--' + card.effort" :title="card.effort">{{ card.effort }}</li>
      <li v-if="card.distance" class="card__distance" :class="'card__distance--' + card.distance" :title="card.distance">{{ card.distance }}</li>
    </ul>
    <ul class="card__modifiers">
      <li class="card__favorite" :class="'card__favorite--' + card.favorite">{{ card.favorite }}</li>
    </ul>
  </div>
</div>
</template>

<script>
module.exports = {
  name: 'card',
  props: ['card'],
  data: function() { return { isOpen: false }}
}
</script>