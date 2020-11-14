let Vue = require("vue/dist/vue.min")
let utils = require("./utils.js")
let radio = utils.radio
let pause = utils.pause
let customScroll = utils.customScroll
let makeKey = utils.makeKey
window.radio = radio
require("./components/substep.js")
require("./components/collapsible-section.js")
require("./components/intervention-search-modal.js")

window.onload = async function(){
  let results = await fetch("data.json")
  let data = await results.json()
  let substepShortTitleToID = {}

  // assign IDs to substeps, interventions, and frameworks
  data.steps.forEach(function(step){
    step.substeps.forEach(function(substep){
      substepShortTitleToID[substep.shortTitle.toLowerCase()] = substep.id
    })
  })

  let app = new Vue({
    el: "#app",

    data: {
      isLoading: true,
      allStepsAreExpanded: false,
      intro: data.intro,
      preface: data.preface,
      steps: data.steps,
      frameworks: data.frameworks,
      interventions: data.interventions,
      interventionSearchModalIsVisible: false,
    },

    methods: {
      expandOrCollapseAll: function(){
        let self = this
        self.allStepsAreExpanded = !self.allStepsAreExpanded
        radio.broadcast("collapsibles-set-is-expanded", self.allStepsAreExpanded)
      },

      goToSubstep: async function(substepShortTitle){
        let self = this
        let id = substepShortTitleToID[substepShortTitle]
        let element = document.getElementById(id)

        await customScroll(0, element.offsetTop, 1000)
        await pause(250)
        radio.broadcast("collapsibles-set-is-expanded", false)
        radio.broadcast("collapsibles-expand-collapsible-section", id)
      },

      setInterventionSearchModalIsVisible: function(value){
        let self = this
        self.interventionSearchModalIsVisible = value
      },
    },

    mounted: function(){
      let self = this
      self.isLoading = false
      document.getElementById("app").style.display = "block"

      let hiddens = document.getElementsByClassName("is-hidden-during-loading")

      for (let i=0; i<hiddens.length; i++){
        hiddens[i].style.display = "block"
      }

      radio.subscribe("go-to-substep", self.goToSubstep)
      radio.subscribe("set-intervention-search-modal-is-visible", self.setInterventionSearchModalIsVisible)
    },

    beforeDestroy: function(){
      let self = this
      radio.unsubscribe("go-to-substep", self.goToSubstep)
      radio.unsubscribe("set-intervention-search-modal-is-visible", self.setInterventionSearchModalIsVisible)
    },
  })
}
