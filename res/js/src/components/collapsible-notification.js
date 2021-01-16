let Vue = require("vue/dist/vue.min")
let CollapsibleSection = require("./collapsible-section.js")

module.exports = Vue.component("collapsible-notification", {
  mixins: [CollapsibleSection],

  template: `
    <div class="notification collapsible-notification" :id="id" :class="{'collapsible-notification-fully-rounded': !isExpanded}">
      <div class="notification-header" @click="isExpanded = !isExpanded">
        <div class="notification-header-left">
          <div class="notification-title">
            <b>{{ title }}</b>
          </div>
        </div>

        <div class="notification-header-right">
          <div class="collapsible-expansion-icon-container" :title="isExpanded ? 'Collapse' : 'Expand'">
            <img :src="isExpanded ? 'res/img/up-arrow.svg' : 'res/img/down-arrow.svg'" class="substep-expansion-icon">
          </div>
        </div>
      </div>

      <transition name="slide">
        <div v-if="isExpanded" class="notification-body">
          <slot></slot>
        </div>
      </transition>
    </div>
  `,
})
