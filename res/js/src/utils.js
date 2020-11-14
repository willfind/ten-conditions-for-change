String.prototype.toCapitalized = function(){
  return this.substring(0, 1).toUpperCase() + this.substring(1, this.length).toLowerCase()
}

Array.prototype.alphaSort = function(){
  return this.sort(function(a, b){
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}

let radio = {
  subscriptions: [],

  subscribe: function(channel, callback){
    let self = this
    if (!self.subscriptions[channel]) self.subscriptions[channel] = []
    self.subscriptions[channel].push(callback)
    return self
  },

  unsubscribe: function(channel, callback){
    let self = this
    self.subscriptions[channel].splice(self.subscriptions[channel].indexOf(callback), 1)
    return self
  },

  broadcast: function(channel, payload){
    let self = this

    self.subscriptions[channel].forEach(function(callback){
      callback(payload)
    })

    return self
  },
}

function pause(ms){
  return new Promise(function(resolve, reject){
    try {
      setTimeout(resolve, ms)
    } catch(e){
      return reject(e)
    }
  })
}

function lerp(a, b, f){
  return f * (b - a) + a
}

function sigmoid(x){
  return 1 / (1 + Math.exp(8 - 16 * x))
}

let flashInterval

function flash(target, iterations){
  return new Promise(function(resolve, reject){
    try {
      let r = 159
      let g = 197
      let b = 232
      let counter = 0

      if (flashInterval) clearInterval(flashInterval)

      flashInterval = setInterval(function(){
        r = lerp(159, 0, counter / 90)
        g = lerp(197, 0, counter / 90)
        b = lerp(232, 0, counter / 90)

        target.style.color = `rgb(${r}, ${g}, ${b})`
        counter++

        if (counter > iterations){
          target.style.color = "black"
          clearInterval(flashInterval)
          flashInterval = null
          return resolve()
        }
      }, 1000/60)
    } catch(e){
      return reject(e)
    }
  })
}

let customScrollInterval

function customScroll(x, y, ms){
  return new Promise(function(resolve, reject){
    try {
      let startX = window.scrollX
      let startY = window.scrollY
      let frame = 1000 / 60
      let counter = 0
      let counterMax = ms / frame

      if (customScrollInterval) clearInterval(customScrollInterval)

      customScrollInterval = setInterval(function(){
        let currentX = lerp(startX, x, sigmoid(counter / counterMax))
        let currentY = lerp(startY, y, sigmoid(counter / counterMax))
        window.scroll(currentX, currentY)
        counter++

        if (sigmoid(counter / counterMax) > 0.99){
          clearInterval(customScrollInterval)
          customScrollInterval = null
          window.scroll(x, y)
          return resolve()
        }
      }, frame)
    } catch(e){
      return reject(e)
    }
  })
}

function makeKey(n){
  let alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i=0; i<n; i++) out += alpha[Math.floor(Math.random() * alpha.length)]
  return out
}

module.exports = {
  radio,
  pause,
  lerp,
  sigmoid,
  flash,
  customScroll,
  makeKey,
}
