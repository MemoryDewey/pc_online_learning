import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        effectiveTime: '',
        loginState: false,
        avatarUrl: '',
        nickname: '',
        isTeacher: false
    },
    mutations: {
        login: (state, payload) => {
            state.isTeacher = payload.level === 1;
            state.loginState = true;
        },
        exit: state => {
            localStorage.removeItem('token');
            state.loginState = false;
        },
        changeAvatarUrl: (state, payload) => {
            state.avatarUrl = payload;
        },
        changeNickname: (state, payload) => {
            state.nickname = payload;
        }
    }
})
