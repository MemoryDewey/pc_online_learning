<template>
    <div class="passport-main">
        <h4 class="title">
            <a @click="changeToLogin">登录</a>
            <b>·</b>
            <a class="active">注册</a>
        </h4>
        <el-form ref="registerForm" :model="registerForm" :rules="rules">
            <el-form-item prop="phone">
                <el-input placeholder="请输入手机号" v-model="registerForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码（不少于8位）"
                          v-model="registerForm.password" autocomplete="new-password"/>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="邀请码（可不填）" v-model="registerForm.invite"></el-input>
            </el-form-item>
            <el-form-item prop="verify">
                <el-input placeholder="验证码" v-model="registerForm.verify">
                    <template slot="append">
                        <el-button @click="sendVerifyCode" :disabled="sendCodeDisable">
                            {{verifyCodeText}}</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-button class="register-button" @click="registerButtonClick('registerForm')">注册</el-button>
        </el-form>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {checkPhone, sendMessage, register} from '@/api/passport'

    export default {
        name: "RegisterForm",
        data() {
            let validatePsw = (rule, value, callback) => {
                const regPsw = /^[\w!#$%&'*+/=?^_`{|}~,.;":]{8,16}$/;
                if (value === '') callback(new Error('请输入密码'));
                if (value.length < 8 || value.length > 16) callback(new Error('密码的长度在8-16位之间'));
                else if (!value.match(regPsw)) callback(new Error('密码仅支持字母数字及英文字符'));
                else callback();
            };
            let validatePhone = (rule, value, callback) => {
                const regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                if (value === '') callback(new Error('请输入手机号'));
                else if (!value.match(regPhone)) callback(new Error('请输入正确的手机号码'));
                else {
                    checkPhone({phone: value}).then(res => {
                        if (res.code === 403) callback(new Error('该手机号已被注册'));
                        else callback();
                    });
                }
            };
            return {
                //整个表单控件
                registerForm: {
                    phone: "", password: "", verify: "", invite: null
                },
                // 验证规则
                rules: {
                    phone: [{validator: validatePhone, trigger: 'blur'}],
                    password: [{validator: validatePsw, trigger: 'blur'}],
                    verify: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },
                //验证码区域显示文本
                verifyCodeText: "发送验证码",
                //发送验证码按钮CSS
                sendCodeDisable: false
            }
        },
        methods: {
            // 切换到登录
            changeToLogin() {
                this.$emit('changeType')
            },
            //发送验证码
            async sendVerifyCode() {
                this.sendCodeDisable = true;
                let times = 90;   //按钮点击间隔
                let self = this;
                let timer = await setInterval(() => {
                    self.verifyCodeText = "重新发送(" + times + "s)";
                    times--;
                    if (times < 0) window.clearInterval(timer);
                }, 1000);
                setTimeout(() => {
                    self.verifyCodeText = "发送验证码";
                    self.sendCodeDisable = false;
                }, 91000);
                sendMessage({account: this.registerForm.phone, option: "register"}).then(res => {
                    if (res) Message.success(res.msg);
                });
            },
            // 注册
            registerButtonClick(formName) {
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        register(this.registerForm).then(res => {
                            if (res) {
                                Message.success(res.msg);
                                localStorage.setItem('token', res.token);
                                this.$emit('checkLogin');
                            }
                        });
                    }else return false;
                })
            }
        },
        created() {
            if (this.$route.query.invite) this.registerForm.invite = this.$route.query.invite;
        }
    }
</script>
