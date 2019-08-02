<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="search-area">
                <searchBarMid @searchInfo="handleSearchInfo" :searchColumnArr="searchColumnArr"
                              :isSelectCom="isSelectCom" :searchOptionArr="searchOptionArr"></searchBarMid>
            </div>
        </div>
        <div class="flex-list">
            <!--课程列表顶部信息 S-->
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
                <div class="flex-row content">
                    <div class="flex-cell first cover">
                        <a>
                            <img :src="project['projectPic']" alt="">
                            <div class="title">{{project['projectName']}}</div>
                        </a>
                    </div>
                    <div class="flex-cell price">{{project.ProjectCreatorMemberInfo['frozenBalance']}}</div>
                    <div class="flex-cell state">项目状态:{{myTotalOption.labelProjectStatus[project.projectStatue]}}<br/>互评阶段:{{myTotalOption.labelRemarkPhase[project.remarkPhase]}}
                    </div>
                    <div class="flex-cell operating">
                        <el-dropdown style="cursor: pointer">
                        <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                        @click.native.prevent="closeProjectApply(project['projectID'])">关闭课程
                                </el-dropdown-item>
                                <el-dropdown-item
                                        @click.native.prevent="modifyProject(project)">编辑
                                </el-dropdown-item>
                                <el-dropdown-item
                                        @click.native.prevent="openInvestForm(project)"
                                        :disabled="(project.projectStatue!=0)">
                                    投资
                                </el-dropdown-item>
                                <el-dropdown-item :disabled="(project.remarkPhase!='OPEN')"
                                                  @click.native.prevent="openDialog(project['projectID'])">项目评分
                                </el-dropdown-item>
                                <el-dropdown-item :disabled="((project.remarkPhase!='OPEN'))"
                                                  @click.native.prevent="openProScoreForm(project['projectID'])">确认评分
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

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
        <el-dialog title="发起项目评分" :visible.sync="scoreFormVisible" width="600px">
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

        <el-dialog title="项目成绩单" :visible.sync="proScoreFormVisible" width="600px">
            <el-form :model="proScoreForm">
                <el-form-item label="项目ID">
                    <el-input v-model="proScoreForm.projectID" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="有效评分人数">
                    <span>{{proScoreForm.memberNum}}</span>
                </el-form-item>

                <el-form-item>
                    <el-table
                            :data="proScoreForm.scoreList"
                            border
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="userID"
                                label="成员ID"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                label="设计创新评分"
                                prop="desScore"
                        >
                        </el-table-column>
                        <el-table-column
                                label="代码能力评分"
                                prop="codScore">
                        </el-table-column>
                        <el-table-column
                                label="态度评分"
                                prop="attScore">
                        </el-table-column>
                        <el-table-column
                                label="成员总评分">
                            <template slot-scope="scope">
                                {{scope.row.desScore+scope.row.codScore+scope.row.attScore}}
                            </template>

                        </el-table-column>
                    </el-table>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="proScoreFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirmProScore()">结束评分流程并登记成绩</el-button>
            </div>
        </el-dialog>

        <el-dialog title="发起项目投资" :visible.sync="investFormVisible" width="600px">
            <el-form :model="investForm">
                <el-form-item label="项目ID">
                    <el-input v-model="investForm.projectID" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="项目名称">
                    <el-input v-model="investForm.projectName" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="投资额度">
                    <el-input v-model.number="investForm.payAmount" type="number" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="investFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitInvest()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="项目信息编辑" :visible.sync="modifyFormVisible" width="600px" style="text-align: left">
            <el-form :model="modifyForm">
                <el-form-item label="项目ID">
                    <el-input v-model="modifyForm.projectID" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="项目名称">
                    <el-input v-model="modifyForm.projectName" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="项目封面">
                    <el-upload
                            class="cover"
                            enctype="multipart/form-data"
                            name="projectavatar"
                            :data="uploadData"
                            action="/api/project/projectmanagement/updateAvatar"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <!--  -->
                        <el-image :src="modifyForm.projectPic">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </el-upload>
                </el-form-item>

                <el-form-item label="项目费用（保证金）/单位(BST)">
                    <el-input v-model.number="modifyForm.projectFee" type="number" autocomplete="off"
                              :change="check_num(val,'modifyForm','projectFee')"></el-input>
                </el-form-item>

                <el-form-item label="项目介绍">
                    <el-input v-model="modifyForm.projectIntro" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目领域">
                    <el-select v-model="modifyForm.projectField" placeholder="请选择项目领域">
                        <el-option
                                v-for="item in myTotalOption.optionProjectField"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modifyFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitModify()">确 定</el-button>
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
        closeProject,
        confirmProScore,
        getProjectAuth,
        getProjectCountAuth,
        getProjectMember, getProScore,
        modifyProject, submitInvest,
        submitProjectScore
    } from "../../../api/project";

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
                proScoreFormVisible: false,
                proScoreForm: {
                    projectID: "",
                    scoreList: "",
                },
                investFormVisible: false,
                investForm: {
                    projectID: '',
                    projectName: '',
                    payAmount: '',
                },
                modifyFormVisible: false,
                modifyForm: {
                    projectID: '',
                    projectName: '',
                    projectPic: '',
                    projectField: '',
                    projectFee: '',
                    projectIntro: '',
                },
                uploadData: {},
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
            async openDialog(projectID) {
                try {
                    let res = await getProjectMember({projectID});
                    if (!res) throw "Query Failed!"
                    this.scoreForm.memberList = [];
                    var ind = 0;
                    var ind = 0;
                    for (var index in res.sqlres) {
                        // console.log(item)
                        var item = res.sqlres[index];
                        if (item.memberType == 1) {
                            ;
                        } else {
                            item.userID = item.memberID
                            item.memberDesignScore = 0
                            item.memberCodeScore = 0
                            item.memberAttitudeScore = 0
                            item.memberScore = 0
                            this.scoreForm.memberList.push(
                                item
                            );
                        }
                    }
                    // console.log(this.scoreForm.memberList)
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
                    for (var index in this.scoreForm.memberList) {
                        this.scoreForm.memberList[index].designScore = this.scoreForm.memberList[index].memberDesignScore
                        this.scoreForm.memberList[index].codeScore = this.scoreForm.memberList[index].memberCodeScore
                        this.scoreForm.memberList[index].attitudeScore = this.scoreForm.memberList[index].memberAttitudeScore
                    }
                    let res = await submitProjectScore({
                        projectID: this.scoreForm.projectID,
                        memberList: this.scoreForm.memberList
                    })
                    if (!res) throw "Failed"
                    this.scoreFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败，非法操作/数据或你已经完成评分!");
                    this.scoreFormVisible = false;
                    console.log(error);
                }
            },
            submitModify: async function () {
                try {
                    let res = await modifyProject({
                        'projectID': this.modifyForm.projectID,
                        'projectName': this.modifyForm.projectName,
                        'projectField': this.modifyForm.projectField,
                        'projectFee': this.modifyForm.projectFee,
                        'projectIntro': this.modifyForm.projectIntro,
                    })
                    if (!res) throw "Failed"
                    this.modifyFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败");
                    this.modifyFormVisible = false;
                    console.log(error);
                }
            },
            //页码改变
            projectPageChanged(val) {
                this.getProject(val);
            },

            // 查询项目最终评分
            openProScoreForm: async function (qid) {
                try {
                    let res = await getProScore({'projectID': qid})
                    if (res.flag == false) throw "Query Failed!"
                    this.proScoreForm.scoreList = res.scoreList;
                    this.proScoreForm.memberNum = res.memberNum;
                    this.proScoreForm.projectID = qid;
                    this.proScoreFormVisible = true;
                } catch (error) {
                    this.proScoreFormVisible = false;
                    console.log(error);
                }

            },
            // 确认项目最终得分并结束互评阶段
            comfirmProScore: async function () {
                try {
                    let res = await confirmProScore({'projectID': this.proScoreForm.projectID})
                    if (!res) throw "Query Failed!"
                    this.$message.success("操作成功")
                    this.proScoreFormVisible = false;
                } catch (error) {
                    this.$message.error("操作失败")
                    this.proScoreFormVisible = false;
                    console.log(error);
                }

            },
            closeProjectApply: async function (projectID) {
                MessageBox.confirm('确定对该项目进行关闭操作？项目关闭后，互评阶段将自动开启，且各成员将根据冻结资金的分配形式获取奖励。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let data = {
                            params: {projectID}
                        };
                        let res = await closeProject(data)
                        if (!res) throw "Fetch Failed!"
                        Message.success("操作成功");
                    } catch (error) {
                        Message.error("操作失败");
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            openInvestForm: async function (projectItem) {
                try {
                    this.investForm.projectName = projectItem.projectName;
                    this.investForm.projectID = projectItem.projectID;
                    this.investForm.payAmount = 0;
                    this.investFormVisible = true;
                } catch (error) {
                    this.rewardFormVisible = false;
                    console.log(error);
                }
            },
            submitInvest: async function () {
                try {
                    let data = {};
                    data.projectID = this.investForm.projectID
                    data.payAmount = this.investForm.payAmount
                    console.log(data);
                    let res = await submitInvest(data)
                    if (!res) throw "Fetch Failed!"
                    this.investFormVisible = false;
                    Message.success("操作成功");
                } catch (error) {
                    Message.error("操作失败");
                    console.log(error);
                }
            },
            modifyProject: function (project) {
                this.uploadData = {'projectID': project.projectID};
                this.modifyForm.projectID = project.projectID;
                this.modifyForm.projectName = project.projectName;
                this.modifyForm.projectPic = project.projectPic;
                this.modifyForm.projectField = String(project.projectField);
                this.modifyForm.projectFee = project.projectFee;
                this.modifyForm.projectIntro = project.projectIntro;
                this.modifyFormVisible = true;
            },
            /* 更改头像成功后执行 */
            handleAvatarSuccess(res, file) {
                if (res.status === 1) {
                    this.modifyForm.projectPic = URL.createObjectURL(file.raw);
                } else
                    Message.error(res.msg);
            },
            /* 在提交头像之前检查 */
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) Message.error('上传头像图片只能是 JPG 格式!');
                if (!isLt2M) Message.error('上传头像图片大小不能超过 2MB!');
                return isJPG && isLt2M;
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
