;(function() {
  var toStr = Object.prototype.toString
  var fnToStr = Function.prototype.toString
  var reHostCtor = /^\[object .+?Constructor\]$/
  var reNative = RegExp(
    '^' +
      String(toStr)
        .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
        .replace(/toStr|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
      '$'
  )

  function isNative(value) {
    var type = typeof value
    return type == 'function'
      ? reNative.test(fnToStr.call(value))
      : (value && type == 'object' && reHostCtor.test(toString.call(value))) ||
          false
  }

  module.exports = isNative
})()
