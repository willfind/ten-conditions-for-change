let Vue = require("vue/dist/vue.min")
let lunr = require("lunr")
let gt = require("gt-helpers")
let utils = require("../utils.js")
let radio = utils.radio
let pause = utils.pause
let flash = utils.flash
let customScroll = utils.customScroll
require("./modal.js")
require("./notification.js")
let searchWorker
let waitInterval

module.exports = Vue.component("intervention-search-modal", {
  props: ["is-visible", "steps", "frameworks"],

  template: `
    <div>
      <div class="show-search-results-button" v-if="shouldShowFloatingButton">
        <button class="button is-small button-tight button-dark" @click="showInterventionSearchModal">
          <img src="res/img/search-light.svg" class="img-inline">
          BACK TO SEARCH
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img class="img-inline" src="res/img/close-light.svg" @click.prevent.stop="shouldShowFloatingButton = false">
        </button>
      </div>

      <modal :is-visible="isVisible" @close="$emit('close')">
        <notification title="Behavior Change Strategy Search" :has-close-button="true" @close="$emit('close')">
          <form @submit.prevent="search">
            <div class="columns is-visible-desktop">
              <div class="column is-10">
                <input class="input is-fullwidth" type="text" placeholder="Type words here (e.g., reinforcement, reminder, commitment, recovery, etc.)" ref="searchBox1" v-model="query">
              </div>

              <div class="column is-2 has-text-right">
                <input type="submit" value="Search" class="button is-fullwidth">
              </div>
            </div>

            <div class="is-visible-mobile">
              <p style="margin-bottom: 0.25rem;">
                <input class="input is-fullwidth" type="text" placeholder="Type words here..." ref="searchBox2" v-model="query">
              </p>

              <p>
                <input type="submit" :value="isReady ? 'Search' : 'Loading...'" class="button is-fullwidth" :disabled="!isReady">
              </p>
            </div>
          </form>

          <div class="search-results-container">
            <div class="search-result" v-for="result in results" v-if="results.length > 0" @click="goto(result)">
              <span v-if="result.resultType === 'intervention'">
                <b>{{ result.methodName }}:</b>
                <span v-html="result.descriptionImplementationStrategy"></span>

                <span class="chip" :class="{'is-orange': result.color === 'orange', 'is-green': result.color === 'green', 'is-purple': result.color === 'purple'}" @click="goto(result)">
                  <img class="img-inline" :src="'res/img/' + result.substep.toLowerCase() + '.png'">

                  &nbsp;

                  {{ result.tenConditionsForChange.toUpperCase() }}

                  /

                  {{ result.tenConditionsForChangeSubcategory }}

                  &nbsp;

                  <img class="img-inline" src="res/img/single-arrow.png">
                </span>
              </span>

              <span v-if="result.resultType === 'framework'">
                <b>{{ result.title }}:</b>

                <span class="chip is-gray" @click="goto(result)">
                  {{ result.title }}

                  &nbsp;

                  <img class="img-inline" src="res/img/single-arrow.png">
                </span>
              </span>

              <span v-if="result.resultType === 'bias'">
                <b>{{ result.title.toUpperCase() }}:</b>

                <span v-html="result.description"></span>

                <span class="chip" :class="{'is-orange': result.color === 'orange', 'is-green': result.color === 'green', 'is-purple': result.color === 'purple'}" @click="goto(result)">
                  <img class="img-inline" :src="'res/img/' + result.condition.toLowerCase() + '.png'">

                  &nbsp;

                  {{ result.condition.toUpperCase() }}

                  /

                  BIASES & FALLACIES

                  &nbsp;

                  <img class="img-inline" src="res/img/single-arrow.png">
                </span>
              </span>
            </div>

            <div v-if="results.length === 0 && hasPerformedAtLeastOneSearch">
              No results.
            </div>
          </div>
        </notification>
      </modal>
    </div>
  `,

  data: function(){
    return {
      query: "",
      results: [],
      lunrIndex: null,
      hasPerformedAtLeastOneSearch: false,
      shouldShowFloatingButton: false,
      pool: [],
      isReady: false,
    }
  },

  watch: {
    isVisible: function(){
      let self = this
      if (!self.isVisible) return
      self.focus()
    },
  },

  methods: {
    showInterventionSearchModal: function(){
      radio.broadcast("set-intervention-search-modal-is-visible", true)
    },

    focus: function(){
      let self = this

      let interval = setInterval(function(){
        if (!self.$refs.searchBox1 && !self.$refs.searchBox2) return
        clearInterval(interval)
        let box = window.innerWidth >= 768 ? self.$refs.searchBox1 : self.$refs.searchBox2
        box.focus()
        box.select()
      }, 100)
    },

    search: function(){
      let self = this

      if (waitInterval) clearInterval(waitInterval)

      waitInterval = setInterval(function(){
        if (!self.isReady) return
        clearInterval(waitInterval)

        if (self.query.length === 0){
          Vue.set(self, "results", [])
          return
        }

        self.hasPerformedAtLeastOneSearch = true
        self.shouldShowFloatingButton = true

        searchWorker.postMessage({
          message: "search",
          query: self.query,
        })
      }, 100)
    },

    handleSearchWorkerOnMessage: function(event){
      let self = this
      let data = event.data

      if (data.message === "ready"){
        self.isReady = true
      } else if (data.message === "results"){
        Vue.set(self, "results", data.results)
        self.focus()
      }
    },

    goto: async function(result){
      window.dispatchEvent(new KeyboardEvent("keydown", {
        pageX: 0,
        pageY: 0,
        key: "Escape",
      }))

      let offset = 0
      radio.broadcast("collapsibles-set-is-expanded", false)
      await pause(100)

      if (result.resultType === "intervention"){
        radio.broadcast("collapsibles-expand-collapsible-section", result.substepid)
        await pause(100)
        radio.broadcast("collapsibles-expand-collapsible-section", result.subcategoryid)
        await pause(100)
        offset = window.innerHeight / 3
      } else if (result.resultType === "framework"){
        radio.broadcast("collapsibles-expand-collapsible-section", result.id)
        await pause(100)
        offset = window.innerHeight / 8
      } else if (result.resultType === "bias"){
        radio.broadcast("collapsibles-expand-collapsible-section", result.substepid)
        await pause(100)
        radio.broadcast("collapsibles-expand-collapsible-section", result.biasesContainerID)
        await pause(100)
        radio.broadcast("collapsibles-expand-collapsible-section", result.id)
        await pause(100)
        offset = window.innerHeight / 8
      }

      let interval = setInterval(async function(){
        let target = document.getElementById(result.id)
        if (!target) return
        clearInterval(interval)

        await customScroll(0, target.offsetTop - offset, 1000)
        await pause(250)

        await flash(target, 45)
        await flash(target, 90)
      }, 10)
    },
  },

  mounted: function(){
    let self = this

    if (!searchWorker){
      searchWorker = new Worker("search-worker.js")
      searchWorker.postMessage({message: "load"})
      searchWorker.onmessage = self.handleSearchWorkerOnMessage
    }
  },
})
