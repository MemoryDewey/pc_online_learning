<template>
    <div class="main">
        <h4 class="title">
            <router-link class="active" to="/passport/login">登录</router-link>
            <b>·</b>
            <router-link to="/passport/register">注册</router-link>
        </h4>
        <form>
            <div v-bind:class="inputCss.account">
                <label>
                    <input v-model="loginForm.account"
                           v-on:keyup="checkInputNull(inputName[0])"
                           type="text" placeholder="手机号或邮箱">
                </label>
                <font-awesome-icon icon="user"></font-awesome-icon>
            </div>
            <div class="error-show" v-if="inputEmpty.account">请输入账号</div>
            <div v-bind:class="inputCss.password">
                <label>
                    <input
                            v-model="loginForm.password"
                            @keyup="checkInputNull(inputName[1])"
                            @keyup.exact.enter="loginButtonClick"
                            type="password" placeholder="密码">
                </label>
                <font-awesome-icon icon="lock"></font-awesome-icon>
            </div>

            <div class="error-show" v-if="inputEmpty.password">请输入密码</div>

            <div class="remember-btn">
                <label>
                    <input type="checkbox" v-model="loginForm.checked">
                    <span>记住我</span>
                </label>
            </div>
            <div class="forget-btn">
                <router-link to="/passport/reset">忘记密码?</router-link>
            </div>
            <el-button class="login-button" @click="loginButtonClick" :disabled="loginClick">登录</el-button>
        </form>
        <el-dialog title="请输入验证码" width="350px" :visible.sync="captchaVisible" @close="captchaVisible=false">
            <img :src="imageVerifyUrl" @click="changeImage" style="cursor: pointer" alt>
            <el-input v-model="loginForm.verify" placeholder="请输入验证码" maxlength="4" style="width: 180px"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {login} from '@/api/passport'

    export default {
        name: "Login",
        data() {
            return {
                //进入Login时的fromPath
                fromPath: '/',
                //输入框名
                inputName: ["account", "password", "verify"],
                //输入框是否为空
                inputEmpty: {
                    account: false, password: false, verify: false
                },
                //整个表单控件
                loginForm: {
                    account: "", password: "", verify: "", checked: true
                },
                //用户输入框CSS
                inputCss: {
                    account: "", password: "", verify: ""
                },
                //输入正确时显示的CSS
                prepend: {
                    account: {'input-prepend': true, restyle: true, 'no-radius': false},
                    password: {'input-prepend': true, restyle: false, 'no-radius': true}
                },
                //输入错误时显示的CSS
                warn: {"input-warn": true},
                //图片验证码url
                imageVerifyUrl: "/api/passport/image-captcha",
                loginClick: false,
                captchaVisible: false
            }
        },
        methods: {
            //检查输入是否为空值
            checkInputNull(value) {
                if (this.loginForm[value] === '') {
                    this.inputCss[value] = this.warn;
                    this.inputEmpty[value] = true;
                } else {
                    this.inputCss[value] = this.prepend[value];
                    this.inputEmpty[value] = false;
                }
            },
            //登录按钮点击事件
            loginButtonClick() {
                if (this.loginForm.account === '') this.checkInputNull('account');
                else if (this.loginForm.password === '') this.checkInputNull('password');
                else {
                    this.changeImage();
                    this.loginForm.verify = "";
                    this.captchaVisible = true;
                }
            },
            //记住密码复选框
            rememberMe() {
                if (this.loginForm.checked) {
                    localStorage.setItem('account', this.loginForm.account);
                } else {
                    localStorage.removeItem('account');
                }
            },
            //更换验证码图片
            changeImage() {
                this.imageVerifyUrl = `/api/passport/image-captcha?user=${
                    this.loginForm.account}&val=${Math.random().toFixed(5)}`;
            }
        },
        mounted() {
            if (this.loginForm.checked) {
                this.loginForm.account = localStorage.getItem('account');
            }
            for (let item in this.inputCss) {
                if (this.inputCss.hasOwnProperty(item))
                    this.inputCss[item] = this.prepend[item];
            }
        },
        watch: {
            async 'loginForm.verify'(val) {
                if (val.length === 4) {
                    this.rememberMe();
                    let res = await login(this.loginForm);
                    if (!res) {
                        this.loginForm.verify = "";
                        this.changeImage();
                    } else {
                        Message.success(res.msg);
                        localStorage.setItem('token', res.token);
                        setTimeout(() => {
                            this.$router.push(this.fromPath);
                        }, 500);
                    }
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            let path = from.fullPath;
            if (from.name === null || from.name === 'Register' || from.name === 'Reset' || from.name === 'Error')
                path = '/';
            next((vm => {
                vm.fromPath = path;
            }));
        }
    }
</script>

