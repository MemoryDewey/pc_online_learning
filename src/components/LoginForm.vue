<template>
    <div id="login-form" class="passport-main">
        <!--切换登录方式 S-->
        <div class="login-type" @click="changeLoginType"
             :class="qrCodeLogin?'account-login':'qr-code-login'">
            <div class="tri-shadow"></div>
        </div>
        <!--切换登录方式 E-->
        <h4 class="title">
            <a class="active">登录</a>
            <b>·</b>
            <a @click="changeToRegister">注册</a>
        </h4>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" v-if="!qrCodeLogin">
            <el-form-item prop="account">
                <el-input @blur="showCapture" v-model="loginForm.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item v-if="captchaVisible" prop="verify">
                <el-input v-model="loginForm.verify" placeholder="请输入验证码">
                    <template slot="append">
                        <img :src="imageVerifyUrl" @click="changeImage" style="cursor: pointer;height: 36px" alt>
                    </template>
                </el-input>
            </el-form-item>
            <div class="remember-btn">
                <label>
                    <input type="checkbox" v-model="loginForm.checked">
                    <span>记住我</span>
                </label>
            </div>
            <div class="forget-btn">
                <router-link :to="{name:'ResetPassword'}">忘记密码?</router-link>
            </div>
            <el-button class="login-button" @click="loginButtonClick('loginForm')"
                       :disabled="loginClick">登录
            </el-button>
        </el-form>
        <div class="qr-code" v-else>
            <img :src="qrCodeDataUrl" alt @click="getQrCodeUrl">
            <div v-if="qrCodeStatus!=='waiting'" class="opacity-box" @click="getQrCodeUrl">
                <i :class="{'el-icon-refresh':qrCodeStatus==='refresh',
                'el-icon-circle-check':qrCodeStatus==='scan'}"/>
            </div>
            <h3>{{qrCodeStatus==='scan'?'扫描成功':'扫描二维码登录'}}</h3>
            <span>{{qrCodeStatus==='scan'?'请在手机上确认是否授权':'请使用学习平台APP扫描'}}</span>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import {Message} from 'element-ui'
    import {login, getLoginQrCode, checkQrCodeLogin} from '@/api/passport'

    export default {
        name: "LoginForm",
        data() {
            return {
                //使用二维码登录
                qrCodeLogin: false,
                //进入Login时的fromPath
                fromPath: '/',
                //登录表单
                loginForm: {
                    account: "", password: "", verify: "", checked: true
                },
                // 验证规则
                rules: {
                    account: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    verify: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },
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
            //登录按钮点击
            loginButtonClick(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.rememberMe();
                        let res = await login(this.loginForm);
                        if (!res) {
                            this.changeImage();
                        } else {
                            Message.success(res.msg);
                            localStorage.setItem('token', res.token);
                            this.$emit('checkLogin');
                        }
                    } else return false;
                });
            },
            //记住密码复选框
            rememberMe() {
                if (this.loginForm.checked) {
                    localStorage.setItem('account', this.loginForm.account);
                } else {
                    localStorage.removeItem('account');
                }
            },
            // 展示验证码
            showCapture() {
                if (this.loginForm.account.length > 0) {
                    this.changeImage();
                    this.captchaVisible = true;
                }
            },
            //更换验证码图片
            changeImage() {
                this.imageVerifyUrl = `/api/passport/image-captcha?user=${
                    this.loginForm.account}&val=${Math.random().toFixed(5)}`;
            },
            // 切换到注册
            changeToRegister(){
                this.$emit('changeType')
            },
            // 改变登录方式
            async changeLoginType() {
                this.qrCodeLogin = !this.qrCodeLogin;
                if (this.qrCodeLogin && this.qrCodeUrl === '') {
                    await this.getQrCodeUrl();
                } else if (this.qrCodeLogin && this.qrCodeUrl !== '') {
                    await this.checkQrCodeApply();
                } else clearInterval(this.interval);
            },
            // 获取二维码链接
            async getQrCodeUrl() {
                let res = await getLoginQrCode();
                if (res.code === 1000) {
                    this.qrCodeStatus = 'waiting';
                    this.uuid = res.uuid;
                    this.qrCodeUrl = `${res.url}?uuid=${res.uuid}`;
                    QRCode.toDataURL(this.qrCodeUrl).then(url => {
                        this.qrCodeDataUrl = url;
                        this.checkQrCodeApply();
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            // 1S访问一次服务器查询是否登录成功
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
                        this.$emit('checkLogin');
                    }
                }, 1000);
            }
        },
        created() {
            if (this.loginForm.checked) {
                this.loginForm.account = localStorage.getItem('account');
                this.showCapture();
            }
        },
    }
</script>