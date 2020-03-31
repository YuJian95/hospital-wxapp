import Vue from 'vue'
import App from './App'

import filters from '@/common/js/filters.js'
for (let item in filters) {
  Vue.filter(item, filters[item])
}
Vue.config.productionTip = false

import noDataPage from '@/component/noDataPage.vue'
Vue.component('noDataPage', noDataPage)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
