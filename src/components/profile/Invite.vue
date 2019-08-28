<template>
    <div class="flex-list">
        <!--考试列表顶部信息 S-->
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">用户名</div>
                <div class="flex-cell first">邀请时间</div>
            </div>
        </div>
        <!--考试列表顶部信息 E-->
        <!--考试不存在 S-->
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
        <!--考试不存在 E-->
        <!--课程存在 S-->
        <div class="flex-list-item" v-else v-for="invite in invites" :key="invite.id">
            <div class="flex-row content">
                <div class="flex-cell first">{{invite['Invited'].nickname}}</div>
                <div class="flex-cell first">{{invite['createdAt']}}</div>
            </div>
        </div>
        <!--课程存在 E-->
        <!--分页 S-->
        <div class="sort-page" v-if="invites.length>0">
            <el-pagination background layout="prev, pager, next" @current-change="pageChanged"
                           :total="10*count">
            </el-pagination>
        </div>
        <!--分页 E-->
    </div>
</template>

<script>
    import {getInvite} from '../../api/profile'

    export default {
        name: "Invite",
        data() {
            return {
                count: 1,
                invites: [],
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
            }
        },
        created() {
            this.getInvite(1);
        }
    }
</script>
