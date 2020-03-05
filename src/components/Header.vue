<template>
    <header class="header-wrap" id="header">
        <!--第一排布局 S-->
        <div class="top-wrap">
            <div class="main-header clearfix">
                <!--Logo S-->
                <div class="logo">
                    <router-link to="/">
                        <img src="../assets/image/logo-text.png" alt>
                    </router-link>
                </div>
                <!--Logo E-->
                <!--搜索框 S-->
                <!--只在在线学习模块展示-->
                <div class="search clearfix" v-if="!this.$store.state.isTeacher && page === 'course'">
                    <el-input @keydown.enter.native="search" placeholder="搜索课程" clearable="true"
                              size="small" v-model="searchContent">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
                <!--搜索框 E-->
                <!--登录注册按钮及头像 S-->
                <div v-if="!loginState" class="un-login">
                    <button class="log-btn" @click="openDialog('register')">注册</button>
                    <button class="log-btn" @click="openDialog('login')">登录</button>
                </div>
                <div v-else class="login">
                    <div class="info">
                        <el-avatar :src="avatarUrl" :size="36"></el-avatar>
                        <span class="info-name">{{nickname}}</span>
                        <ul class="dropdown-list">
                            <router-link tag="li" v-if="!this.$store.state.isTeacher" to="/wallet">
                                <font-awesome-icon icon="wallet"></font-awesome-icon>
                                <span>我的钱包</span>
                            </router-link>
                            <!--<router-link tag="li" v-if="!this.$store.state.isTeacher" to="/points-mall">
                                <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
                                <span>积分商城</span>
                            </router-link>-->
                            <router-link tag="li" :to="{name:'personal'}">
                                <font-awesome-icon icon="cog"></font-awesome-icon>
                                <span>设置</span>
                            </router-link>
                            <li @click="exit">
                                <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
                                <span>退出</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--登录注册按钮及头像 E-->
            </div>
        </div>
        <!--第一排布局 E-->
        <!--第二排布局 S-->
        <!--学生端 S-->
        <div class="nav-wrap" v-if="!this.$store.state.isTeacher">
            <div class="nav-menu">
                <ul class="menu-bar">
                    <router-link :to="{name:'Index'}" tag="li" active-class="active" exact>
                        <div class="menu-item">首页</div>
                    </router-link>
                    <router-link to="/course" tag="li" active-class="active">
                        <div class="menu-item">在线学习</div>
                        <div class="sub-menu-item">
                            <ul>
                                <li v-for="system in courseSystem" :key="system.id">
                                    <router-link :to="`/course/list?system=${system.id}`">
                                        {{system.name}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </router-link>
                    <router-link to="/profile" tag="li" active-class="active">
                        <div class="menu-item">个人中心</div>
                        <div class="sub-menu-item">
                            <ul>
                                <li>
                                    <router-link to="/profile/course">我的课程</router-link>
                                </li>
                                <li>
                                    <router-link to="/profile/exam">我的考试</router-link>
                                </li>
                                <li>
                                    <router-link to="/profile/invite">邀请好友</router-link>
                                </li>
                                <li>
                                    <router-link to="/profile/certificate">我的证书</router-link>
                                </li>
                            </ul>
                        </div>
                    </router-link>
                    <router-link to="/about" tag="li" avtive-class="active">
                        <div class="menu-item">关于我们</div>
                    </router-link>
                </ul>
            </div>
        </div>
        <!--学生端 E-->
        <!--教师端 S-->
        <div class="nav-wrap" v-else>
            <div class="nav-menu">
                <ul class="menu-bar">
                    <router-link tag="li" to="/teacher/course" active-class="active">
                        <div class="menu-item">课程管理</div>
                        <div class="sub-menu-item">
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
                    </router-link>
                    <router-link to="/profile" tag="li" active-class="active">
                        <div class="menu-item">个人中心</div>
                    </router-link>
                </ul>
            </div>
        </div>
        <!--教师端 E-->
        <!--第二排布局 E-->
        <!--登录注册Dialog S-->
        <el-dialog :visible.sync="dialogShow" width="400px"
                   @close="dialogShow=false" destroy-on-close>
            <login-form v-if="dialogType==='login'"
                        @checkLogin="checkLoginState" @changeType="changeType"/>
            <register-form v-else @checkLogin="checkLoginState" @changeType="changeType"/>
        </el-dialog>
        <!--登录注册Dialog E-->
    </header>
</template>

<script>
    import {logout, checkLogin} from '@/api/passport'
    import {getCourseSystem} from '@/api/course'
    import LoginForm from "@/components/LoginForm";
    import RegisterForm from "@/components/RegisterForm";

    export default {
        name: "Header",
        components: {LoginForm, RegisterForm},
        props: {
            page: {type: String, required: true}
        },
        data() {
            return {
                avatarUrl: '/images/avatar/default-avatar.jpg',
                nickname: '',
                loginState: false,
                courseSystem: null,
                searchContent: '',
                dialogShow: false,
                dialogType: 'login'
            }
        },
        methods: {
            // 退出
            exit() {
                logout().then(() => {
                    this.$store.commit('exit');
                    window.location.reload();
                });
            },
            // 查找课程
            search() {
                let url = `/course/list/${this.searchContent}`;
                this.$router.push(url);
            },
            // 检查登录状态
            async checkLoginState() {
                this.dialogShow = false;
                if (this.$store.state.loginState) {
                    this.loginState = true;
                    this.avatarUrl = this.$store.state.avatarUrl;
                    this.nickname = this.$store.state.nickname;
                } else {
                    let response = await checkLogin();
                    this.loginState = response.code === 1000;
                    if (this.loginState) {
                        this.$store.commit('login', {
                            level: response.level
                        });
                        this.avatarUrl = `${response.info.avatarUrl}`;
                        this.$store.commit('changeAvatarUrl', this.avatarUrl);
                        this.nickname = response.info.nickname;
                        this.$store.commit('changeNickname', this.nickname);
                    } else if (localStorage.getItem('token')) localStorage.removeItem('token');
                }
            },
            // 更改dialog类型
            changeType() {
                this.dialogType = this.dialogType === 'login' ? 'register' : 'login';
            },
            // 打开dialog
            openDialog(type) {
                this.dialogType = type;
                this.dialogShow = true;
            },
        },
        watch: {
            '$store.state.avatarUrl'(val) {
                this.avatarUrl = val;
            },
            '$store.state.nickname'(val) {
                this.nickname = val;
            }
        },
        async created() {
            this.checkLoginState();
            let response = await getCourseSystem();
            if (response) this.courseSystem = response;
        }
    }
</script>
