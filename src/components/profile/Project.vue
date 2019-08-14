<template>
    <div class="flex-list">
        <!--课程列表顶部信息 S-->
        <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="项目管理" name="first">
                    <div class="flex-list-header">
                        <div class="flex-row">
                            <div class="flex-cell first">项目</div>
                            <div class="flex-cell">冻结资产</div>
                            <div class="flex-cell">状态</div>
                            <div class="flex-cell">操作</div>
                        </div>
                    </div>
                    <!--课程列表顶部信息 E-->
                    <!--课程列表 S-->
                    <!--课程不存在 S-->
                    <div class="flex-list-no-data" v-if="projects.length===0">
                        <div class="status-box">
                            <div class="box-icon">
                        <span>
                            <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </span>
                            </div>
                            <div class="box-text">
                                <div>暂无项目信息</div>
                            </div>
                        </div>
                    </div>
                    <!--课程不存在 E-->
                    <!--课程存在 S-->
                    <div class="flex-list-item" v-else v-for="project in projects" :key="project['projectID']">
                        <div class="flex-row content">
                            <div class="flex-cell first cover">
                                <router-link :to="`/project/${project['projectID']}/information`">
                                    <img v-lazy="project['projectPic']" alt=""/>
                                    <div class="title">{{project['projectName']}}</div>
                                </router-link>
                            </div>
                            <div class="flex-cell price">{{project.ProjectMembers[0]['frozenBalance']}}</div>
                            <div class="flex-cell state">
                                项目状态:{{myTotalOption.labelProjectStatus[project.projectStatue]}}<br/>互评阶段:{{myTotalOption.labelRemarkPhase[project.remarkPhase]}}
                            </div>
                            <div class="flex-cell operating">
                                <a :class="[project.remarkPhase!=='OPEN'?'btn-operate-disabled':'btn-operate']"
                                   @click="openDialog(project['projectID'])">
                                    项目评分
                                </a>
                                <a class="btn-operate" @click="memberInfo(project.ProjectMembers[0])">
                                    成员详情
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--课程存在 E-->
                    <!--课程列表 E-->
                    <!--分页 S-->
                    <div class="course-sort-page" v-if="projects.length>0">
                        <el-pagination background layout="prev, pager, next"
                                       :pager-count="10" @current-change="projectPageChanged"
                                       :total="10*projectCount">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="申请管理" name="second">
                    <div class="flex-list-header">
                        <div class="flex-row">
                            <div class="flex-cell first">项目</div>
                            <div class="flex-cell">支付事件号</div>
                            <div class="flex-cell">申请状态</div>
                            <div class="flex-cell">操作</div>
                        </div>
                    </div>
                    <!--课程列表顶部信息 E-->
                    <!--课程列表 S-->
                    <!--课程不存在 S-->
                    <div class="flex-list-no-data" v-if="applyRecords.length===0">
                        <div class="status-box">
                            <div class="box-icon">
                                <span class="fas fa-info-circle"></span>
                            </div>
                            <div class="box-text">
                                <div>暂无申请信息</div>
                            </div>
                        </div>
                    </div>
                    <!--课程不存在 E-->
                    <!--课程存在 S-->
                    <div class="flex-list-item" v-else v-for="apply in applyRecords" :key="apply['applyID']">
                        <div class="flex-row head">
                            <!-- <div class="time">{{project.ProjectMembers[0]['joinTime']}}</div> -->
                        </div>
                        <div class="flex-row content">
                            <div class="flex-cell first cover">
                                <router-link :to="`/project/${apply.ProjectInformation['projectID']}/information`">
                                    <img v-lazy="apply.ProjectInformation['projectPic']" alt=""/>
                                    <div class="title">{{apply.ProjectInformation['projectName']}}</div>
                                </router-link>
                            </div>
                            <div class="flex-cell price">{{(apply.paymentID===undefined)?"暂无":apply.paymentID}}</div>
                            <div class="flex-cell state">{{myTotalOption.labelProjectApplyStatue[apply.applyStatue]}}
                            </div>
                            <div class="flex-cell operating">
                                <a :class="[apply.applyStatue!=='PENDING'?'btn-operate-disabled':'btn-operate']"
                                   @click="redirectToPayment">
                                    进行支付
                                </a>
                                <a :class="[apply.applyStatue!=='PENDING'?'btn-operate-disabled':'btn-operate']"
                                   @click="cancelApply(apply['applyID'])">
                                    取消报名
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--课程存在 E-->
                    <!--课程列表 E-->
                    <!--分页 S-->
                    <div class="sort-page" v-if="applyRecords.length>0">
                        <el-pagination background layout="prev, pager, next"
                                       :pager-count="10" @current-change="applyPageChanged"
                                       :total="10*applyCount">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>

        <!--分页 E-->
        <!--对话框 S-->
        <el-dialog title="发起项目评分" :visible.sync="scoreFormVisible" width="850px">
            <el-form :model="scoreForm">
                <el-form-item label="项目ID">
                    {{scoreForm.projectID}}
                </el-form-item>

                <el-form-item>
                    <el-table
                            :data="scoreForm.memberList"
                            border
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="memberID"
                                label="成员ID"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="UserInformation.nickname"
                                label="成员姓名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                label="设计创新评分"
                        >
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.memberDesignScore" :min="0" :max="40"
                                                 size="mini"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="代码能力评分">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.memberCodeScore" :min="0" :max="40"
                                                 size="mini"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="态度评分">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.memberAttitudeScore" :min="0" :max="20"
                                                 size="mini"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="成员总评分">
                            <template slot-scope="scope">
                                {{scope.row.memberDesignScore+scope.row.memberCodeScore+scope.row.memberAttitudeScore}}
                            </template>

                        </el-table-column>
                    </el-table>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="scoreFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitScore()">确 定</el-button>
            </div>
        </el-dialog>
        <!--对话框 E-->
        <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                            :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>
    </div>

