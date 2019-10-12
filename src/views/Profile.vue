<template>
    <div id="container">
        <div class="profile-container">
            <div class="row">
                <el-container>
                    <!-- 导航栏 -->
                    <el-aside>
                        <div class="aside">
                            <ul v-if="!this.$store.state.isTeacher">
                                <li :class="{'active':active.personal}">
                                    <router-link :to="{name:'personal'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="address-card"></font-awesome-icon>
                                        </div>
                                        <span>个人资料</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.paid}">
                                    <router-link :to="{name:'paid'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="yen-sign"></font-awesome-icon>
                                        </div>
                                        <span>已购课程</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.course}">
                                    <router-link :to="{name:'course'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="book-open"></font-awesome-icon>
                                        </div>
                                        <span>我的课程</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.browse}">
                                    <router-link :to="{name:'browse'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="eye"></font-awesome-icon>
                                        </div>
                                        <span>最近再看</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.collection}">
                                    <router-link :to="{name:'collection'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="star"></font-awesome-icon>
                                        </div>
                                        <span>收藏课程</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.exam}">
                                    <router-link :to="{name:'exam'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="file-alt"></font-awesome-icon>
                                        </div>
                                        <span>我的考试</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.certificate}">
                                    <router-link :to="{name:'certificate'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="award"></font-awesome-icon>
                                        </div>
                                        <span>我的证书</span>
                                    </router-link>
                                </li>
                            </ul>
                            <ul v-else>
                                <li :class="{'active':active.personal}">
                                    <router-link :to="{name:'personal'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="address-card"></font-awesome-icon>
                                        </div>
                                        <span>个人资料</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.wallet}" v-if="false">
                                    <router-link :to="{name:'wallet'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="wallet"></font-awesome-icon>
                                        </div>
                                        <span>我的钱包</span>
                                    </router-link>
                                </li>
                                <li :class="{'active':active.exam}" v-if="false">
                                    <router-link :to="{name:'exam'}">
                                        <div class="setting-icon">
                                            <font-awesome-icon icon="envelope"></font-awesome-icon>
                                        </div>
                                        <span>系统消息</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </el-aside>
                    <el-main>
                        <!-- 导航栏所对应的内容 -->
                        <div class="profile-view">
                            <router-view></router-view>
                        </div>
                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Layout",
        data() {
            return {
                page: "profile",
                active: {
                    personal: false, paid: false, course: false,
                    exam: false, certificate: false, browse: false, collection: false
                }
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'profile');
        },
        beforeRouteEnter(to, from, next) {
            let type = to.name;
            next((vm => {
                vm.active[type] = true;
            }));
        },
        beforeRouteUpdate(to, from, next) {
            let type = from.name;
            this.active[type] = false;
            type = to.name;
            this.active[type] = true;
            next();
        },
    }
</script>

<style lang="less">
    .profile-container {
        width: 1200px;
        margin: 0 auto;
        padding: 0 15px 0 15px;

        *, :after, :before {
            box-sizing: border-box
        }

        ul {
            margin: 0 0 10px 0;
        }

        a {
            cursor: pointer;
            color: #333;
            text-decoration: none;

            &:focus, &:hover {
                color: #2f2f2f;
            }
        }

        .row {
            padding-top: 15px;
            margin: 0 -15px 0 -15px;
        }

        .aside {
            position: relative;
            top: 0;
            bottom: 0;
            margin: 20px 0 0;
            padding: 0 0 30px;
            width: 280px;
            overflow: auto;

            ul {
                list-style: none;
                padding-left: 0;

                li {
                    line-height: 20px;
                    border-bottom: 1px solid #e6e6e6;
                }
            }

            a {
                padding: 15px 15px;
                font-size: 15px;
                display: block;
                text-align: left;
            }

            .active, li:hover {
                a {
                    background-color: #f0f0f0;
                }
            }

            .setting-icon {
                margin-right: 15px;
                width: 32px;
                height: 32px;
                text-align: center;
                color: #fff;
                background-color: #a0a0a0;
                border-radius: 4px;
                display: inline-block;
                vertical-align: middle;

                svg {
                    margin: 6px 0 6px 0;
                    font-size: 18px;
                }
            }
        }
    }
</style>
