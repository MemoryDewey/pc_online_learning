<template>
    <div id="app">
        <app-header :page="name" v-if="name!=='passport'"></app-header>
        <router-view @setHeader="setHeader"/>
        <app-footer v-if="name!=='passport'"></app-footer>
    </div>
</template>
<script>
    import Header from '@/components/common/Header'
    import Footer from '@/components/common/Footer'

    export default {
        name: 'App',
        components: {
            'app-header': Header,
            'app-footer': Footer
        },
        data() {
            return {
                activeIndex: '1',
                name: '',
            }
        },
        methods: {
            setHeader(name) {
                this.name = name;
            }
        }
    }
</script>
<style lang="less">
    @import "assets/css/study";
    @import "assets/css/profile-teacher-manage";
    @import "assets/css/passport";
    @import "assets/css/comment";
    @import "assets/css/header";

    html {
        height: 100%;
    }

    body {
        margin: 0;
        height: 100%;
        display: block;
        line-height: 1.42857;
    }

    #app {
        font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
    }

    #container {
        width: 100%;
        box-sizing: border-box;
        flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
    }

    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
</style>
