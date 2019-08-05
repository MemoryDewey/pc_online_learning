<template>
    <div class="header-wrap">
        <!--第一排布局 S-->
        <div class="top-wrap">
            <div class="header clearfix">
                <!--Logo S-->
                <div class="logo">
                    <router-link class="active" to="/">
                        <img src="../../assets/image/logo-text.png" alt="">
                    </router-link>
                </div>
                <!--Logo E-->
                <!--搜索框 S-->
                <div class="search clearfix" v-if="!$store.state.isTeacher && page === 'course' || page === 'project'">
                    <font-awesome-icon icon="search"></font-awesome-icon>
                    <label>
                        <input type="text" :placeholder="`搜索${page==='course'?'课程':'项目'}`"
                               v-model="searchContent" @keydown.enter="search">
                    </label>
                    <div class="btn-search" @click="search">搜索</div>
                </div>
                <!--搜索框 E-->
                <!--登录注册模块 S-->
                <div v-if="!loginState" class="un-login">
                    <router-link class="log-btn" :to="{name:'Register'}">注册</router-link>
                    <router-link class="log-btn" :to="{name:'Login'}">登录</router-link>
                </div>
                <div v-else class="login">
                    <div class="user">
                        <div class="message" v-if="$store.state.isTeacher">
                            <a>
                                <el-badge :value="5" :max="99" class="badge" type="primary">
                                    <font-awesome-icon icon="envelope"></font-awesome-icon>
                                </el-badge>
                            </a>
                        </div>
                        <div class="info">
                            <a>
                                <img alt="头像" :src="avatarUrl">
                                <span>{{nickname}}</span>
                            </a>
                            <ul :class="{'dropdown-list':true,'teacher-dropdown':$store.state.isTeacher}">
                                <li>
                                    <router-link to="/profile/wallet">
                                        <font-awesome-icon icon="wallet"></font-awesome-icon>
                                        我的钱包
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'personal'}">
                                        <font-awesome-icon icon="cog"></font-awesome-icon>
                                        设置
                                    </router-link>
                                </li>
                                <li>
                                    <a @click="exit">
                                        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
                                        退出</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--登录注册模块 E-->
            </div>
        </div>
        <!--第一排布局 E-->
        <!--第二排布局 S-->
        <!--学生端 S-->
        <div class="nav-wrap" v-if="!$store.state.isTeacher">
            <div class="nav">
                <ul class="left">
                    <li :class="navActive.home">
                        <div class="first">
                            <router-link to="/">首页</router-link>
                        </div>
                    </li>
                    <li :class="navActive.course">
                        <div class="first">
                            <router-link to="/course/list">在线学习</router-link>
                        </div>
                        <div class="second">
                            <ul>
                                <li v-for="system in courseSystem" :key="system.id">
                                    <router-link :to="`/course/list?system=${system.id}`">
                                        {{system.name}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li :class="navActive.project">
                        <div class="first">
                            <router-link to="/project/list">项目实践</router-link>
                        </div>
                    </li>
                    <li :class="navActive.profile">
                        <router-link tag="div" class="first" :to="{name:'personal'}">个人中心</router-link>
                        <div class="second">
                            <ul>
                                <li>
                                    <router-link to="/profile/course">我的课程</router-link>
                                </li>
                                <li>
                                    <router-link to="/profile/project">我的项目</router-link>
                                </li>
                                <li>
                                    <router-link to="/profile/certificate">
                                        我的证书
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--学生端 E-->
        <!--教师端 S-->
        <div class="nav-wrap" v-else>
            <div class="nav">
                <ul class="left">
                    <li :class="navActive.courseMng">
                        <div class="first">
                            <router-link to="/teacher/course/student">课程管理</router-link>
                        </div>
                        <div class="second">
                            <ul>
                                <li>
                                    <router-link to="/teacher/course/student">成员管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/course/list">信息管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/course/video">视频管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/course/ware">课件管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/course/file">资料管理</router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li :class="navActive.projectMng">
                        <div class="first">
                            <router-link to="/teacher/project/project">项目管理</router-link>
                        </div>
                        <div class="second">
                            <ul>
                                <li>
                                    <router-link to="/teacher/project/project">项目管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/project/projectmember">成员管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/project/attendapply">报名申请管理</router-link>
                                </li>
                                <li>
                                    <router-link to="/teacher/project/createapply">创建申请管理</router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li :class="navActive.profile">
                        <router-link tag="div" class="first" :to="{name:'personal'}">个人中心</router-link>
                        <div class="second">
                            <ul>
                                <li>
                                    <a>个人信息</a>
                                </li>
                                <li>
                                    <a>直播课表</a>
                                </li>
                                <li>
                                    <a>
                                        我的钱包
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--教师端 E-->
        <!--第二排布局 E-->
    </div>
</template>

<script>
    import moment from 'moment'
    import {logout, checkLogin} from '../../api/passport'
    import {getCourseSystem} from '../../api/course'

    export default {
        name: "Header",
        props: {
            page: {
                type: String
            }
        },
        data() {
            return {
                avatarUrl: '/images/avatar/default-avatar.jpg',
                nickname: '',
                navActive: {
                    home: {active: false},
                    course: {active: false},
                    project: {active: false},
                    profile: {active: false},
                    courseMng: {active: false},
                    projectMng: {active: false},
                    notFound: {active: false}
                },
                loginState: false,
                courseSystem: null,
                searchContent: '',
            }
        },
        methods: {
            exit() {
                logout().then(() => {
                    this.$store.commit('exit');
                });
                window.location.reload();
            },
            search() {
                let url = this.page === 'course' ? `/course/list/${this.searchContent}` : `/project/list/${this.searchContent}`;
                this.$router.push(url);
            }
        },
        watch: {
            '$store.state.avatarUrl'(val) {
                this.avatarUrl = val;
            },
            '$store.state.nickname'(val) {
                this.nickname = val;
            }
        },
        mounted() {
            this.navActive[this.page].active = true;
        },
        async created() {
            if (this.$store.state.loginState) {
                let effectiveTime = this.$store.state.effectiveTime;
                if (moment().isAfter(effectiveTime)) {
                    this.loginState = false;
                } else {
                    this.loginState = true;
                    this.avatarUrl = this.$store.state.avatarUrl;
                    this.nickname = this.$store.state.nickname;
                }
            } else {
                let response = await checkLogin();
                this.loginState = response.status === 1;
                if (this.loginState) {
                    this.$store.commit('login', {
                        level: response.level
                    });
                    if (response.data.avatarUrl !== null) {
                        this.avatarUrl = `${response.data.avatarUrl}`;
                        this.$store.commit('changeAvatarUrl', this.avatarUrl);
                    }
                    this.nickname = response.data.nickname;
                    this.$store.commit('changeNickname', this.nickname);
                }
            }
            let response = await getCourseSystem();
            if (response) this.courseSystem = response.data;
        }
    }
</script>

<style lang="less">
    @header-color: #409eff;
    .header-wrap {
        * {
            margin: 0;
        }

        *, img {
            border: 0
        }

        *, td, th {
            padding: 0
        }

        li, ol, ul {
            list-style: none
        }

        a {
            text-decoration: none;
        }

        .top-wrap {
            height: 80px;
            width: 100%;
            background-color: @header-color;
            min-width: 1280px;

            .header {
                width: 1200px;
                margin: 0 auto;

                .logo {
                    float: left;
                    height: 55px;
                    margin: 10px 0 10px 0;

                    img {
                        height: auto;
                        width: 220px;
                    }
                }

                .search {
                    float: left;
                    position: relative;
                    height: 30px;
                    width: 350px;
                    margin: 24px 0 0 160px;
                    border: 1px solid #fff;
                    border-radius: 16px;
                    padding-left: 8px;

                    svg {
                        float: left;
                        height: 17px;
                        width: 17px;
                        margin: 7px 10px 0 0;
                        color: #fff;
                    }

                    input {
                        position: absolute;
                        z-index: 1;
                        left: 35px;
                        width: 267px;
                        height: 95%;
                        border: 0;
                        outline: none;
                        background: @header-color;
                        color: #fff;
                        font: inherit;
                        font-size: 12px;

                        &::placeholder {
                            font-size: 12px;
                            color: #fff;
                        }
                    }

                    .btn-search {
                        float: right;
                        width: 46px;
                        line-height: 30px;
                        color: #fff;
                        font-size: 12px;
                        cursor: pointer;
                        padding-left: 10px;
                        border-radius: 16px;
                        border: 0;
                    }

                }

                .un-login {
                    float: right;

                    a {
                        display: block;
                        float: left;
                        width: 88px;
                        height: 30px;
                        line-height: 29px;
                        border: 1px solid #fff;
                        border-radius: 16px;
                        color: #fff;
                        margin: 24px 30px 0 0;

                        &:hover {
                            border: 1px solid #67c23a;
                            background-color: #67c23a;
                        }

                        &:first-child {
                            margin-right: 30px;
                        }
                    }

                    .log-btn {
                        position: relative;
                        float: right;
                    }
                }

                .login {
                    float: right;

                    .user {
                        line-height: 80px;
                        padding-right: 12px;

                        .info {
                            float: right;
                            font-size: 0;
                            cursor: pointer;

                            a {
                                color: #fff;
                            }

                            img {
                                display: inline-block;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                margin-right: 8px;
                                vertical-align: middle;
                            }

                            span {
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                word-wrap: normal;
                                display: inline-block;
                                vertical-align: middle;
                                max-width: 82px;
                                text-align: left;
                                font-size: 14px;
                            }

                            .dropdown-list {
                                display: none;
                                position: absolute;
                                box-sizing: border-box;
                                width: 112px;
                                border: 1px solid #e5e5e5;
                                background: #fff;
                                box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .12);
                                z-index: 15;

                                &:before {
                                    content: '';
                                    width: 0;
                                    height: 0;
                                    border-width: 0 8px 8px;
                                    border-style: solid;
                                    border-color: transparent transparent #e5e5e5;
                                    position: absolute;
                                    left: 47px;
                                    top: -9px;
                                }

                                &:after {
                                    content: '';
                                    width: 0;
                                    height: 0;
                                    border-width: 0 8px 8px;
                                    border-style: solid;
                                    border-color: transparent transparent #fff;
                                    position: absolute;
                                    left: 47px;
                                    top: -8px;
                                }

                                a {
                                    display: block;
                                    text-align: left;
                                    margin: 20px 15px;
                                    line-height: 20px;
                                    height: 20px;
                                    background: #fff;
                                    color: #333;
                                    font-size: 14px;

                                    &:hover {
                                        color: @header-color;
                                        cursor: pointer;
                                    }
                                }
                            }

                            .teacher-dropdown {
                                margin-left: -25px;
                            }

                            .message-dropdown {
                                width: 150px;
                                display: block;
                                margin-left: -80px;
                            }

                            &:hover .dropdown-list {
                                display: block;
                            }
                        }
                    }

                    .badge {
                        margin-top: 0;
                        margin-right: 40px;
                    }

                    .message {
                        position: relative;
                        min-width: 50px;
                        margin-right: 20px;
                        float: left;

                        a {
                            background: 0;
                            line-height: 24px;
                        }

                        sup {
                            padding: 0 6px;
                            border: 1px solid #fff;
                        }

                        svg {
                            font-size: 24px;
                            color: #fff;
                            line-height: 24px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }

        .nav-wrap {
            width: 100%;
            background: #fafafa;

            .nav {
                width: 1200px;
                height: 50px;
                color: #202020;
                font-size: 14px;
                margin: 0 auto;

                .left {
                    float: left;
                    line-height: 50px;
                    color: #202020;

                    & > li {
                        position: relative;
                        float: left;
                        margin-right: 64px;

                        a {
                            color: #202020;
                        }

                        &:last-child {
                            margin-right: 0
                        }

                        &:hover, &:hover > div > a {
                            color: @header-color;
                        }

                        &:hover .second {
                            display: block;
                        }
                    }

                    .active {
                        color: @header-color;

                        & > div > a {
                            color: @header-color;
                        }

                        .first:after {
                            content: "";
                            display: inline-block;
                            position: absolute;
                            bottom: 0;
                            left: calc(50% - 30px);
                            width: 60px;
                            height: 2px;
                            background: #409eff
                        }
                    }

                    .first {
                        line-height: 50px;
                        height: 50px;
                        cursor: pointer;
                        font-size: 16px;

                        a {
                            display: inline-block;
                            height: 50px;
                        }
                    }

                    .second {
                        display: none;
                        position: absolute;
                        left: -36px;
                        top: 50px;
                        z-index: 300;
                        width: 132px;
                        background: #fff;
                        box-shadow: 0 0 20px rgba(0, 0, 0, .15);
                        border-radius: 6px;

                        li {
                            line-height: 40px;
                            width: 100%;
                            text-align: center;

                            &:hover a {
                                color: #409eff;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
