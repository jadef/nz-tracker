<template>
  <div :id="'card-' + encodeURIComponent(card.name)" :class="bem()">
    <div :class="bem('content')">
      <div
        :class="bem('start', { cat: card.category, open: isOpen })"
        v-on:click="isOpen = !isOpen"
        :style="
          card.image ? { backgroundImage: 'url(' + card.image + ')' } : ''
        "
      >
        <span :class="bem('title')">
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

          <div :class="bem('edit')" v-if="editing">
            <delete :binId="card.id" v-on:removeCard="removeCard" />

            <button
              :class="bem('toggle-update', 'small')"
              v-on:click="openUpdate = !openUpdate"
            >
              Update
            </button>
            <transition name="slide">
              <update
                v-show="openUpdate"
                :binId="card.id"
                :activity="card.activity"
                :category="card.category"
                :date="card.date"
                :description="card.description"
                :distance="card.distance"
                :doc="card.doc"
                :effort="card.effort"
                :favorite="card.favorite"
                :image="card.image"
                :maps="card.maps"
                :name="card.name"
                :photos="card.photos"
                :relevant="card.relevant"
              ></update>
            </transition>
          </div>

          <!-- <ul v-if="card.relevant" :class="bem('relevant')">
            <li v-for="item in card.relevant" :key="item.id">
              <a
                :class="bem('relevant-link')"
                :href="'#card-' + encodeURIComponent(item)"
                >{{ item }}</a
              >
            </li>
          </ul> -->
        </div>
      </transition>
    </div>
    <div :class="bem('attributes', { cat: card.category })">
      <div :class="bem('stats')">
        <component
          :is="activityIcon"
          :class="bem('activity', { value: card.activity })"
          :title="card.activity"
        />
        <component
          :is="effortIcon"
          :class="bem('effort', { value: card.effort })"
          :title="card.effort"
        />
        <component
          :is="distanceIcon"
          :class="bem('distance', { value: card.distance })"
          :title="card.distance"
        />
      </div>
      <div :class="bem('modifiers')">
        <component :is="favoriteIcon" :class="bem('favorite')" />
      </div>
    </div>
  </div>
</template>

<script>
import entryDelete from './../controls/delete.vue';
import entryUpdate from './../controls/update.vue';
import * as svgComponents from '../../assets/svg/';

export default {
  name: 'card',
  components: {
    delete: entryDelete,
    update: entryUpdate,
    ...svgComponents,
  },
  data: function() {
    return {
      isOpen: false,
      openUpdate: false,
    };
  },
  props: ['card', 'editing', 'activityOther'],
  methods: {
    removeCard: function() {
      this.$emit('removeCard', this.card.id);
    },
  },
  computed: {
    activityIcon() {
      if (this.card.activity) {
        return 'activity-' + this.card.activity;
      } else {
        return null;
      }
    },
    effortIcon() {
      if (this.card.effort) {
        return 'effort-' + this.card.effort;
      } else {
        return null;
      }
    },
    distanceIcon() {
      if (this.card.distance) {
        return 'distance-' + this.card.distance;
      } else {
        return null;
      }
    },
    favoriteIcon() {
      return 'favorite-' + this.card.favorite;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './card.scss';
</style>
