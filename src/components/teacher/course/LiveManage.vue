<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addLive">开启直播</div>
            <div class="search-area">
                <el-link type="primary" @click="downloadHelp"
                         :underline="false">如何进行直播<i class="el-icon-view el-icon--right"></i></el-link>
            </div>
        </div>
        <div class="flex-list">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="course" label="课程名" width="110"></el-table-column>
                <el-table-column prop="title" label="直播名" width="139"></el-table-column>
                <el-table-column prop="pushUrl" label="OBS推流地址" width="230"></el-table-column>
                <el-table-column prop="pushName" label="OBS推流名称" width="290"></el-table-column>
                <el-table-column prop="time" label="过期时间"></el-table-column>
            </el-table>
            <!--分页 S-->
            <div class="sort-page" v-if="tableData.length!==0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="5" @current-change="pageChanged"
                               :total="pageSum*10" :current-page.sync="currentPage">
                </el-pagination>
            </div>
            <!--分页 E-->
        </div>
        <!--对话框 S-->
        <el-dialog :title="dialogFormInfo.title" width="650px" :visible.asnc="dialogFormVisible"
                   @close="dialogFormVisible = false">
            <!--对话框标题 E-->
            <div class="dialog-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="视频名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="所属课程" prop="course">
                        <el-select v-model="ruleForm.course" placeholder="请选择课程" value="">
                            <el-option v-for="cos in course" :key="cos.courseID"
                                       :label="cos.courseName" :value="cos.courseID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addSubmit">
                            立即添加
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import moment from 'moment'
    import {getLive, setLive, getLiveCourse} from '../../../api/course-manage'
    import {saveAs} from 'file-saver'

    export default {
        name: "LiveManage",
        data() {
            return {
                pageSum: 0,
                currentPage: 1,
                dialogFormVisible: false,
                dialogFormInfo: {
                    title: null,
                    type: null,
                    id: null
                },
                course: [],
                ruleForm: {
                    title: '',
                    course: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入直播名称', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    course: [
                        {required: true, message: '请选择课程', trigger: 'change'}
                    ]
                },
                tableData: [],
            }
        },
        methods: {
            /* 获取视频信息 */
            async getLive(page) {
                this.tableData = [];
                this.currentPage = page;
                let res = await getLive({page});
                if (res) {
                    let data = res.live;
                    for (let live of data) {
                        this.tableData.push({
                            course: live['CourseInformation.CourseName'],
                            title: live.title,
                            pushUrl: live.pushUrl,
                            pushName: live.pushName,
                            time: moment(live.txTime).format('YYYY-MM-DD HH:mm:ss')
                        })
                    }
                    this.pageSum = res.pageSum;
                }
            },
            /* 页码改变 */
            pageChanged(val) {
                this.getLive(val);
            },
            /* 添加直播 */
            addLive() {
                this.getCourse();
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "添加直播";
            },
            addSubmit() {
                this.$refs['ruleForm'].validate(async valid => {
                    if (valid) {
                        let res = await setLive({
                            title: this.ruleForm.title, courseID: this.ruleForm.course
                        });
                        if (res) {
                            Message.success(res.msg);
                            this.getLive(1);
                            this.dialogFormVisible = false;
                        }
                    }
                });
            },
            /* 获取课程 */
            async getCourse() {
                let res = await getLiveCourse();
                this.course = res.course;
            },
            /* 下载文件 */
            downloadHelp() {
                saveAs(`${process.env.VUE_APP_BASE_API}/teacher/course/live/help`);
            }
        },
        async created() {
            this.getLive(1);
        }
    }
</script>
