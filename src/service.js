const version = '1.0'
const service = {
  getVersion () {
    return version
  }
}
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'service', { value: service })
  }
}
