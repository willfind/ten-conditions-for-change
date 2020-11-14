let Vue = require("vue/dist/vue.min")
let utils = require("../utils.js")
let radio = utils.radio

module.exports = Vue.component("collapsible-section", {
  props: ["title", "icon", "hrIsThick", "otherHeaderClasses", "id"],

  data: function(){
    return {
      isExpanded: false,
    }
  },

  watch: {
    isExpanded: function(){
      let self = this
      self.$emit(self.isExpanded ? "expanded" : "collapsed")
    },
  },

  template: `
    <div :id="id">
      <hr :class="hrIsThick ? 'thick' : ''">

      <div class="collapsible-header" :class="otherHeaderClasses" @click="isExpanded = !isExpanded">
        <div class="collapsible-header-left">
          <img :src="icon" class="collapsible-header-icon" v-if="icon">
          <h3 class="collapsible-title" v-html="title"></h3>
        </div>

        <div class="collapsible-header-right">
          <div class="collapsible-expansion-icon-container" :title="isExpanded ? 'Collapse' : 'Expand'">
            <img :src="isExpanded ? 'res/img/up-arrow.svg' : 'res/img/down-arrow.svg'" class="substep-expansion-icon">
          </div>
        </div>
      </div>

      <transition name="slide">
        <div v-if="isExpanded" class="substep-content">
          <slot></slot>
        </div>
      </transition>
    </div>
  `,

  methods: {
    onExpandCollapsibleSection: function(id){
      if (typeof(id) === "undefined" || id === null) return
      let self = this
      if (self.id === id) self.setIsExpanded(true)
    },

    setIsExpanded: function(value){
      let self = this
      self.isExpanded = value
    },
  },

  mounted: function(){
    let self = this
    radio.subscribe("collapsibles-set-is-expanded", self.setIsExpanded)
    radio.subscribe("collapsibles-expand-collapsible-section", self.onExpandCollapsibleSection)
  },

  beforeDestroy: function(){
    let self = this
    radio.unsubscribe("collapsibles-set-is-expanded", self.setIsExpanded)
    radio.unsubscribe("collapsibles-expand-collapsible-section", self.onExpandCollapsibleSection)
  },
})
