<template>
  <div :class="bem()">
    <form :class="bem('form')" id="create-bin" @submit.prevent="processForm">
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="name">Name</label>
          <input :class="bem('input')" type="text" name="name" v-model="name" />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="category">Category</label>
          <select
            :class="bem('input')"
            id="category"
            name="category"
            v-model="category"
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
            v-model="image"
          />
        </div>
      </div>
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="activity">Activity</label>
          <select
            :class="bem('input')"
            id="activity"
            name="activity"
            v-model="activity"
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
            v-model="effort"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="asskicking">Ass Kicking</option>
          </select>
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="location">Distance</label>
          <select
            :class="bem('input')"
            id="distance"
            name="distance"
            v-model="distance"
          >
            <option value="walking">Walking</option>
            <option value="drive">Drive</option>
            <option value="long-drive">Long-Drive</option>
            <option value="overnight">Overnight</option>
            <option value="flight">Flight</option>
          </select>
        </div>
      </div>
      <div :class="bem('section')">
        <div :class="bem('field')">
          <label :class="bem('label')" for="maps">Google Maps Link</label>
          <input :class="bem('input')" type="text" name="maps" v-model="maps" />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="photos">Photos Link</label>
          <input
            :class="bem('input')"
            type="text"
            name="photos"
            v-model="photos"
          />
        </div>
        <div :class="bem('field')">
          <label :class="bem('label')" for="doc">DOC (or website)</label>
          <input :class="bem('input')" type="text" name="doc" v-model="doc" />
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
              v-model="favorite"
            />
            <label :class="bem('inlinelabel')" for="favorite2">False</label>
            <input
              :class="bem('inlineinput')"
              type="radio"
              id="favorite2"
              name="favorite"
              value="false"
              v-model="favorite"
            />
          </div>
        </div>
        <div :class="bem('field', { display: 'hidden' })">
          <label :class="bem('label')" for="date">Date</label>
          <input :class="bem('input')" type="date" name="date" v-model="date" />
        </div>

        <div :class="bem('field')">
          <label :class="bem('label')" for="description">Description</label>
          <textarea
            :class="bem('input')"
            type="text"
            name="description"
            v-model="description"
          ></textarea>
        </div>
        <!-- <div :class="bem('field')">
          <label  :class="bem('label')" for="relevant">Relevant</label>
          <input :class="bem('input')" type="text" name="relevant" v-model="relevant" />
        </div> -->
      </div>

      <button :class="bem('submit', { display: 'disabled' })" type="submit">
        Add
      </button>

      <div :class="bem('response')" v-show="response">{{ response }}</div>
    </form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'create',
  data: function() {
    return {
      response: '',
      name: '',
      category: 'forest',
      image: '',
      maps: '',
      photos: '',
      doc: '',
      relevant: [],
      activity: 'hike',
      effort: 'easy',
      distance: 'drive',
      favorite: false,
      description: '',
      date: '',
    };
  },
  methods: {
    processForm: function() {
      var entry = {
        name: this.name,
        category: this.category,
        image: this.image,
        maps: this.maps,
        photos: this.photos,
        doc: this.doc,
        relevant: this.relevant,
        activity: this.activity,
        effort: this.effort,
        distance: this.distance,
        favorite: !!this.favorite,
        description: this.description,
        date: this.date,
      };

      this.submitForm(entry);
    },
    submitForm: function(entry) {
      var self = this;
      var binURL = 'https://api.jsonbin.io/v3/b/';
      var key = '$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa';

      const binGetOptions = {
        method: 'POST',
        url: binURL,
        headers: {
          'content-type': 'application/json',
          'X-Master-Key': key,
          'X-Collection-Id': '5f83f9ee7243cd7e824e36d8',
        },
        data: entry,
      };

      axios(binGetOptions)
        .then(function(response) {
          // Success!
          self.response = 'created bin ' + response.data.metadata.id;
        })
        .catch(function(error) {
          console.log('error4: add error | ' + error);
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
@import './create.scss';
</style>
