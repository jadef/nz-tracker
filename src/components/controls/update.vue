<template>
  <div :class="bem()">
    <form :class="bem('form')" @submit.prevent="processForm">
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="name">Name</label>
          <input
            :class="bem('input')"
            type="text"
            name="name"
            v-model="updateName"
          />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="category">Category</label>
          <select
            :class="bem('input')"
            id="category"
            name="category"
            v-model="updateCategory"
          >
            <option value="forest">Forest</option>
            <option value="beach">Beach</option>
            <option value="town">Town</option>
          </select>
        </div>

        <div :class="bem('field')">
          <label :class="bem('label')" for="image"
            >Background Image (filename)</label
          >
          <input
            :class="bem('input')"
            type="text"
            name="image"
            v-model="updateImage"
          />
        </div>
      </div>
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="location">Distance</label>
          <select
            :class="bem('input')"
            id="distance"
            name="distance"
            v-model="updateDistance"
          >
            <option value="walking">Walking</option>
            <option value="drive">Drive</option>
            <option value="long-drive">Long-Drive</option>
            <option value="overnight">Overnight</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="activity">Activity</label>
          <select
            :class="bem('input')"
            id="activity"
            name="activity"
            v-model="updateActivity"
          >
            <option value="lounge">Lounge</option>
            <option value="hike">Hike</option>
            <option value="backpack">Backpack</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="effort">Effort</label>
          <select
            :class="bem('input')"
            id="effort"
            name="effort"
            v-model="updateEffort"
          >
            <option value="na">N/A</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="asskicking">Ass Kicking</option>
          </select>
        </div>
      </div>
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="maps">Google Maps Link</label>
          <input
            :class="bem('input')"
            type="text"
            name="maps"
            v-model="updateMaps"
          />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="photos">Photos Link</label>
          <input
            :class="bem('input')"
            type="text"
            name="photos"
            v-model="updatePhotos"
          />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="doc">DOC (or website)</label>
          <input
            :class="bem('input')"
            type="text"
            name="doc"
            v-model="updateDoc"
          />
        </div>
      </div>
      <div :class="bem('section')">
        <div :class="bem('field')">
          <div :class="bem('label')">Favorite</div>
          <div :class="bem('input', { type: 'radio' })">
            <label :class="bem('inlinelabel')" for="favorite1">True</label>
            <input
              :class="bem('inlineinput')"
              type="radio"
              id="favorite1"
              name="favorite"
              value="true"
              v-model="updateFavorite"
            />
            <label :class="bem('inlinelabel')" for="favorite2">False</label>
            <input
              :class="bem('inlineinput')"
              type="radio"
              id="favorite2"
              name="favorite"
              value="false"
              v-model="updateFavorite"
            />
          </div>
        </div>
        <div :class="bem('field', { display: 'hidden' })">
          <label :class="bem('label')" for="date">Date</label>
          <input
            :class="bem('input')"
            type="date"
            name="date"
            v-model="updateDate"
          />
        </div>

        <div :class="bem('field')">
          <label :class="bem('label')" for="description">Description</label>
          <textarea
            :class="bem('input')"
            type="text"
            name="description"
            v-model="updateDescription"
          ></textarea>
        </div>
        <!-- <div :class="bem('field')">
          <label  :class="bem('label')" for="relevant">Relevant</label>
          <input :class="bem('input')" type="text" name="relevant" v-model="relevant" />
        </div> -->
      </div>

      <button :class="bem('submit')" type="submit">
        Save
      </button>

      <transition name="slide">
        <div :class="bem('response', 'form-response')" v-show="response">
          {{ response }}
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'update',
  data: function() {
    return {
      response: '',
      updateName: this.name,
      updateCategory: this.category,
      updateImage: this.image,
      updateMaps: this.maps,
      updatePhotos: this.photos,
      updateDoc: this.doc,
      updateActivity: this.activity,
      updateEffort: this.effort,
      updateDistance: this.distance,
      updateFavorite: this.favorite,
      updateDescription: this.description,
      updateDate: this.date,
    };
  },
  props: [
    // 'card',
    'name',
    'category',
    'image',
    'maps',
    'photos',
    'doc',
    'relevant',
    'activity',
    'effort',
    'distance',
    'favorite',
    'description',
    'date',
    'binId',
  ],
  methods: {
    processForm: function() {
      var entry = {
        name: this.updateName,
        category: this.updateCategory,
        image: this.updateImage,
        maps: this.updateMaps,
        photos: this.updatePhotos,
        doc: this.updateDoc,
        relevant: this.updateRelevant,
        activity: this.updateActivity,
        effort: this.updateEffort,
        distance: this.updateDistance,
        favorite: !!this.updateFavorite,
        description: this.updateDescription,
        date: this.updateDate,
      };

      this.submitForm(entry);
    },
    submitForm: function(entry) {
      var self = this;
      var binURL = 'https://api.jsonbin.io/v3/b/' + this.binId;
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      const binPostOptions = {
        method: 'PUT',
        url: binURL,
        headers: {
          'content-type': 'application/json',
          'X-Master-Key': key,
          'X-Bin-Versioning': false,
        },
        data: entry,
      };

      axios(binPostOptions)
        .then(function(response) {
          // Success!
          self.response = response.data.record.name + ' updated!';
          self.$emit('updateCard', response.data);
        })
        .catch(function(error) {
          console.log('error5: update error | ' + error);
        })
        .then(function() {
          // always executed
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import './update.scss';
</style>
