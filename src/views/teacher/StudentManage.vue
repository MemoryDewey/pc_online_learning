<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addStudent">添加成员</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入内容" class="input-with-select">
                    <el-select slot="prepend" v-model="selectValue" value="">
                        <el-option label="学员姓名" value="1"></el-option>
                        <el-option label="课程" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    <i class="el-icon-close el-input__icon" slot="suffix" style="cursor: pointer"
                       @click="clearSearch" v-show="searchContent">
                    </i>
                </el-input>
            </div>
        </div>
        <div class="flex-list">
            <!--列表顶部信息 S-->
            <div class="flex-list-header">
                <div class="flex-row">
                    <div class="flex-cell">学员姓名</div>
                    <div class="flex-cell">所选课程</div>
                    <div class="flex-cell">加入时间</div>
                    <div class="flex-cell">期末成绩</div>
                    <div class="flex-cell">操作</div>
                </div>
            </div>
            <!--列表顶部信息 E-->
            <!--列表不存在 S-->
            <div class="flex-list-no-data" v-if="info.length===0">
                <div class="status-box">
                    <div class="box-icon">
                        <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </span>
                    </div>
                    <div class="box-text">
                        <div>暂无学员信息</div>
                    </div>
                </div>
            </div>
            <!--列表不存在 E-->
            <!--列表存在 S-->
            <div class="flex-list-item" v-else>
                <div class="flex-row content" v-for="student in info">
                    <div class="flex-cell state">{{student.nickname}}</div>
                    <div class="flex-cell state">{{student.courseName}}</div>
                    <div class="flex-cell time">{{formatDate(student.createdAt)}}</div>
                    <div class="flex-cell score">{{student.score}}</div>
                    <div class="flex-cell operating">
                        <a class="btn-operate mark"
                           @click="certificateDialog(student.userID,student.courseID)">颁发证书</a>
                        <a class="btn-operate delete"
                           @click="deleteStudent(student.courseID,student.userID)">删除成员</a>
                    </div>
                </div>
            </div>
            <!--列表存在 E-->
            <!--分页 S-->
            <div class="sort-page" v-if="info.length!==0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="5" @current-change="pageChanged"
                               :total="pageSum*10" :current-page.sync="currentPage">
                </el-pagination>
            </div>
            <!--分页 E-->
        </div>
        <!--对话框 S-->
        <el-dialog :title="dialogFormInfo.title" width="384px" :visible.asnc="dialogFormVisible"
                   @close="dialogFormVisible = false">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="学员账号">
                    <el-input v-model="formInline.user" placeholder="学员账号"></el-input>
                </el-form-item>
                <el-form-item label="选择课程">
                    <el-select v-model="formInline.course" placeholder="选择课程" value="">
                        <el-option v-for="cos in course" :key="cos.courseID"
                                   :label="cos.courseName" :value="cos.courseID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStudentSubmit">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--对话框 E-->
        <!--对话框 S-->
        <el-dialog title="添加证书" width="384px" :visible.asnc="certificateDialogShow"
                   @close="certificateDialogShow = false">
            <el-form :inline="true" :model="certificateDialogForm">
                <el-form-item label="学员成绩">
                    <el-input v-model="certificateDialogForm.score" placeholder="成绩（0-100）"/>
                </el-form-item>
                <el-form-item label="证书编号">
                    <el-input v-model="certificateDialogForm.certificateID" placeholder="请输入证书编号"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addCertificate">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import moment from 'moment'
    import {
        getStudent,
        getCourse,
        addStudent,
        deleteStudent, addCertificate
    } from '@/api/course-manage'

    export default {
        name: "StudentManage",
        data() {
            return {
                isSearch: false,
                selectValue: '1',
                searchContent: null,
                info: [],
                pageSum: 0,
                preDefined: {joinTime: '', score: ''},
                currentPage: 1,
                dialogFormVisible: false,
                dialogFormInfo: {
                    title: null
                },
                formInline: {
                    user: '',
                    course: ''
                },
                certificateDialogShow: false,
                certificateDialogForm: {
                    score: '',
                    certificateID: '',
                    courseID: '',
                    userID: '',
                },
                course: []
            }
        },
        methods: {
            //获取学生信息
            getStudent(page, type, content) {
                this.currentPage = page;
                let params = type === '0' ? {page} : {page, type, content};
                getStudent(params).then(res => {
                    if (res) {
                        this.info = res.info;
                        this.pageSum = res.pageSum;
                    }
                });
            },
            //页码改变
            pageChanged(val) {
                this.isSearch ?
                    this.getStudent(val, this.selectValue, this.searchContent) :
                    this.getStudent(val, '0', null);
            },
            //搜索
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.getStudent(1, this.selectValue, this.searchContent);
                }
            },
            /* 清空搜索框 */
            clearSearch() {
                this.searchContent = '';
                this.getStudent(1, '0', null);
            },
            //格式化日期
            formatDate(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            //添加学员
            addStudent() {
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "添加成员";
                getCourse().then(res => {
                    if (res) this.course = res.course;
                });
            },
            //添加成员提交
            addStudentSubmit() {
                if (this.formInline.user === '') Message.warning('请输入学员账号');
                else if (this.formInline.course === '') Message.warning('请选择课程');
                else {
                    addStudent({courseID: this.formInline.course, studentID: this.formInline.user}).then(res => {
                        if (res) {
                            Message.success(res.msg);
                            this.getStudent(1, '0', null);
                            this.formInline.course = '';
                            this.formInline.user = '';
                            this.dialogFormVisible = false;
                        }
                    });
                }
            },
            //从课程中删除成员
            deleteStudent(courseID, userID) {
                MessageBox.confirm('确定从该课程中删除该成员？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteStudent({courseID, userID}).then(res => {
                        if (res) {
                            Message.success(res.msg);
                            this.getStudent(1, '0', null);
                        }
                    });
                }).catch(() => {
                    Message.info('已取消操作')
                })
            },
            //打开添加证书dialog
            certificateDialog(userID, courseID) {
                this.certificateDialogShow = true;
                this.certificateDialogForm.courseID = courseID;
                this.certificateDialogForm.userID = userID;
            },
            //添加证书
            addCertificate() {
                addCertificate(this.certificateDialogForm).then(res => {
                    Message.success(res.msg);
                    this.certificateDialogShow = false;
                })
            }
        },
        async created() {
            this.getStudent(1, '0', null);
        }
    }
</script>
