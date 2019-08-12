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
                    <div class="flex-cell">申请人信息</div>
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
                        <span><font-awesome-icon icon="info-circle"></font-awesome-icon></span>
                    </div>
                    <div class="box-text">
                        <div>暂无申请信息</div>
                    </div>
                </div>
            </div>
            <!--课程不存在 E-->
            <!--课程存在 S-->
            <div class="flex-list-item" v-else v-for="apply in applyRecords" :key="apply['applyID']">

                <div class="flex-row content">
                    <div class="flex-cell first cover">
                        <!-- 注意ApplyInProject -->
                        <router-link :to="`/project/${apply.ApplyInProject['projectID']}/information`">
                            <div class="title">{{apply.ApplyInProject['projectName']}}</div>
                        </router-link>
                    </div>
                    <div class="flex-cell state">{{apply.ApplyerInfo['nickname']}}</div>
                    <div class="flex-cell state">{{myTotalOption.labelProjectApplyStatue[apply.applyStatue]}}</div>
                    <div class="flex-cell operating">
                        <a :class="{'btn-operate':true,mark:true,'btn-operate-disabled':apply.applyStatue!=='WAITING'}"
                           @click="agreeApply(apply['applyID'])">
                            同意请求
                        </a>
                        <a :class="{'btn-operate':true,delete:true,'btn-operate-disabled':apply.applyStatue!=='WAITING'}"
                           @click="rejectApply(apply['applyID'])">
                            拒绝请求
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
                               :total="10*applyCount"
                               :current-page.sync="currentPage">
                </el-pagination>
            </div>
            <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                                :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>
        </div>
    </div>
</template>

<script>
    import InformationDialog from '../../common/InformationDialog'
    import {Message, MessageBox, ElTabs} from 'element-ui'
    import {
        TotalOption,
    } from '../../../utils/constant/options';
    import SearchBar_mid from '../../common/SearchBarMid';
    import {
        getApplyRecord,
        getApplyCountRecord,
        getProjectMember,
        submitProjectScore,
        rejectApply, agreeApply
    } from '../../../api/project'

    export default {
        name: "Project",
        data() {
            return {
                projectCount: 1,
                applyCount: 1,
                activeName: 'first',
                projects: [],
                applyRecords: [],
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
            handleDialogClose() {
                this.infoDialogVisible = false;
            },
            //获取参加请求信息
            async getAttendApply(page) {
                var dict = {page}
                if (this.searchColumn !== "" && this.serachContent !== "") {
                    dict[this.searchColumn] = this.searchContent
                }
                let response = await getApplyRecord({dict});
                let responseCount = await getApplyCountRecord(dict);
                if (response) {
                    this.projectCount = responseCount.count % 10 === 0 ?
                        Math.floor(responseCount.count / 10) : Math.floor(responseCount.count / 10) + 1;
                    this.applyRecords = response.sqlres;
                }
            },
            //打开互评栏
            async openDialog(projectID) {
                try {
                    let res = await getProjectMember({projectID});
                    if (!res) throw "Query Failed!"
                    this.scoreForm.memberList = [];
                    var ind = 0;
                    for (var index in res.sqlres) {
                        // console.log(item)
                        var item = res.sqlres[index];
                        if (item.memberType == 1) {
                        } else {
                            item.userID = item.memberID
                            item.memberDesignScore = 0
                            item.memberCodeScore = 0
                            item.memberAttitudeScore = 0
                            item.memberScore = 0
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
                    for (var index in this.scoreForm.memberList) {
                        this.scoreForm.memberList[index].designScore = this.scoreForm.memberList[index].memberDesignScore
                        this.scoreForm.memberList[index].codeScore = this.scoreForm.memberList[index].memberCodeScore
                        this.scoreForm.memberList[index].attitudeScore = this.scoreForm.memberList[index].memberAttitudeScore
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
            //同意请求
            async agreeApply(applyID) {
                MessageBox.confirm('确定同意该报名申请？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        let response = await agreeApply({applyID});
                        if (response) {
                            Message.success("操作成功!");
                            this.getAttendApply(1);
                        }
                    } catch (error) {
                        Message.error("操作失败!");
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            //同意请求
            async rejectApply(applyID) {
                MessageBox.confirm('确定拒绝该报名申请？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await rejectApply({applyID});
                    if (response) {
                        Message.success('操作成功!');
                        this.getAttendApply(1);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            // 页码改变（项目参加申请）
            applyPageChanged(val) {
                this.getAttendApply(val);
            },
            // SearchBarMid
            handleSearchInfo(dict) {
                this.searchColumn = dict.searchColumn
                this.searchContent = dict.searchContent
                if (dict.searchInstantly == true) {
                    this.getAttendApply(1)
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
            this.getAttendApply(1);

            // Search MID BAR
            this.searchColumnArr = [
                {'value': 'projectID', 'label': '项目ID'},
                {'value': 'applyStatue', 'label': '申请状态'},
            ];
            this.isSelectCom = {
                'projectID': false,
                'applyStatue': true,
            };
            this.searchOptionArr = {
                'projectField': TotalOption.optionProjectField,
                'applyStatue': TotalOption.optionProjectApplyStatue,
            };
            // Search MID BAR
        }
    }
</script>
