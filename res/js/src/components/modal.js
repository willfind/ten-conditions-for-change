let Vue = require("vue/dist/vue.min")

module.exports = Vue.component("modal", {
  props: ["is-visible"],

  methods: {
    onKeydown: function(event){
      let self = this
      if (event.key === "Escape") self.$emit("close")
    },
  },

  template: `
    <div>
      <div class="modal" v-if="isVisible">
        <div class="modal-background" @click="$emit('close')"></div>

        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  `,

  watch: {
    isVisible: function(){
      let self = this

      if (self.isVisible){
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    },
  },

  mounted: function(){
    let self = this
    window.addEventListener("keydown", self.onKeydown)
  },

  beforeDestroy: function(){
    let self = this
    window.removeEventListener("keydown", self.onKeydown)
  }
})
