<template>
    <div class="main">
        <!--切换登录方式 S-->
        <div class="login-type" @click="changeLoginType"
             :class="qrCodeLogin?'account-login':'qr-code-login'">
            <div class="tri-shadow"></div>
        </div>
        <!--切换登录方式 E-->
        <h4 class="title">
            <router-link class="active" to="/passport/login">登录</router-link>
            <b>·</b>
            <router-link to="/passport/register">注册</router-link>
        </h4>
        <form v-if="!qrCodeLogin">
            <div v-bind:class="inputCss.account">
                <label>
                    <input v-model="loginForm.account"
                           v-on:keyup="checkInputNull(inputName[0])"
                           type="text" placeholder="手机号或邮箱">
                </label>
                <font-awesome-icon icon="user"/>
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
        <div class="qr-code" v-else>
            <img :src="qrCodeDataUrl" alt @click="getQrCodeUrl">
            <div v-if="qrCodeStatus!=='waiting'" class="opacity-box" @click="getQrCodeUrl">
                <i :class="{'el-icon-refresh':qrCodeStatus==='refresh',
                'el-icon-circle-check':qrCodeStatus==='scan'}"/>
            </div>
            <h3>{{qrCodeStatus==='scan'?'扫描成功':'扫描二维码登录'}}</h3>
            <span>{{qrCodeStatus==='scan'?'请在手机上确认是否授权':'请使用学习平台APP扫描'}}</span>
        </div>
        <el-dialog title="请输入验证码" width="350px" :visible.sync="captchaVisible" @close="captchaVisible=false">
            <img :src="imageVerifyUrl" @click="changeImage" style="cursor: pointer" alt>
            <el-input v-model="loginForm.verify" placeholder="请输入验证码" maxlength="4" style="width: 180px"></el-input>
        </el-dialog>
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import {Message} from 'element-ui'
    import {login, getLoginQrCode, checkQrCodeLogin} from '@/api/passport'

    export default {
        name: "Login",
        data() {
            return {
                //使用二维码登录
                qrCodeLogin: false,
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
                captchaVisible: false,
                //二维码链接
                qrCodeUrl: '',
                //二维码数据
                qrCodeDataUrl: '',
                uuid: '',
                //计时器
                interval: null,
                //验证码状态
                qrCodeStatus: 'waiting'
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
            },
            //改变登录方式
            async changeLoginType() {
                this.qrCodeLogin = !this.qrCodeLogin;
                if (this.qrCodeLogin && this.qrCodeUrl === '') {
                    await this.getQrCodeUrl();
                } else if (this.qrCodeLogin && this.qrCodeUrl !== '') {
                    await this.checkQrCodeApply();
                } else clearInterval(this.interval);
            },
            //获取二维码链接
            async getQrCodeUrl() {
                let res = await getLoginQrCode();
                if (res.code === 1000) {
                    this.qrCodeStatus = 'waiting';
                    this.uuid = res.uuid;
                    this.qrCodeUrl = `${res.url}?uuid=${res.uuid}`;
                    QRCode.toDataURL(this.qrCodeUrl).then(url => {
                        this.qrCodeDataUrl = url;
                        console.log(url);
                        this.checkQrCodeApply();
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            //1S访问一次服务器查询是否登录成功
            async checkQrCodeApply() {
                clearInterval(this.interval);
                this.interval = setInterval(async () => {
                    let res = await checkQrCodeLogin({
                        uuid: this.uuid,
                    });
                    //验证码过期，需要刷新验证码
                    if (res.code === 1001) {
                        clearInterval(this.interval);
                        this.qrCodeStatus = 'refresh'
                    } else if (res.code === 1003) { //验证码已扫描，等待确认登录
                        this.qrCodeStatus = 'scan'
                    } else if (res.code === 1000) { //登录成功
                        clearInterval(this.interval);
                        Message.success(res.msg);
                        localStorage.setItem('token', res.token);
                        setTimeout(() => {
                            this.$router.push(this.fromPath);
                        }, 500);
                    }
                    console.log(res.code);
                }, 1000);
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

