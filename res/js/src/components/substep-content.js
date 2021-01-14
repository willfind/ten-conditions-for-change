let Vue = require("vue/dist/vue.min")
require("./modal.js")
require("./notification.js")
require("./collapsible-section.js")
require("./collapsible-notification.js")

module.exports = Vue.component("substep-content", {
  props: ["substep"],

  data: function(){
    return {
      modalContent: "",
      modalIsVisible: false,
    }
  },

  computed: {
    sortedSubcategoryKeys: function(){
      let self = this
      let out = Object.keys(self.substep.interventions).alphaSort()

      if (out.indexOf("OTHER") > -1){
        let other = out.splice(out.indexOf("OTHER"), 1)[0]
        out.push(other)
      }

      let biases = out.filter(item => item.toUpperCase().includes("BIASES & FALLACIES"))[0]

      if (biases && biases.length > 0){
        biases = out.splice(out.indexOf(biases), 1)[0]
        out.push(biases)
      }

      return out
    },
  },

  methods: {
    getSubcategoryTitle: function(subcategory){
      let self = this
      let obj = self.substep.interventions[subcategory]
      let title = subcategory.toUpperCase()
      let description = obj.description

      let out = `
        <span class="has-font-weight-bold">
          ${ title }
        </span>
      `

      if (title === "BIASES & FALLACIES"){
        out += `
          <span>
            <img src="res/img/noun_Error_1582579.svg" class="img-inline">
          </span>
        `
      }

      if (description){
        out += `
          <span class="has-font-weight-normal">
            - ${ description }
          </span>
        `
      }

      return out.trim()
    },

    getSubcategoryId: function(subcategory){
      let self = this
      let obj = self.substep.interventions[subcategory]
      return obj.id
    },

    getInterventionTitle: function(words){
      words = words.trim()
      let acronyms = ["WOOP"]

      if (acronyms.indexOf(words.toUpperCase()) > -1){
        return words.toUpperCase()
      } else {
        return words.toCapitalized()
      }
    },

    setModalContent: function(source, url){
      let self = this
      if (source.length === 0 && url.length > 0) source = url

      if (url.length > 0){
        self.modalContent = `<a href="${url}" target="_blank">${source}</a>`
      } else {
        self.modalContent = source
      }

      self.modalIsVisible = true
    },

    isAURL: function(text){
      return text.substring(0, 4) === "http"
    },
  },

  template: `
    <div>
      <notification title="Explanation">
        <div v-html="substep.description"></div>
      </notification>

      <notification title="Examples">
        <div v-for="example in substep.examples" class="substep-example">
          <div class="substep-example-icon-container">
            <img :src="example.icon" class="substep-example-icon">
          </div>

          <div v-html="example.description" class="substep-example-description"></div>
        </div>
      </notification>

      <notification title="Question">
        <div class="substep-question" v-html="substep.question"></div>
      </notification>

      <notification title="Behavior Change Strategies">
        <collapsible-section v-for="subcategory in sortedSubcategoryKeys" v-if="subcategory.length > 0" :title="getSubcategoryTitle(subcategory)" otherHeaderClasses="skinny-collapsible-header" :id="getSubcategoryId(subcategory)">
          <ul>
            <li v-for="intervention in substep.interventions[subcategory].interventions" class="li-spaced" :id="intervention.id">
              <b>{{ getInterventionTitle(intervention["METHOD NAME:"]) }}:</b>

              <span v-html="intervention['DESCRIPTION / IMPLEMENTATION STRATEGY:']"></span>

              <span v-if="intervention['SOURCE:'] || intervention['URL:']" class="is-light">
                (<a @click="setModalContent(intervention['SOURCE:'], intervention['URL:'])" class="fake-link">source</a>)
              </span>
            </li>
          </ul>
        </collapsible-section>
      </notification>

      <collapsible-notification title="Relevant Cognitive Biases & Fallacies" v-if="substep.biases && substep.biases.length > 0">
        <collapsible-section v-for="bias in substep.biases" :title="bias.name" otherHeaderClasses="skinny-collapsible-header" :id="bias.id">
          <div v-html="bias.content"></div>

          <p v-if="bias.source && bias.source.length > 0">
            Source:

            <a :href="bias.source" target="_blank" v-if="isAURL(bias.source)">
              {{ bias.source }}
            </a>

            <span v-else v-html="bias.source"></span>
          </p>
        </collapsible-section>
      </collapsible-notification>

      <modal :is-visible="modalIsVisible" @close="modalIsVisible=false">
        <notification title="Source" :has-close-button="true" @close="modalIsVisible=false">
          <div v-html="modalContent"></div>
        </notification>
      </modal>
    </div>
  `,
})
