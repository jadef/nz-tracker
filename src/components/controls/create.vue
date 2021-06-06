<template>
<div :class="bem('wrapper')">
  <form id="create-bin" @submit.prevent="processForm">

    <div :class="bem('field')">
      <label :class="bem('label')" for="name">Name</label>
      <input :class="bem('input')" type="text" name="name" v-model="name" />
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="category">Category</label>
      <select :class="bem('input')" id="category" name="category" v-model="category">
        <option value="forest">Forest</option>
        <option value="beach">Beach</option>
        <option value="town">Town</option>
      </select>
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="image">Background Image (filename)</label>
      <input :class="bem('input')" type="text" name="image" v-model="image" />
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="maps">Google Maps Link</label>
      <input :class="bem('input')" type="text" name="maps" v-model="maps" />
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="photos">Photos Link</label>
      <input :class="bem('input')" type="text" name="photos" v-model="photos" />
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="doc">DOC (or website) Link</label>
      <input :class="bem('input')" type="text" name="doc" v-model="doc" />
    </div>
    <div :class="bem('field')">
      <label  :class="bem('label')" for="relevant">Relevant</label>
      <input :class="bem('input')" type="text" name="relevant" v-model="relevant" />
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="activity">Activity</label>
      <select :class="bem('input')" id="activity" name="activity" v-model="activity">
        <option value="lounge">Lounge</option>
        <option value="hike">Hike</option>
        <option value="backpack">Backpack</option>
        <option value="social">Social</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="effort">Effort</label>
      <select :class="bem('input')" id="effort" name="effort" v-model="effort">
        <option value="na">N/A</option>
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="hard">Hard</option>
        <option value="asskicking">Ass Kicking</option>
      </select>
    </div>
    <div :class="bem('field')">
      <label :class="bem('label')" for="location">Distance</label>
      <select :class="bem('input')" id="distance" name="distance" v-model="distance">
        <option value="walking">Walking</option>
        <option value="drive">Drive</option>
        <option value="long-drive">Long-Drive</option>
        <option value="overnight">Overnight</option>
        <option value="flight">Flight</option>
      </select>
    </div>

    <div :class="bem('field')">
      <div :class="bem('label')">Favorite</div>
      <div :class="bem('input')">
        <label :class="bem('inlinelabel')" for="favorite1">True</label>
        <input :class="bem('inlineinput')" type="radio" id="favorite1" name="favorite" value="true" v-model="favorite" />
        <label :class="bem('inlinelabel')" for="favorite2">False</label>
        <input :class="bem('inlineinput')" type="radio" id="favorite2" name="favorite" value="false" v-model="favorite" />
      </div>
    </div>

    <div :class="bem('field')">
      <label :class="bem('label')" for="description">Long Description</label>
      <textarea :class="bem('input')" type="text" name="description" v-model="description" /></textarea>
    </div>
    <div :class="bem('field', { display: 'hidden'})">
      <label :class="bem('label')" for="date">Date</label>
      <input :class="bem('input')" type="date" name="date" v-model="date" />
    </div>

    <button :class="bem('submit', { display: 'disabled'})"  type="submit">Add</button>

    <div :class="bem('response')" v-show="response">{{ response }}</div>
  </form>
</div>
</template>

<script>
export default {
  name: "create",
  data: function () {
    return {
      response: "",
      name: "",
      category: "",
      image: "",
      maps: "",
      photos: "",
      doc: "",
      relevant: [],
      description: "",
      date: "",
      activity: "",
      effort: "",
      distance: "",
      favorite: false,
      beenthere: false,
    };
  },
  methods: {
    processForm: function () {
      var entry =
        '{ "name": "' +
        this.name +
        '", "category": "' +
        this.category +
        '", "image": "' +
        this.image +
        '", "maps": "' +
        this.maps +
        '", "photos": "' +
        this.photos +
        '", "doc": "' +
        this.doc +
        '", "relevant": ' +
        this.relevant +
        ', "description": "' +
        this.description +
        '", "date": "' +
        this.date +
        '", "activity": "' +
        this.activity +
        '", "effort": "' +
        this.effort +
        '", "distance": "' +
        this.distance +
        '", "favorite": ' +
        this.favorite +
        ', "beenthere": ' +
        this.beenthere +
        " }";

      this.submitForm(entry);
    },
    submitForm: function (entry) {
      var self = this;
      var dataURL = "https://api.jsonbin.io/b";
      var key = "$2b$10$1HxaV7JvegP8jrtYL4U3dOH6IsQVCoiK7bNGrgHLYV2J7LAcPpKWa";

      let req = new XMLHttpRequest();

      req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          var data = JSON.parse(req.responseText);
          console.log(data);
          self.response = "created bin " + data.id;
        }
      };

      req.open("POST", dataURL, true);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("collection-id", "5f83f9ee7243cd7e824e36d8");
      req.setRequestHeader("secret-key", key);
      req.send(entry);

      req.onerror = function () {
        console.log("error4: add onerror");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import './../../scss/elements/variables.scss';
@import "./create.scss";
</style>
