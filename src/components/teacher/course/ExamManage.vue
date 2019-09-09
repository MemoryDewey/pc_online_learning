<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addPaper">增加试题</div>
            <div class="search-area">
                <el-select value="exam" v-model="searchType" placeholder="选择试卷类型" @change="selectChange">
                    <el-option label="期末考试" value="exam"></el-option>
                    <el-option label="课后测验" value="exercise"></el-option>
                </el-select>
            </div>
        </div>
        <div class="flex-list">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" label="所属课程/视频" width="190"></el-table-column>
                <el-table-column prop="type" label="类型" width="190"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" width="190"></el-table-column>
                <el-table-column prop="endTime" label="结束时间" width="190"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="updateDialog(scope.row)" type="success">更改</el-button>
                    </template>
                </el-table-column>
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
            <div class="dialog-content">
                <el-form v-for="(question, index) in dynamicForm.question"
                         :model="question" :key="question.key" label-width="100px" class="demo-ruleForm">
                    <el-form-item :label="`${index+1}.`" prop="title"
                                  :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
                        <el-input type="textarea" placeholder="标题" v-model="question.title"></el-input>
                    </el-form-item>
                    <el-form-item label="A. " :rules="{required: true, message: '选项不能为空', trigger: 'blur'}"
                                  prop="a">
                        <el-input placeholder="A选项标题" v-model="question.a"></el-input>
                    </el-form-item>
                    <el-form-item label="B. " :rules="{required: true, message: '选项不能为空', trigger: 'blur'}"
                                  prop="b">
                        <el-input placeholder="B选项标题" v-model="question.b"></el-input>
                    </el-form-item>
                    <el-form-item label="C. " :rules="{required: true, message: '选项不能为空', trigger: 'blur'}"
                                  prop="c">
                        <el-input placeholder="C选项标题" v-model="question.c"></el-input>
                    </el-form-item>
                    <el-form-item label="D. " :rules="{required: true, message: '选项不能为空', trigger: 'blur'}"
                                  prop="d">
                        <el-input placeholder="D选项标题" v-model="question.d"></el-input>
                    </el-form-item>
                    <el-form-item label="正确答案" :rules="{required: true, message: '请选择活动区域', trigger: 'change'}"
                                  prop="answer">
                        <el-select v-model="question.answer" placeholder="答案" value="">
                            <el-option label="A" value="A"></el-option>
                            <el-option label="B" value="B"></el-option>
                            <el-option label="C" value="C"></el-option>
                            <el-option label="D" value="D"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click.prevent="removeQuestion(question)">删除</el-button>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="考试类型" prop="type" v-if="!isUpdate">
                        <el-select v-model="ruleForm.type" placeholder="选择考试类型" value="">
                            <el-option label="平时测验" value="exercise"></el-option>
                            <el-option label="期末测验" value="exam"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属课程" prop="course" v-if="ruleForm.type && !isUpdate">
                        <el-select v-model="ruleForm.course" placeholder="选择课程" value=""
                                   @change="getVideo(ruleForm.type,ruleForm.course)">
                            <el-option v-for="cos in course" :key="cos.courseID"
                                       :label="cos.courseName" :value="cos.courseID"
                                       :disabled="cos.CourseExam!==null && ruleForm.type==='exam'"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属视频" prop="video" v-if="ruleForm.type==='exercise' && !isUpdate">
                        <el-select v-model="ruleForm.video" placeholder="选择视频" value="">
                            <el-option v-for="v in video" :key="v.videoID"
                                       :label="v.videoName" :value="v.videoID"
                                       :disabled="v.CourseExercise!==null"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时间" required v-if="ruleForm.type === 'exam'">
                        <el-col :span="11">
                            <el-form-item prop="startTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="endTime">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime"
                                                style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addQuestion">新增题目</el-button>
                        <el-button type="primary" @click="addSubmit">立即提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {getCoursePaper, addPaper, getPaper, getCourseVideo, updatePaper} from "../../../api/course-manage";

    export default {
        name: "ExamManage",
        data() {
            return {
                pageSum: 0,
                currentPage: 1,
                searchType: 'exam',
                dialogFormVisible: false,
                dialogFormInfo: {title: null, type: null, id: null},
                course: [],
                video: [],
                tableData: [],
                dynamicForm: {question: []},
                ruleForm: {type: null, startTime: null, endTime: null, course: null, video: null,},
                rules: {
                    type: [
                        {required: true, message: '请选择考试类型', trigger: 'change'}
                    ],
                    startTime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    endTime: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    course: [
                        {required: true, message: '请选择课程', trigger: 'change'}
                    ],
                    video: [
                        {required: true, message: '请选择视频', trigger: 'change'}
                    ],
                },
                isUpdate: false
            }
        },
        methods: {
            /* 获取考试信息 */
            async getPaper(page) {
                this.currentPage = page;
                this.tableData = [];
                let res = await getPaper({type: this.searchType, page});
                if (res) {
                    let data = res.paper;
                    for (let paper of data) {
                        const type = this.searchType === 'exam' ? "期末测验" : "课后测验";
                        const name = this.searchType === 'exam' ?
                            paper['CourseExam']['CourseInformation'].courseName :
                            paper['CourseExercise']['CourseVideo'].videoName;
                        const course = this.searchType === 'exam' ?
                            paper['CourseExam']['CourseInformation'].courseID :
                            paper['CourseExercise']['CourseVideo']['CourseChapter']
                                ['CourseInformation'].courseID;
                        const video = this.searchType === 'exam' ? null :
                            paper['CourseExercise']['CourseVideo'].videoID;
                        const startTime = this.searchType === 'exam' ?
                            paper['CourseExam'].startTime :
                            paper['CourseExercise']['CourseVideo']['CourseChapter']
                                ['CourseInformation']['CourseDetail'].startTime;
                        const endTime = this.searchType === 'exam' ?
                            paper['CourseExam'].endTime :
                            paper['CourseExercise']['CourseVideo']['CourseChapter']
                                ['CourseInformation']['CourseDetail'].finishTime;
                        const paperID = paper.paperID;
                        const question = paper['question'];
                        const answer = paper['answer'];
                        this.tableData.push({
                            type, name, startTime, endTime, paperID,
                            question, answer, course, video
                        })
                    }
                    this.pageSum = res.pageSum;
                }
            },
            /* 页码改变 */
            pageChanged(val) {
                this.getPaper(val);
            },
            /* 添加试卷 */
            addPaper() {
                this.getCourse();
                this.dialogFormVisible = true;
                if (this.ruleForm.type !== null) this.initDialog();
                this.dialogFormInfo.title = "添加试题";
                this.isUpdate = false;
            },
            /* 获取课程 */
            async getCourse() {
                let response = await getCoursePaper();
                this.course = response.course;
            },
            /* 获取视频 */
            async getVideo(type, course) {
                this.video = [];
                if (type === "exercise") {
                    let response = await getCourseVideo({course});
                    this.video = response.video;
                }
            },
            /* 动态增加题目 */
            addQuestion() {
                this.dynamicForm.question.push({
                    title: '', a: '', b: '', c: '', d: '', answer: '',
                    key: Date.now()
                })
            },
            /* 删除题目 */
            removeQuestion(item) {
                const index = this.dynamicForm.question.indexOf(item);
                if (index !== -1) {
                    this.dynamicForm.question.splice(index, 1)
                }
            },
            /* 提交添加试卷 */
            addSubmit() {
                this.$refs['ruleForm'].validate(async (valid) => {
                    if (this.dynamicForm.question.length === 0) {
                        Message.info("请先添加试题");
                        return false;
                    }
                    if (valid) {
                        let res = this.isUpdate ? await updatePaper({
                            data: this.dynamicForm.question,
                            condition: this.ruleForm
                        }) : await addPaper({
                            data: this.dynamicForm.question,
                            condition: this.ruleForm
                        });
                        if (res) {
                            Message.success(res.msg);
                            this.dialogFormVisible = false;
                            this.initDialog();
                            this.getPaper(1);
                        }
                    } else return false;
                });
            },
            /* 初始化dialog */
            initDialog() {
                this.$refs['ruleForm'].resetFields();
                this.dynamicForm = {question: []};
                this.ruleForm = {type: null, startTime: null, endTime: null, course: null, video: null};
            },
            /* 更新试卷信息Dialog */
            updateDialog(val) {
                this.getCourse();
                this.dynamicForm.question = [];
                this.isUpdate = true;
                for (let i = 0; i < val.answer.length; i++) {
                    this.dynamicForm.question.push({
                        title: val.question[i].title,
                        a: val.question[i].section[0].content,
                        b: val.question[i].section[1].content,
                        c: val.question[i].section[2].content,
                        d: val.question[i].section[3].content,
                        answer: val.answer[i],
                        key: Date.now()
                    })
                }
                this.ruleForm = {
                    type: val.video ? 'exercise' : 'exam',
                    startTime: val.video ? null : new Date(val.startTime),
                    endTime: val.video ? null : new Date(val.endTime),
                    course: val.course,
                    video: val.video,
                    paperID: val.paperID
                };
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "更新试题";
            },
            /* 改变选择 */
            selectChange() {
                this.getPaper(1);
            }
        },
        async created() {
            this.getPaper(1);
        }
    }
</script>
