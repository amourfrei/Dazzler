export const hasProto = '__proto__' in {}

export const inBrowser = typeof window !== 'undefined'

export const UA = inBrowser && window.navigator.userAgent.toLowerCase()

export const isIE = UA && /msie|trident/.test(UA)

export const isIE9 = UA && UA.indexOf('msie 9.0') > 0

export const isEdge = UA && UA.indexOf('edge/') > 0

export const isAndroid = UA && UA.indexOf('android') > 0

export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)

let _isServer

export const isServerRendering = () => {
  if (_isServer === undefined) {
    if (!inBrowser && typeof global !== 'undefined') {
      _isServer = global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}

export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

function isNative(Ctor: Function): boolean {
  return /native code/.test(Ctor.toString)
}

const isNative = require('./is-native')

export const nextTick = (function() {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve()
    var logError = err => {
      console.error(err)
    }
    timeFunc = () => {
      p.then(nextTickHandler).catch(logError)

      if (isIOS) setTimeout(noop)
    }
  } else if (
    (typeof MutationObserver !== 'undefined' && isNative(MutationObserver)) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  ) {
    var counter = 1
    var observer = new MutationObserver(nextTickHandler)
    var textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true,
    })
    timerFunc = () => {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  } else {
    timerFunc = () => {
      setTimeout(nextTickHandler, 0)
    }
  }

    return function queueNextTick(cb?: Function, ctx?: Object) {
      let _resolve
      callbacks.push(() => {
        if (cb) cb.call(ctx)
        if (_resolve) _resolve(ctx)
      })
      if (!pending) {
        pending = true
        timerFunc()
      }
    }
})()

let _Set

if (typeof Set !== 'undefined' && isNative(Set)) {
  _Set = Set
} else {
  _Set = class Set {
    set: Object
    constructor() {
      this.set = Object.create(null)
    }

    has(key: string | number) {
      return this.set[key] === true
    }
    add(key: string | number) {
      this.set[key] = true
    }
    clear() {
      this.set = Object.create(null)
    }
  }
}

export { _Set }
