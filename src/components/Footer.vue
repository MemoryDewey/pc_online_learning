<template>
    <footer class="footer-warp">
        <img class="logo" src="../assets/image/logo-bcs.png" alt="logo">
        <p>Copyright © 2019 BaasStudy. All Rights Reserved.</p>
        <p>尝试实业(上海)有限公司 | 东华大学BAAS区块链实验室</p>
        <p>上海市松江区三新北路1800弄21号楼6003--6009 | 服务咨询：400-966-0003</p>
        <p>沪ICP备19033238号</p>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="less">
    .footer-warp {
        flex: 0 0 auto;
        -webkit-flex: 0 0 auto;
        padding-top: 20px;
        height: 245px;
        box-sizing: border-box;
        text-align: center;
        min-width: 1280px;
        width: 100%;
        left: 0;
        background: #444547;
        font-size: 12px;
        display: block;
        bottom: 0;
        overflow: hidden;

        p, a {
            color: #777;
            line-height: 24px
        }

        a:hover {
            text-decoration: underline
        }

        .logo {
            height: 42px;
            width: 42px;
        }
    }
</style>
