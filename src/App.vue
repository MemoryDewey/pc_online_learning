<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import state from "./store";

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                activeIndex: '1',
            }
        },
        async beforeCreate() {
            if (!this.$store.state.web3.web3Instance) {
                await this.$store.dispatch('registerWeb3');
                await this.$store.dispatch('getContractInstance');
            }
        },

        computed: mapState({
            contractInstance: state => state.contractInstance,
            coinbase: state => state.web3.coinbase,
        })
    }
</script>
<style lang="less">
    @import "assets/css/study";
    @import "assets/css/profile-teacher-manage";
    @import "assets/css/passport";
    @import "assets/css/comment";

    #app {
        font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    body {
        margin: 0;
        height: 100%;
        display: block;
        line-height: 1.42857;
    }

    html {
        height: 100%;
    }

    #container {
        position: relative;
        width: 100%;
        min-height: 100%;
        padding-bottom: 245px;
        box-sizing: border-box;
    }

    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
</style>
