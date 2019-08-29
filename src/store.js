import Vue from 'vue'
import Vuex from 'vuex'
import getWeb3 from './utils/getWeb3'
import getContract from './utils/getContract'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        effectiveTime: '',
        loginState: false,
        avatarUrl: '',
        nickname: '',
        isTeacher: false,
        web3: {
            isInjected: false,
            web3Instance: null,
            networkId: null,
            coinbase: null,
            balance: null,
            error: null
        },
        contractInstance: null,
    },
    mutations: {
        login: (state, payload) => {
            state.isTeacher = payload.level === 1;
            state.loginState = true;
        },
        exit: state => {
            state.loginState = false;
        },
        changeAvatarUrl: (state, payload) => {
            state.avatarUrl = payload;
        },
        changeNickname: (state, payload) => {
            state.nickname = payload;
        },
        registerWeb3Instance(state, payload) {
            console.log('commited result to registerWeb3Instance mutation');
            let result = payload;
            console.log(result);
            let web3Copy = state.web3;
            web3Copy.coinbase = result.coinbase;
            web3Copy.networkId = result.networkId;
            web3Copy.isInjected = result.injectedWeb3;
            web3Copy.web3Instance = result.web3;
            state.web3 = web3Copy;
            // pollWeb3();
        },
        pollWeb3Instance(state, payload) {
            console.log('commited result to pollWeb3Instance mutation, coinbase: ' + payload.coinbase);
            state.web3.coinbase = payload.coinbase;
        },
        registerContractInstance(state, payload) {
            console.log('Casino contract instance: ', payload);
            state.contractInstance = () => payload[0]
        },
    },
    actions: {
        registerWeb3({commit}) {
            console.log('registerWeb3 Action being executed');
            getWeb3.then(result => {
                console.log('committing result to registerWeb3Instance mutation');
                commit('registerWeb3Instance', result)
            }).catch(e => {
                console.log('error in action registerWeb3', e)
            })
        },
        pollWeb3({commit}, payload) {
            commit('pollWeb3Instance', payload)
        },
        getContractInstance({commit}) {
            getContract.then(result => {
                commit('registerContractInstance', result)
            }).catch(e => console.log(e))
        },
    }
})
