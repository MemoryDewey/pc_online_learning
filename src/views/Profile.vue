<template>
    <div id="container">
        <div class="profile-container">
            <div class="row">
                <el-container>
                    <!-- 导航栏 -->
                    <el-aside>
                        <div class="aside">
                            <ul v-if="!this.$store.state.isTeacher">
                                <router-link tag="li" :to="{name:'personal'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="address-card"></font-awesome-icon>
                                    </div>
                                    <span>个人资料</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'invite'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="share-alt"></font-awesome-icon>
                                    </div>
                                    <span>邀请好友</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'paid'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="yen-sign"></font-awesome-icon>
                                    </div>
                                    <span>已购课程</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'course'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="book-open"></font-awesome-icon>
                                    </div>
                                    <span>我的课程</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'browse'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="eye"></font-awesome-icon>
                                    </div>
                                    <span>最近再看</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'collection'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="heart"></font-awesome-icon>
                                    </div>
                                    <span>收藏课程</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'exam'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="file-alt"></font-awesome-icon>
                                    </div>
                                    <span>我的考试</span>
                                </router-link>
                                <router-link tag="li" :to="{name:'certificate'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="award"></font-awesome-icon>
                                    </div>
                                    <span>我的证书</span>
                                </router-link>
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
                                <router-link tag="li" :to="{name:'personal'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="address-card"></font-awesome-icon>
                                    </div>
                                    <span>个人资料</span>
                                </router-link>
                                <router-link v-if="false" tag="li" :to="{name:'personal'}" active-class="active">
                                    <div class="setting-icon">
                                        <font-awesome-icon icon="envelope"></font-awesome-icon>
                                    </div>
                                    <span>系统消息</span>
                                </router-link>
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
                page: "profile"
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'profile');
        }
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
                    padding: 15px 15px;
                    font-size: 15px;
                    display: block;
                    text-align: left;
                }
            }

            .active, li:hover {
                background-color: #f0f0f0;
                cursor: pointer;
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
