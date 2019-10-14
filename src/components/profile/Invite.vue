<template>
    <div class="flex-list">
        <div class="invite-header">
            <el-divider>
                <h1>我的邀请码
                    <el-popover placement="bottom" width="200" trigger="hover">
                        <span class="invite-code" slot="reference">{{inviteCode | inviteCodeFilter}}</span>
                        <p>邀请好友参与即可最高获得好友购买课程的<strong>20% BST</strong>费用作为邀请奖励！
                            为了保证奖励能够顺利到账，请<strong style="color: #409EFF;cursor: pointer"
                                                  @click="gotoBindWallet">绑定BST钱包</strong>后复制。</p>
                        <el-button type="primary" style="width: 100%" @click="copyInviteUrl">复制邀请链接</el-button>
                    </el-popover>
                </h1>
            </el-divider>
        </div>
        <!--列表顶部信息 S-->
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">用户名</div>
                <div class="flex-cell first">账号</div>
                <div class="flex-cell first">邀请时间</div>
            </div>
        </div>
        <!--列表顶部信息 E-->
        <!--不存在 S-->
        <div class="flex-list-no-data" v-if="invites.length===0">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无邀请信息</div>
                </div>
            </div>
        </div>
        <!--不存在 E-->
        <!--课程存在 S-->
        <div class="flex-list-item" v-else v-for="invite in invites" :key="invite.id">
            <div class="flex-row content">
                <div class="flex-cell first">{{invite['Invited'].nickname}}</div>
                <div class="flex-cell first">{{invite['Invited']['UserPassport'].phone}}</div>
                <div class="flex-cell first">{{invite['createdAt']}}</div>
            </div>
        </div>
        <!--课程存在 E-->
        <!--分页 S-->
        <div class="sort-page" v-if="invites.length>0">
            <el-pagination background layout="prev, pager, next" @current-change="pageChanged"
                           :total="10*count" :hide-on-single-page="true">
            </el-pagination>
        </div>
        <!--分页 E-->
    </div>
</template>

<script>
    import {getInvite, getInviteCode} from '@/api/profile'

    export default {
        name: "Invite",
        data() {
            return {
                count: 1,
                invites: [],
                inviteCode: ''
            }
        },
        filters: {
            inviteCodeFilter(inviteCode) {
                return inviteCode.length >= 15 ?
                    inviteCode.substr(0, 15) + "..." :
                    inviteCode;
            }
        },
        methods: {
            //获取课程信息
            async getInvite(page) {
                let response = await getInvite({page});
                if (response) {
                    this.count = response.pageSum;
                    this.invites = response.invites;
                }
            },
            //页码改变
            pageChanged(val) {
                this.getInvite(val);
            },
            gotoBindWallet() {
                this.$router.push({name: 'Wallet'});
            },
            copyInviteUrl() {
                let url = `${location.origin}/passport/register?invite=${this.inviteCode}`;
                this.$copyText(url).then(() => {
                    this.$message.success('复制成功');
                }).catch(() => {
                    this.$message.error('复制出错！');
                })
            }
        },
        created() {
            getInviteCode().then(res => {
                if (res) this.inviteCode = res.code;
            });
            this.getInvite(1);
        }
    }
</script>

<style lang="less">
    .invite-header {
        text-align: left;

        h1 {
            font-size: 22px;
            line-height: 1.3;
            font-weight: 400;
            margin: 0;
            color: #333;
        }

        .invite-code {
            font-size: 18px;
            margin-left: 10px;
            color: #999;
        }
    }
</style>
