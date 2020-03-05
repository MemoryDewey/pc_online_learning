import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ELEMENT from 'element-ui'
import {Message} from 'element-ui'
import VueClipboard from 'vue-clipboard2'
// import 'element-ui/lib/theme-chalk/index.css'
import FontAwesomeIcon from "./icons/font-awesome";
import {checkLogin} from './api/passport'

Vue.component('font-awesome-icon', FontAwesomeIcon);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
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
        if (to.meta.requireAuth) {
            if (store.state.loginState) {
                if (to.meta.title) document.title = to.meta.title;
                next();
            } else {
                checkLogin().then((res) => {
                    if (res.code === 1000) {
                        if (to.meta.title) document.title = to.meta.title;
                        next();
                    } else {
                        Message.info('请登录后再进行该操作');
                        next('/');
                    }

                }).catch(() => {
                    next('/');
                });
            }
        } else {
            if (to.meta.title) document.title = to.meta.title;
            next()
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
