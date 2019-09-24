<template>
    <div class="personal-main">
        <table>
            <tbody>
            <tr>
                <td class="top-line">
                    <el-upload
                            class="avatar"
                            enctype="multipart/form-data"
                            name="avatar"
                            action="/api/profile/personal/avatar"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :headers="headers"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" alt="">
                        <div v-else class="avatar-uploader-icon">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                        </div>
                    </el-upload>
                </td>
                <td class="top-line">
                    <el-upload
                            action="/api/profile/personal/avatar"
                            name="avatar"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :headers="headers"
                            :show-file-list="false">
                        <a class="btn btn-normal">更换头像</a>
                    </el-upload>
                </td>
            </tr>
            <tr>
                <td class="setting-title">昵称</td>
                <td>
                    <label>
                        <input type="text" placeholder="请输入昵称"
                               v-model="informationForm.nickname"
                               style="height: 32px;width: 220px"
                               @keyup="informationValidate.nickname = informationForm.nickname.length>15">
                        </input>
                    </label>
                    <span class="input-error" v-if="informationValidate.nickname">昵称长度超过限制</span>
                </td>
            </tr>
            <tr>
                <td class="setting-title">姓名</td>
                <td>
                    <label>
                        <input type="text" placeholder="您的真实姓名"
                               v-model="informationForm.realName"
                               style="height: 32px;width: 220px"
                               @keyup="informationValidate.realName = informationForm.realName.length > 15">
                        </input>
                    </label>
                    <span class="input-error" v-if="informationValidate.realName">姓名长度超过限制</span>
                </td>
            </tr>
            <tr>
                <td class="setting-title">性别</td>
                <td>
                    <label class="label-radio">
                        <input type="radio" name="sex" value="S" checked="checked"
                               v-model="informationForm.sex"></input>
                        <span>保密</span>
                    </label>
                    <label class="label-radio">
                        <input type="radio" name="sex" value="M" v-model="informationForm.sex"></input>
                        <span>男</span>
                    </label>
                    <label class="label-radio">
                        <input type="radio" name="sex" value="F" v-model="informationForm.sex"></input>
                        <span>女</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td class="setting-title">生日</td>
                <td>
                    <el-date-picker v-model="informationForm.birthday" size="small" type="date"
                                    placeholder="选择日期"></el-date-picker>
                </td>
            </tr>
            <tr>
                <td class="setting-title">邮箱</td>
                <td v-if="informationForm.email === ''">
                    <a class="btn btn-normal" @click="openEmailDialog">点击绑定</a>
                </td>
                <td v-else>
                    <div class="set-up">
                        <div>{{informationForm.email}}</div>
                        <font-awesome-icon icon="check"></font-awesome-icon>
                        <span>已验证</span>
                        <a class="change-bind" @click="deleteEmail">解除绑定</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="setting-title">手机</td>
                <td v-if="informationForm.mobile === ''">
                    <router-link class="btn btn-normal" to="/passport/register">点击绑定</router-link>
                </td>
                <td v-else>
                    <div class="set-up">
                        <div>{{informationForm.mobile}}</div>
                        <font-awesome-icon icon="check"></font-awesome-icon>
                        <span>已验证</span>
                        <a class="change-bind" @click="openDialog">更换绑定的手机号</a>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <input class="btn setting-save" value="保存" @click="saveInformation" type="button"></input>
        <!--更换手机号对话框 S-->
        <el-dialog title="绑定手机号" :visible.asnc="dialogFormVisible" width="400px"
                   @close="dialogFormVisible = false">
            <!--更换手机号 S-->
            <el-steps :active="stepsActive" finish-status="success" align-center>
                <el-step title="安全验证"></el-step>
                <el-step title="修改手机"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <form v-if="stepsActive <= 2">
                <div class="input-area">
                    <label class="first" v-if="dialogFormInfo.oldMobile.show">
                        <input type="text" placeholder="原手机号" @keyup="verifyDialogInput('oldMobile')"
                               v-model="dialogForm.account"></input>
                        <font-awesome-icon icon="mobile-alt"></font-awesome-icon>
                        <font-awesome-icon v-if="dialogFormInfo.oldMobile.success" class="check" icon="check-circle"
                                           style="color: #67c23a"></font-awesome-icon>
                        <font-awesome-icon v-if="dialogFormInfo.oldMobile.error" class="check" icon="times-circle"
                                           style="color: red"></font-awesome-icon>
                    </label>
                    <label class="first" v-if="dialogFormInfo.newMobile.show">
                        <input type="text" placeholder="新手机号" @keyup="verifyDialogInput('newMobile')"
                               v-model="dialogForm.account"></input>
                        <font-awesome-icon icon="mobile-alt"></font-awesome-icon>
                        <font-awesome-icon v-if="dialogFormInfo.newMobile.success" class="check" icon="check-circle"
                                           style="color: #67c23a"></font-awesome-icon>
                        <font-awesome-icon v-if="dialogFormInfo.newMobile.error" class="check" icon="times-circle"
                                           style="color: red"></font-awesome-icon>
                    </label>
                </div>
                <div class="input-area">
                    <label class="second">
                        <input v-model="dialogForm.verifyCode" type="text" placeholder="验证码"></input>
                        <font-awesome-icon icon="shield-alt"></font-awesome-icon>
                        <a :class="{'btn-send':true,disable:(!dialogFormInfo.sendButton || dialogFormInfo.oldMobile.sending)}"
                           @click="sendVerifyCode('stepOne')"
                           v-if="dialogFormInfo.oldMobile.show"
                        >{{dialogFormInfo.oldMobile.sendButtonText}}</a>
                        <a :class="{'btn-send':true,disable:!dialogFormInfo.sendButton || dialogFormInfo.newMobile.sending}"
                           @click="sendVerifyCode('stepTwo')"
                           v-if="dialogFormInfo.newMobile.show"
                        >{{dialogFormInfo.newMobile.sendButtonText}}</a>
                    </label>
                </div>
            </form>
            <!--更换手机号 E-->
            <!--对话框底部 S-->
            <div slot="footer" class="dialog-footer">
                <a class="btn btn-confirm" @click="changeMobileSubmit">下一步</a>
            </div>
            <!--对话框底部 E-->
        </el-dialog>
        <!--更换手机号对话框 E-->
        <!--绑定邮箱对话框 S-->
        <el-dialog title="绑定邮箱" :visible.asnc="emailDialog" width="400px" @close="emailDialog = false">
            <!--绑定邮箱 S-->
            <form>
                <div class="input-area">
                    <label class="first">
                        <input type="text" placeholder="邮箱" @keyup="verifyEmailInput"
                               v-model="emailDialogInfo.account">
                        </input>
                        <font-awesome-icon icon="envelope"></font-awesome-icon>
                        <font-awesome-icon icon="check-circle" v-if="emailDialogInfo.success" class="check"
                                           style="color: #67c23a"></font-awesome-icon>
                        <font-awesome-icon v-if="emailDialogInfo.error" icon="times-circle" class="check"
                                           style="color: red"></font-awesome-icon>
                    </label>
                </div>
                <div class="input-area">
                    <label class="second">
                        <input v-model="dialogForm.verifyCode" type="text" placeholder="验证码"></input>
                        <font-awesome-icon icon="shield-alt"></font-awesome-icon>
                        <a :class="{'btn-send':true,disable:(!emailDialogInfo.sendButton || emailDialogInfo.sending)}"
                           @click="sendVerifyCode('bindEmail')"
                        >{{emailDialogInfo.sendButtonText}}</a>
                    </label>
                </div>
            </form>
            <!--绑定邮箱 E-->
            <!--对话框底部 S-->
            <div slot="footer" class="dialog-footer">
                <a class="btn btn-confirm" @click="bindEmailSubmit">确定</a>
            </div>
            <!--对话框底部 E-->
        </el-dialog>
        <!--绑定邮箱对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {sendEmail, sendMessage, changePhone, addEmail, deleteEmail} from "@/api/passport";
    import {getPersonalInfo, updatePersonal} from "@/api/profile"

    export default {
        name: "Personal",
        data() {
            return {
                imageUrl: '',
                informationForm: {
                    birthday: '', sex: 'S', nickname: '', realName: '', mobile: '', email: ''
                },
                informationValidate: {
                    nickname: false, realName: false
                },
                dialogFormVisible: false,
                phoneDialog: false,
                emailDialog: false,
                stepsActive: 0,
                dialogFormInfo: {
                    sendButton: false,
                    oldMobile: {
                        show: false, success: false, error: false, sending: false, sendButtonText: '发送验证码'
                    },
                    newMobile: {
                        show: false, success: false, error: false, sending: false, sendButtonText: '发送验证码'
                    }
                },
                emailDialogInfo: {
                    success: false, error: false, sendButton: false,
                    account: '', verifyCode: '', sendButtonText: '发送验证码',
                    sending: false
                },
                dialogForm: {
                    account: '',
                    verifyCode: ''
                },
                headers: {Authorization: localStorage.getItem('token')}
            }
        },
        async created() {
            let response = await getPersonalInfo();
            if (response) {
                let data = response.data;
                this.informationForm.nickname = data.nickname;
                this.informationForm.realName = data.realName;
                this.informationForm.sex = data.sex;
                this.informationForm.mobile = data.mobile;
                this.informationForm.birthday = data.birthday === null ? '' : data.birthday;
                this.informationForm.email = data.email === null ? '' : data.email;
                this.imageUrl = data.avatarUrl === null ? '' : `${data.avatarUrl}`;
            }
        },
        methods: {
            /* 更改头像成功后执行 */
            handleAvatarSuccess(res, file) {
                if (res.status === 1) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.$store.commit('changeAvatarUrl', `${res.avatarUrl}`);
                    Message.success('更换头像成功');
                } else Message.error(res.msg);
            },
            /* 在提交头像之前检查 */
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isJPG) Message.error('上传头像图片只能是 JPG 格式!');
                if (!isLt1M) Message.error('上传头像图片大小不能超过 1MB!');
                return isJPG && isLt1M;
            },
            /* 删除邮箱 */
            deleteEmail() {
                MessageBox.confirm('确定要解绑邮箱吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await deleteEmail();
                    if (response) {
                        this.informationForm.email = '';
                        Message.success(response.msg);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            /* 打开对话框 */
            openDialog() {
                this.dialogFormVisible = true;
                this.dialogForm.account = '';
                this.dialogForm.verifyCode = '';
                this.dialogFormInfo.oldMobile.success = false;
                this.dialogFormInfo.oldMobile.error = false;
                this.dialogFormInfo.newMobile.success = false;
                this.dialogFormInfo.newMobile.error = false;
                this.dialogFormInfo.oldMobile.show = this.stepsActive === 0;
            },
            /* 打开绑定邮箱对话框 */
            openEmailDialog() {
                this.emailDialog = true;
                this.emailDialogInfo.success = false;
                this.emailDialogInfo.error = false;
                this.emailDialogInfo.account = '';
                this.emailDialogInfo.verifyCode = '';
            },
            /* 手机号是否合法 */
            verifyDialogInput(option) {
                const regMobile = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
                let pass = this.dialogForm.account.match(regMobile);
                this.dialogFormInfo.sendButton = pass;
                this.dialogFormInfo[option].success = pass;
                this.dialogFormInfo[option].error = !pass;
            },
            /* 验证邮箱是否合法 */
            verifyEmailInput() {
                const regMail = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                let pass = this.emailDialogInfo.account.match(regMail);
                this.emailDialogInfo.sendButton = pass;
                this.emailDialogInfo.success = pass;
                this.emailDialogInfo.error = !pass;
            },
            /* 发送验证码 */
            async sendVerifyCode(option) {
                if (option === 'bindEmail') this.emailDialogInfo.sending = true;
                else if (option === 'stepOne') this.dialogFormInfo.oldMobile.sending = true;
                else if (option === 'stepTwo') this.dialogFormInfo.newMobile.sending = true;
                let times = 60;   //按钮点击间隔
                let self = this;
                let timer = await setInterval(() => {
                    if (option === 'bindEmail')
                        self.emailDialogInfo.sendButtonText = "重新发送(" + times + "s)";
                    else if (option === 'stepOne')
                        self.dialogFormInfo.oldMobile.sendButtonText = "重新发送(" + times + "s)";
                    else if (option === 'stepTwo')
                        this.dialogFormInfo.newMobile.sendButtonText = "重新发送(" + times + "s)";
                    times--;
                    if (times < 0) window.clearInterval(timer);
                }, 1000);
                setTimeout(() => {
                    if (option === 'bindEmail') {
                        self.emailDialogInfo.sending = true;
                        self.emailDialogInfo.sendButtonText = "发送验证码";
                    } else if (option === 'stepOne') {
                        self.dialogFormInfo.oldMobile.sending = true;
                        self.dialogFormInfo.oldMobile.sendButtonText = "发送验证码";
                    } else if (option === 'stepTwo') {
                        self.dialogFormInfo.newMobile.sending = true;
                        this.dialogFormInfo.newMobile.sendButtonText = "发送验证码";
                    }
                }, 61000);
                let data = {account: this.dialogForm.account, option: "change"};
                if (option === 'bindEmail') data = {account: this.emailDialogInfo.account, option: "change"};
                let res = (option === 'bindEmail') ? await sendEmail(data) : await sendMessage(data);
                if (res) Message.success(res.msg);
            },
            /* 绑定邮箱 */
            async bindEmailSubmit() {
                if (this.dialogForm.account === '') Message.error('请输入邮箱');
                else if (this.dialogForm.verifyCode === '') Message.error('请输入验证码');
                else {
                    let response = await addEmail(this.dialogForm);
                    if (response) {
                        this.dialogForm.account = '';
                        this.dialogForm.verifyCode = '';
                        this.informationForm.email = response.email;
                        Message.success(response.msg);
                        this.dialogFormVisible = false;
                    }
                }
            },
            /* 更换手机号 */
            async changeMobileSubmit() {
                if (this.stepsActive > 2) {
                    this.stepsActive = 0;
                    this.dialogFormVisible = false;
                } else if (this.stepsActive === 2) {
                    this.stepsActive += 1;
                    Message.success('已更改绑定手机号');
                } else if (this.dialogForm.account === '') Message.error('请输入手机号');
                else if (this.dialogForm.verifyCode === '') Message.error('请输入验证码');
                else {
                    let response = await changePhone({
                        data: this.dialogForm,
                        step: this.stepsActive
                    });
                    if (response) {
                        if (this.stepsActive === 0) {
                            this.dialogForm.account = '';
                            this.dialogForm.verifyCode = '';
                            this.dialogFormInfo.oldMobile.show = false;
                            this.dialogFormInfo.newMobile.show = true;
                        } else if (this.stepsActive === 1) {
                            this.dialogFormInfo.oldMobile.show = false;
                            this.dialogFormInfo.newMobile.show = false;
                            this.informationForm.mobile = response.msg;
                            this.stepsActive += 1;
                        }
                        this.stepsActive += 1;
                    }
                }
            },
            /* 页面提交更改 */
            async saveInformation() {
                let response = await updatePersonal(this.informationForm);
                if (response) {
                    this.$store.commit('changeNickname', this.informationForm.nickname);
                    Message.success(response.msg);
                }
            }
        },
    }
</script>

<style lang="less">
    .personal-main {
        padding-left: 0;
        text-align: left;

        *, :after, :before {
            box-sizing: border-box
        }

        a {
            color: #333;
            text-decoration: none;
            background: transparent;
        }

        table {
            width: 100%;
            background-color: transparent;
            border-collapse: collapse;
            border-spacing: 0;
        }

        tr {
            border-bottom: 1px solid #f0f0f0;

            &:first-child {
                border: none;
            }
        }

        td {
            padding: 20px 0;

            &:first-child {
                width: 18%;
            }

            &:last-child {
                width: 72%;
            }
        }

        input {
            padding: 5px 10px;
            font-size: 15px;
            border: 1px solid #c8c8c8;
            border-radius: 4px;
            background-color: hsla(0, 0%, 71%, .1);
        }

        span {
            margin: 0 20px 0 6px;
            font-size: 15px;
            vertical-align: middle
        }

        .btn {
            display: inline-block;
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857;
            border-radius: 4px;
            user-select: none
        }

        .top-line {
            padding-top: 0;
        }

        .avatar {
            width: 100px;
            height: 100px;
            display: block;
            cursor: pointer;

            img {
                width: 100px;
                height: 100px;
                border: 1px solid #ddd;
                border-radius: 50%;
                vertical-align: middle;
            }
        }

        .btn-normal {
            border: 1px solid #409eff;
            color: #409ef0 !important;
            padding: 4px 12px;
            line-height: normal;
            border-radius: 40px;
            background: none;
        }

        .setting-title {
            font-size: 15px;
            color: #969696;
        }

        .label-radio {
            margin-right: 20px;
        }

        .set-up {
            div {
                font-size: 15px;
                display: inline-block;
            }

            svg {
                margin-left: 10px;
                font-size: 12px;
                color: #969696;
                vertical-align: middle;
            }

            a, span {
                margin-left: 3px;
                font-size: 14px;
                color: #969696;
            }

            a {
                margin-left: 8px;
                cursor: pointer;
            }

            .change-bind {
                display: none;
            }

            &:hover .change-bind {
                display: inline-block;
            }
        }

        .input-error {
            margin: 0 20px 0 15px;
            color: red;
        }

        .setting-save {
            width: 100px;
            margin: 30px 0 60px;
            border-radius: 20px;
            border: none;
            -webkit-appearance: button;
            color: #fff;
            background-color: #409eff;
            outline: none;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            height: 100px;
            width: 100px;
            border: 1px solid #ddd;
            border-radius: 50%;
            line-height: 100px;

            svg {
                vertical-align: middle;
                margin-bottom: 5px;
            }
        }

        .el-date-editor {
            border-radius: 4px;
        }

        .el-date-editor input {
            background-color: hsla(0, 0%, 71%, .1);
            color: #000;
        }

        .el-input--prefix .el-input__inner {
            padding-left: 38px;
        }

        .el-dialog {
            border-radius: 6px;
        }

        .el-dialog__header {
            border-bottom: 1px solid #e5e5e5;
        }

        .el-dialog__body {
            padding: 30px 20px 0 20px;
        }

        .el-dialog__footer {
            padding: 15px;
        }

        .dialog-footer {
            width: 100%;
        }

        .close {
            padding: 0;
            cursor: pointer;
            background: transparent;
            border: 0;
            font-weight: 200;
            color: #999999;
            font-size: 26px;
            outline: none;
            text-shadow: none;
            float: right;
        }

        .input-area {
            position: relative;
            width: 100%;

            input {
                width: 100%;
                height: 50px;
                line-height: 50px;
                margin-bottom: 0;
                background-color: hsla(0, 0%, 71%, 0.1);
                vertical-align: middle;
                padding: 4px 12px 4px 35px !important;
                border-radius: 0;
            }

            svg {
                position: absolute;
                top: 14px;
                left: 10px;
                font-size: 18px;
                color: #969696;
            }

            .first {
                .check {
                    position: absolute;
                    left: auto;
                    right: 18px;
                }
            }

            .second {
                input {
                    border-top: 0;
                }

                .btn-send {
                    position: absolute;
                    top: 7px;
                    right: 7px;
                    width: 100px;
                    height: 36px;
                    font-size: 13px;
                    text-align: center;
                    color: #fff;
                    background-color: #409eff;
                    border-radius: 20px;
                    line-height: 36px;
                    cursor: pointer;
                }
            }

        }

        .disable {
            opacity: .5;
            pointer-events: none;
        }

        .btn-confirm {
            width: 100%;
            text-align: center;
            color: #fff;
            background-color: #409eff;
            cursor: pointer;
            border-radius: 20px;
        }

    }
</style>
