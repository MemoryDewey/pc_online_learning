<template>
    <div class="not-found">
        <div class="inner-center">
            <div class="section-msg">
                <div class="msg-inner">
                    <font-awesome-icon icon="info-circle" class="msg-info"></font-awesome-icon>
                    <div class="msg-text">页面不见了，去看看其他内容吧 ^_^</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "404",
        beforeCreate() {
            this.$emit('setHeader', '404');
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
