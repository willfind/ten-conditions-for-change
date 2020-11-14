let Vue = require("vue/dist/vue.min")
require("./collapsible-section.js")
require("./substep-content.js")

module.exports = Vue.component("substep", {
  props: ["substep", "hrIsThick"],

  data: function(){
    return {
      isExpanded: false,
    }
  },

  template: `
    <collapsible-section :title="substep.title" :icon="substep.icon" :hr-is-thick="hrIsThick" :id="substep.id">
      <substep-content :substep="substep"></substep-content>
    </collapsible-section>
  `,
})
