<template>
    <div id="reset-password">
        <main class="container">
            <form class="reset-password-form">
                <div class="form-header">
                    <h1 class="title">重置密码</h1>
                    <nav class="nav">
                        <span class="nav-item" :class="{active:resetType==='mail'}"
                              @click="changeType('mail')">邮箱重置</span>
                        <span class="nav-item" :class="{active:resetType==='phone'}"
                              @click="changeType('phone')">手机重置</span>
                    </nav>
                </div>
                <div class="form-body">
                    <div class="panel">
                        <div class="input-group">
                            <el-input ref="phone" v-model="resetForm.account" class="full-width"
                                      v-if="resetType==='phone'" placeholder="请输入手机号"
                                      oninput="if(value.length>11)value=value.slice(0,11)"/>
                            <el-input ref="mail" v-model="resetForm.account" v-else
                                      class="full-width" placeholder="请输入邮箱号" autofocus/>
                        </div>
                        <div class="input-group">
                            <el-input v-model="resetForm.verify" class="verify-input"
                                      placeholder="请输入验证码"/>
                            <el-button class="btn send-btn" @click="sendVerifyCode"
                                       :disabled="sendCodeDisable">{{verifyCodeText}}
                            </el-button>
                        </div>
                        <div class="input-group">
                            <el-input type="password" v-model="resetForm.password"
                                      autocomplete="new-password"
                                      class="full-width"
                                      placeholder="请输入新密码"/>
                        </div>
                        <el-button @click="resetButtonClick" class="btn submit-btn">确定</el-button>
                    </div>
                </div>
                <div class="form-footer">
                    <router-link to="/" class="index-link">返回首页</router-link>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {sendMessage, sendEmail, reset} from '@/api/passport'

    export default {
        name: "ResetPassword",
        data() {
            return {
                // 重置方式
                resetType: 'mail',
                //  整个表单控件
                resetForm: {
                    account: "", password: "", verify: ""
                },
                //  用户输入检查文本
                inputCheckText: {
                    account: ["输入不能为空", "请输入正确的手机号", "请输入正确的邮箱号"],
                    password: ["请输入密码", "密码长度不能小于8位"],
                    verify: ["请输入验证码"]
                },
                //验证码区域显示文本
                verifyCodeText: "获取验证码",
                //发送验证码按钮
                sendCodeDisable: false,
            }
        },
        methods: {
            // 更换重置方式
            changeType(type) {
                this.resetType = type;
                this.resetForm.account = '';
                this.resetForm.verify = '';
                this.resetForm.password = '';
                this.$nextTick(() => {
                    this.$refs[type].focus();
                });
            },
            //检查用户手机号，密码是否输入合格
            checkInput(value) {
                //首先检查是否为空值
                const regAccount = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                const regPassword = /^[\w!#$%&'*+/=?^_`{|}~,.;":]{8,16}$/;
                const regMail = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                if (this.resetForm[value] === '')  //任何输入框为空
                    Message.error(this.inputCheckText[value][0]);
                else if (value === "account") {
                    /* ------------验证手机--------------- */
                    if (this.resetType === 'phone' && !this.resetForm.account.match(regAccount))
                        Message.error(this.inputCheckText[value][1]);
                    /* ------------验证邮箱--------------- */
                    else if (this.resetType === 'mail' && !this.resetForm.account.match(regMail))
                        Message.error(this.inputCheckText[value][2]);
                    else {
                        this.sendCodeDisable = false;
                        return true;
                    }
                }
                /* -------------------分割线：密码输入不合法--------------- */
                else if (value === "password" && !this.resetForm.password.match(regPassword))   //
                    Message.error(this.inputCheckText[value][1]);
                /* ---------------------------------------------- */
                else return true;
            },
            //发送验证码
            async sendVerifyCode() {
                if (this.checkInput('account') === true) {
                    this.sendCodeDisable = true;
                    let times = 90;   //按钮点击间隔
                    let self = this;
                    let timer = await setInterval(function () {
                        self.verifyCodeText = "重新发送(" + times + "s)";
                        times--;
                        if (times < 0) window.clearInterval(timer);
                    }, 1000);
                    setTimeout(function () {
                        self.verifyCodeText = "发送验证码";
                        self.sendCodeDisable = false;
                    }, 91000);
                    this.resetType === 'phone' ?
                        sendMessage({account: this.resetForm.account, option: "reset"}).then((res => {
                            if (res) Message.success(res['msg']);
                        })) :
                        sendEmail({account: this.resetForm.account, option: "reset"}).then(res => {
                            if (res) Message.success(res['msg']);
                        });
                }
            },
            //重置密码
            async resetButtonClick() {
                if (this.resetForm.account === '') this.checkInput('account');
                else if (this.resetForm.password === '') this.checkInput('password');
                else if (this.resetForm.verify === '') this.checkInput('verify');
                else {
                    reset({
                        data: this.resetForm,
                        type: this.resetType
                    }).then(res => {
                        if (res) {
                            Message.success(res['msg']);
                            setTimeout(() => {
                                this.$router.push('/');
                            }, 500);
                        }
                    });
                }
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'resetPassword');
        },
    }
</script>

<style lang="less">
    #reset-password {
        @reset-color: #0F82F8;
        overflow-x: initial;
        height: 100%;
        background-color: #f1f1f1;
        font-size: 12px;
        line-height: normal;

        .container {
            position: relative;
            margin: 0 auto;
            width: 100%;
            max-width: 960px;
            display: block;

            &:after {
                display: table;
                content: "";
                clear: both;
            }
        }

        form {
            margin: 72px auto;
            width: 480px;
            max-width: 100%;
        }

        a {
            text-decoration: none;
            cursor: pointer;
            color: #909090;
        }

        .btn {
            padding: 10px 19px;
            color: #fff;
            background-color: @reset-color;
            border-radius: 2px;
            border: none;
            transition: background-color .3s, color .3s;
            margin: initial;
        }

        .reset-password-form {
            padding: 48px 36px;
            font-size: 14px;
            background-color: #fff;
            border-radius: 2px;
            box-sizing: border-box;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
        }

        .form-header {
            .title {
                margin: 0;
                font-size: 24px;
                text-align: center;
            }

            .nav {
                display: flex;
                margin-top: 36px;
                background-color: #f8f9fa;
                border-bottom: 1px solid #f1f1f1;
                user-select: none;
            }

            .nav-item {
                flex: 1 1 auto;
                padding: 10px 12px;
                text-align: center;
                position: relative;
                cursor: pointer;
            }

            .active {
                color: @reset-color;
                border-bottom: 2px solid;
            }
        }

        .form-body {
            margin-top: 36px;
            text-align: center;

            .panel {
                position: relative;
            }

            .input-group {
                display: flex;

                input {
                    margin: 0;
                    padding: 6px 0;
                    font-size: 14px;
                    border: none;
                    border-bottom: 1px solid #eee;
                    outline: none;
                    overflow: visible;
                }

                &:not(:first-child) {
                    margin-top: 24px;
                }

                .full-width {
                    input {
                        width: 100%;
                    }
                }

                .verify-input {
                    input {
                        flex: 1 1 auto;
                    }
                }

                .send-btn {
                    flex: 0 0 auto;
                    margin-left: 12px;
                }
            }

            .submit-btn {
                width: 100%;
                padding: 12px 19px;
                margin-top: 36px;
            }
        }

        .form-footer {
            .index-link {
                display: inline-block;
                margin: 18px auto 0;
                color: @reset-color;
            }
        }
    }
</style>
