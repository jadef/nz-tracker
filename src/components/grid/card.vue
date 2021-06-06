<template>
  <div :id="'card-' + encodeURIComponent(card.name)" :class="bem('wrapper')">
    <div :class="bem('content')">
      <div
        :class="bem('start', { cat: card.category })"
        v-on:click="isOpen = !isOpen"
        v-bind:style="{ backgroundImage: 'url(' + card.image + ')' }"
      >
        <span :class="bem('title', { open: isOpen })">
          {{ card.name }}
        </span>
      </div>
      <transition name="slide">
        <div :class="bem('details')" v-show="isOpen">
          <ul :class="bem('actions')">
            <li v-if="card.maps">
              <a
                :class="bem('action', { link: 'maps' })"
                :href="card.maps"
                target="_blank"
                >Maps</a
              >
            </li>
            <li v-if="card.photos">
              <a
                :href="card.photos"
                :class="bem('action', { link: 'photos' })"
                target="_blank"
                >Photos</a
              >
            </li>
            <li v-if="card.doc">
              <a
                :href="card.doc"
                :class="bem('action', { link: 'doc' })"
                target="_blank"
                >DOC Link</a
              >
            </li>
          </ul>
          <div :class="bem('description')" v-html="card.description"></div>
          <div :class="bem('date')" v-on:click="isOpen = !isOpen">
            {{ card.date }}
          </div>
          <div :class="bem('id')">bin id: {{ card.id }}</div>
          <ul v-if="card.relevant" :class="bem('relevant')">
            <li v-for="item in card.relevant">
              <a
                :class="bem('relevant-link')"
                :href="'#card-' + encodeURIComponent(item)"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div :class="bem('attributes', { cat: card.category })">
      <ul :class="bem('stats')">
        <li
          v-if="card.activity"
          :class="bem('activity', { value: card.activity })"
          :title="card.activity"
        >
          {{ card.activity }}
        </li>
        <li
          v-if="card.effort && card.effort != 'na'"
          :class="bem('effort', { value: card.effort })"
          :title="card.effort"
        >
          {{ card.effort }}
        </li>
        <li
          v-if="card.distance"
          :class="bem('distance', { value: card.distance })"
          :title="card.distance"
        >
          {{ card.distance }}
        </li>
      </ul>
      <ul :class="bem('modifiers')">
        <li :class="bem('favorite', { true: card.favorite })">
          {{ card.favorite }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['card'],
  data: function() {
    return { isOpen: false };
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './card.scss';
</style>
