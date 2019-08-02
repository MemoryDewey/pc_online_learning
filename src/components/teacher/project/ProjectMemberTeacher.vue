<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="search-area">
                <searchBarMid @searchInfo="handleSearchInfo" :searchColumnArr="searchColumnArr"
                              :isSelectCom="isSelectCom" :searchOptionArr="searchOptionArr"></searchBarMid>
            </div>
        </div>
        <div class="flex-list">
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
                        <span><font-awesome-icon icon="info-circle"></font-awesome-icon></span>
                    </div>
                    <div class="box-text">
                        <div>暂无项目信息</div>
                    </div>
                </div>
            </div>
            <!--课程不存在 E-->
            <!--课程存在 S-->
            <div class="flex-list-item" v-else v-for="project in projects" :key="project['projectID']">
                <div class="flex-row head">
                    <div class="time">{{project.ProjectCreatorMemberInfo['joinTime']}}</div>
                </div>
                <div class="flex-row content">
                    <div class="flex-cell first cover">
                        <router-link :to="`/project/${project['projectID']}/information`">
                            <div class="title">{{project['projectName']}}</div>
                        </router-link>
                    </div>
                    <div class="flex-cell price">{{project.ProjectCreatorMemberInfo['frozenBalance']}}</div>
                    <div class="flex-cell state">
                        项目状态:{{myTotalOption.labelProjectStatus[project.projectStatue]}}<br/>互评阶段:{{myTotalOption.labelRemarkPhase[project.remarkPhase]}}
                    </div>
                    <div class="flex-cell operating">
                        <a class="btn-operate mark"
                           @click="openDialog(project)">
                            成员管理
                        </a>
                    </div>
                </div>
            </div>
            <!--课程存在 E-->
            <!--课程列表 E-->
            <!--分页 S-->
            <div class="sort-page" v-if="projects.length>0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="10" @current-change="projectPageChanged"
                               :total="10*projectCount"
                               :current-page.sync="currentPage">
                </el-pagination>
            </div>
            <!--分页 E-->
        </div>
        <!--对话框 S-->
        <el-dialog title="成员管理" :visible.sync="memberFormVisible" width="600px">
            <el-form :model="memberForm">
                <el-form-item label="项目ID">
                    {{memberForm.projectID}}
                </el-form-item>
                <el-form-item label="项目名">
                    {{memberForm.projectName}}
                </el-form-item>
                <el-form-item>
                    <el-table
                            :data="memberForm.memberList"
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
                                label="当前余额"
                                prop="frozenBalance"
                        >
                        </el-table-column>
                        <el-table-column
                                label="代码能力评分">
                            <template slot-scope="scope">
                                <div>
                                    <el-button
                                            @click.native.prevent="deleteProjectMember(scope.row)"
                                            type="text"
                                            size="small"
                                            :disabled="memberForm.projectStatue==1">
                                        移除成员
                                    </el-button>
                                    <el-button
                                            @click.native.prevent="rewardProjectMember(scope.row)"
                                            type="text"
                                            size="small"
                                            :disabled="(memberForm.projectStatue==1)">
                                        成员奖励
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="memberFormVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
        <!--对话框 E-->
        <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                            :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>

        <el-dialog title="发起项目奖励/惩罚" :visible.sync="rewardFormVisible" width="600px">
            <el-form :model="rewardForm">
                <el-form-item label="项目ID">
                    <el-input v-model="rewardForm.projectID" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="操作成员ID">
                    <el-input v-model="rewardForm.awardMember" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="操作额度">
                    <el-input v-model="rewardForm.awardAmount" type="text" autocomplete="off"
                              :change="check_num(value,'rewardForm','awardAmount')"></el-input>
                </el-form-item>
                <el-form-item label="操作类型">
                    <el-select v-model="rewardForm.awardType" placeholder="请选择操作类型">
                        <el-option
                                v-for="item in myTotalOption.optionRewardType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理者目前余额">
                    <el-input v-model="rewardForm.creatorBalance" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="操作对象目前余额">
                    <el-input v-model="rewardForm.memberBalance" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="操作理由">
                    <el-input v-model="rewardForm.awardReason" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rewardFormVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="!rewardForm.rewardCheck" @click="submitReward()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SearchBar_mid from '../../common/SearchBarMid';
    import InformationDialog from '../../common/InformationDialog'
    import {Message, MessageBox, ElTabs} from 'element-ui'
    import {
        TotalOption,
    } from '../../../utils/constant/options';
    import {
        deleteProjectMember,
        getProjectAuth,
        getProjectCountAuth,
        getProjectMember,
        submitProjectScore
    } from "../../../api/project";

    export default {
        name: "ProjectMember",
        data() {
            return {
                projectCount: 1,
                projects: [],
                dialogCourseID: 0,
                myTotalOption: [],
                memberForm: {
                    projectID: "",
                    projectName: "",
                    projectStatue: 0,
                    memberList: [],
                    creatorBalance: 0,
                },
                memberFormVisible: false,
                rewardForm: {
                    rewardCheck: false,
                    projectID: "",
                    awardMember: "",
                    awardAmount: "",
                    awardType: "",
                    creatorBalance: "",
                    memberBalance: "",
                    awardReason: "",
                },
                rewardFormVisible: false,
                infoDialogVisible: false,
                infoArr: [{title: 'defualt', value: 'default'}],
                infoTableWidth: 0,
                infoTable: [],
                // Search MID BAR
                searchColumnArr: [],
                isSelectCom: {},
                searchOptionArr: {},
                searchColumn: "",
                searchContent: "",
                currentPage: 1,
            }
        },
        methods: {
            check_num: function (val, formname, value) {
                var awardAmount = this[formname][value];
                awardAmount = awardAmount.toString().replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
                if (awardAmount.indexOf('.') < 0 && awardAmount != '') {
                    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    awardAmount = parseInt(awardAmount);
                }
                this[formname][value] = awardAmount;
            },
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
                this.infoArr.push({'title': '是否参与评分', 'value': item.boolRemark == 0 ? '否' : '是'});
                this.infoTableWidth = 0;
                this.infoTable = [];
            },
            //获取课程信息
            async getProject(page) {
                try {
                    var dict = {page}
                    if (this.searchColumn != "" && this.serachContent != "") {
                        dict[this.searchColumn] = this.searchContent
                    }
                    let response = await getProjectAuth({dict});
                    let responseCount = await getProjectCountAuth(dict);
                    if (response) {
                        this.projectCount = responseCount.count % 10 === 0 ?
                            Math.floor(responseCount.count / 10) : Math.floor(responseCount.count / 10) + 1;
                        this.projects = response.sqlres;
                    }
                } catch (e) {
                    console.log(e);
                }
            },

            //打开互评栏
            async openDialog(project) {
                try {
                    let res = await getProjectMember({projectID: project.projectID});
                    if (!res) throw "Query Failed!"
                    this.memberForm.memberList = [];
                    var ind = 0;
                    for (var index in res.sqlres) {
                        // console.log(item)
                        var item = res.sqlres[index];
                        if (item.memberType == 1) {
                            // get creator's balance
                            this.memberForm.creatorBalance = item.frozenBalance;
                        } else {
                            item.userID = item.memberID
                            this.memberForm.memberList.push(
                                item
                            );
                        }
                    }
                    // console.log(this.memberForm.memberList)
                    this.memberForm.projectID = project.projectID;
                    this.memberForm.projectName = project.projectName;
                    this.memberForm.projectStatue = project.projectStatue;
                    this.memberFormVisible = true;
                } catch (error) {
                    this.memberFormVisible = false;
                    console.log(error);
                }
            },
            // 提交得分
            rewardProjectMember: async function (item) {
                try {
                    this.rewardForm.projectID = item.projectID;
                    this.rewardForm.awardMember = item.memberID;
                    this.rewardForm.awardAmount = 0;
                    this.rewardForm.awardType = "0";
                    this.rewardForm.awardReason = "";
                    this.rewardForm.creatorBalance = this.memberForm.creatorBalance;
                    this.rewardForm.memberBalance = item.frozenBalance;
                    this.rewardFormVisible = true;
                } catch (error) {
                    console.log(error);
                    Message.error("操作失败!");
                }
            },
            submitReward: async function () {
                try {
                    let data = {};
                    data.projectID = this.rewardForm.projectID
                    data.userID = this.rewardForm.awardMember
                    data.awardType = this.rewardForm.awardType
                    data.awardAmount = this.rewardForm.awardAmount
                    data.awardReason = this.rewardForm.awardReason
                    let res = await submitProjectScore(data)
                    if (!res) throw "Fetch Failed!"
                    this.rewardFormVisible = false;
                    this.memberFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败");
                    console.log(error);
                }
            },
            deleteProjectMember: async function (item) {
                MessageBox.confirm('确定从项目中移除该成员？成员现拥有的项目内冻结资金将被退还至其钱包中。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {

                    } catch (error) {
                        let response = await deleteProjectMember({
                            projectID: item.projectID,
                            memberID: item.memberID
                        });
                        if (!response) Message.info('操作失败!');
                        else Message.success(response.msg);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            //页码改变
            projectPageChanged(val) {
                this.getProject(val);
            },

            // SearchBarMid
            handleSearchInfo(dict) {
                this.searchColumn = dict.searchColumn
                this.searchContent = dict.searchContent
                if (dict.searchInstantly == true) {
                    this.getProject(1)
                    this.currentPage = 1
                }
            },
        },
        computed: {
            rewardCheck() {
                if (0 == this.rewardForm.awardAmount) return false;
                let awdType = this.rewardForm.awardType;
                if (awdType == 0) {
                    //reward
                    if (this.rewardForm.creatorBalance < this.rewardForm.awardAmount) return false;
                } else {
                    //punishment
                    if (this.rewardForm.memberBalance < this.rewardForm.awardAmount) return false;
                }
                return true;
            }
        },
        watch: {
            rewardCheck(nval, oval) {
                this.rewardForm.rewardCheck = nval
            }
        },
        components: {
            "information-dialog": InformationDialog,
            "searchBarMid": SearchBar_mid,
        },
        created() {
            this.myTotalOption = TotalOption;
            this.getProject(1);
            // Search MID BAR
            this.searchColumnArr = [
                {'value': 'projectID', 'label': '项目ID'},
                {'value': 'projectField', 'label': '项目领域'},
            ];
            this.isSelectCom = {
                'creatorID': false,
                'projectField': true,
            };
            this.searchOptionArr = {
                'projectField': TotalOption.optionProjectField,
            };
            // Search MID BAR
        }
    }
</script>
