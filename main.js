import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import noDataPage from '@/component/noDataPage.vue'
Vue.component('noDataPage', noDataPage)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
