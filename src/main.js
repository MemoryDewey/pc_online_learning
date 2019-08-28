import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ELEMENT from 'element-ui'
import VueClipboard from 'vue-clipboard2'
// import 'element-ui/lib/theme-chalk/index.css'
import VueLazyLoad from 'vue-lazyload'
/* font-awesome 图标库 S*/
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faChevronLeft, faChevronRight, faSearch, faWallet, faCog, faSignOutAlt,
    faAddressCard, faBookOpen, faFileAlt, faTasks, faAward, faEnvelope,
    faInfoCircle, faAngleRight, faLongArrowAltDown, faThLarge, faBook,
    faPlayCircle, faVideo, faCalendarAlt, faFileImage, faFileArchive,
    faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faStar, faCheck,
    faTimes, faPlus, faCheckCircle, faShieldAlt, faMobileAlt, faTimesCircle,
    faUser, faLock, faExchangeAlt, faAngleDoubleUp, faAngleDoubleDown,
    faExclamationCircle, faYenSign, faShareAlt
} from '@fortawesome/free-solid-svg-icons'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
/* font-awesome 图标库 E*/
library.add(
    faChevronRight, faChevronLeft, faSearch, faWallet, faCog, faSignOutAlt,
    faAddressCard, faBookOpen, faFileAlt, faTasks, faAward, faEnvelope,
    faInfoCircle, faAngleRight, faLongArrowAltDown, faThLarge, faBook,
    faPlayCircle, faVideo, faCalendarAlt, faFileImage, faFileArchive,
    faFilePdf, faFilePowerpoint, faFileWord, faFileExcel, faStar, faCheck,
    faTimes, faPlus, faCheckCircle, faShieldAlt, faMobileAlt, faTimesCircle,
    faUser, faLock, faExchangeAlt, faAngleDoubleDown, faAngleDoubleUp,
    faExclamationCircle, faYenSign, faShareAlt
);
Vue.component('font-awesome-icon', FontAwesomeIcon);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueLazyLoad, {
    lazyComponent: true,
    error: require('./assets/image/load-error.jpg')
});
Vue.use({
    install() {
        Vue.prototype.destroy = Vue.prototype.$destroy;
    },
});
Vue.use(ELEMENT);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        from.name ? next({
            name: from.name
        }) : next('/404');
    } else {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
