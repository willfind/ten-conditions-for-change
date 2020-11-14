let Vue = require("vue/dist/vue.min")

module.exports = Vue.component("notification", {
  props: ["icon", "title", "has-close-button"],

  template: `
    <div class="notification">
      <div class="notification-header">
        <div class="notification-header-left">
          <div class="notification-title">
            <b>{{ title }}</b>
          </div>
        </div>

        <div class="notification-header-right">
          <div class="notification-close-button-container" v-if="hasCloseButton">
            <img src="res/img/close.svg" class="notification-close-button" @click="$emit('close')">
          </div>
        </div>
      </div>

      <div class="notification-body">
        <slot></slot>
      </div>
    </div>
  `,
})
