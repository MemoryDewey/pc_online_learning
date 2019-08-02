<template>
    <div class="not-found">
        <header-course page="notFound"></header-course>
        <div class="inner-center">
            <div class="section-msg">
                <div class="msg-inner">
                    <font-awesome-icon icon="info-circle" class="msg-info"></font-awesome-icon>
                    <div class="msg-text">页面不见了，去看看其他内容吧 ^_^</div>
                </div>
            </div>
        </div>
        <footer-course></footer-course>
    </div>
</template>

<script>
    import Header from '../components/common/Header'
    import Footer from '../components/common/Footer'

    export default {
        name: "404",
        components: {
            "header-course": Header,
            "footer-course": Footer
        }
    }
</script>

<style lang="less">
    .not-found {
        .inner-center {
            width: 1200px;
            margin-left: auto;
            margin-right: auto;

            .section-msg {
                text-align: center;
                margin: 263px 0;
            }

            .msg-inner {
                display: inline-block;
                padding-left: 50px;
                position: relative;
                text-align: center;
            }

            .msg-info {
                color: #409eff;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 36px;
            }

            .msg-text {
                line-height: 36px;
                font-size: 18px;
                color: #999;
                text-align: left;
            }
        }
    }
</style>