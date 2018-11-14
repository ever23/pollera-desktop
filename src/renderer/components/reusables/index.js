import Vue from 'vue'
const files = require.context('.', false, /\.vue$/)
const modules = {}

files.keys().forEach(key => {
 // if (key === './index.js') return
  	Vue.component(files(key).default.name,files(key).default);
})