</template>

<script>
    import InformationDialog from '../common/InformationDialog'
    import {Message, MessageBox, ElTabs} from 'element-ui'
    import {
        TotalOption,
    } from '../../utils/constant/options';
    import {
        getProjectAuth,
        getProjectCountAuth,
        getProjectMember,
        submitProjectScore,
        cancelApply,
        getApplyCountRecord,
        getApplyRecord
    } from '../../api/project'

    export default {
        name: "Project",
        data() {
            return {
                projectCount: 1,
                applyCount: 1,
                activeName: 'first',
                projects: [],
                applyRecords: [],
                dialogCourseID: 0,
                dialogVisible: false,
                dialogFormInfo: {
                    title: '评价课程',
                    rateValue: 5,
                    remain: 1000,
                    qualified: true,
                    errorMsg: '',
                    text: ''
                },
                myTotalOption: [],
                scoreForm: {
                    projectID: "",
                    memberList: [],
                },
                scoreFormVisible: false,

                infoDialogVisible: false,
                infoArr: [{title: 'defualt', value: 'default'}],
                infoTableWidth: 0,
                infoTable: [],
            }
        },
        methods: {
            handleDialogClose() {
                this.infoDialogVisible = false;
            },
            // 跳转至支付页面
            redirectToPayment() {
                this.$router.replace({path: '/profile/wallet'});
            },
            memberInfo(item) {
                this.infoDialogVisible = true;
                this.infoArr = [];
                this.infoArr.push({'title': '项目ID', 'value': item.projectID});
                this.infoArr.push({'title': '成员类型', 'value': this.myTotalOption.labelMemberType[item.memberType]});
                this.infoArr.push({'title': '冻结金额', 'value': item.frozenBalance});
                this.infoArr.push({'title': '是否参与评分', 'value': item.boolRemark === 0 ? '否' : '是'});
                this.infoTableWidth = 0;
                this.infoTable = [];
            },
            async getProject(page) {
                let response = await getProjectAuth({page});
                if (response) this.projects = response.sqlres;
                response = await getProjectCountAuth();
                if(response)this.projectCount = response.pageSum;
            },
            async getAttendApply(page) {
                let response = await getApplyRecord({page});
                if (response) this.applyRecords = response.sqlres;
                response = await getApplyCountRecord();
                this.projectCount = response.pageSum;
            },

            //打开互评栏
            async openDialog(projectID) {
                try {
                    let res = await getProjectMember({projectID});
                    if (!res) throw "Query Failed!";
                    this.scoreForm.memberList = [];
                    var ind = 0;
                    for (var index in res.sqlres) {
                        // console.log(item)
                        var item = res.sqlres[index];
                        if (item.memberType === 1) {
                        } else {
                            item.userID = item.memberID;
                            item.memberDesignScore = 0;
                            item.memberCodeScore = 0;
                            item.memberAttitudeScore = 0;
                            item.memberScore = 0;
                            this.scoreForm.memberList.push(item);
                        }
                    }
                    this.scoreForm.projectID = projectID;
                    this.scoreFormVisible = true;
                } catch (error) {
                    this.scoreFormVisible = false;
                    console.log(error);
                }
            },
            // 提交得分
            submitScore: async function () {
                try {
                    for (let index of this.scoreForm.memberList) {
                        index.designScore = index.memberDesignScore;
                        index.codeScore = index.memberCodeScore;
                        index.attitudeScore = index.memberAttitudeScore
                    }
                    let res = await submitProjectScore({
                        projectID: this.scoreForm.projectID,
                        memberList: this.scoreForm.memberList
                    });
                    if (!res) throw "Failed";
                    this.scoreFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败，非法操作/数据或你已经完成评分!");
                    this.scoreFormVisible = false;
                    console.log(error);
                }
            },

            //取消报名
            async cancelApply(applyID) {
                MessageBox.confirm('确定取消报名该项目？相关的支付事件将被自动删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await cancelApply({applyID});
                    if (response) {
                        Message.success(response.msg);
                        this.getAttendApply(1);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            //页码改变
            projectPageChanged(val) {
                this.getProject(val);
            },
            // 页码改变（项目参加申请）
            applyPageChanged(val) {
                this.getAttendApply(val);
            },
        },
        components: {
            "information-dialog": InformationDialog,
        },
        created() {
            this.myTotalOption = TotalOption;
            this.getProject(1);
            this.getAttendApply(1);
        }
    }
</script>
