<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addFile">添加文件</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入内容" class="input-with-select">
                    <el-select slot="prepend" v-model="selectValue" value="">
                        <el-option label="文件名" value="name"></el-option>
                        <el-option label="文件类型" value="type"></el-option>
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
                    <div class="flex-cell">文件名</div>
                    <div class="flex-cell">所属课程</div>
                    <div class="flex-cell">所属章节</div>
                    <div class="flex-cell">文件类型</div>
                    <div class="flex-cell">文件大小</div>
                    <div class="flex-cell">操作</div>
                </div>
            </div>
            <!--列表顶部信息 E-->
            <!--列表不存在 S-->
            <div class="flex-list-no-data" v-if="file.length===0">
                <div class="status-box">
                    <div class="box-icon">
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </div>
                    <div class="box-text">
                        <div>暂无文件信息</div>
                    </div>
                </div>
            </div>
            <!--列表不存在 E-->
            <!--列表存在 S-->
            <div class="flex-list-item" v-else>
                <div class="flex-row content" v-for="f in file" :key="f.fileID">
                    <div class="flex-cell">{{f.fileName}}</div>
                    <div class="flex-cell" style="text-align: center;color: #67c23a;">
                        {{f['CourseChapter.CourseInformation.courseName']}}
                    </div>
                    <div class="flex-cell" style="text-align: center;color: #67c23a;">
                        {{f['CourseChapter.chapterName']}}
                    </div>
                    <div class="flex-cell time">{{f.fileType}}</div>
                    <div class="flex-cell gold">{{f.fileSize > 1024*1024 ? `${(f.fileSize / (1024 *
                        1024)).toFixed(2)}MB` :
                        `${(f.fileSize / 1024).toFixed(2)}KB`}}
                    </div>
                    <div class="flex-cell operating" v-if="f.deletedAt===null">
                        <a class="btn-operate mark"
                           @click="updateFile(f)">更新信息</a>
                        <a class="btn-operate delete"
                           @click="deleteFile(f,false)">删除文件</a>
                    </div>
                    <div class="flex-cell operating" v-else>
                        <a class="btn-operate mark"
                           @click="recoverFile(f)">恢复文件</a>
                        <a class="btn-operate delete"
                           @click="deleteFile(f,true)">彻底删除</a>
                    </div>
                </div>
            </div>
            <!--列表存在 E-->
            <!--分页 S-->
            <div class="sort-page" v-if="file.length!==0">
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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="文件名称" prop="name">
                        <el-input v-model="ruleForm.name">
                            <template slot="append" v-if="dialogFormInfo.type==='add'">
                                <el-upload ref="upload" action="/api/teacher/course/file/add"
                                           :auto-upload="false" :show-file-list="false" :data="ruleForm"
                                           :on-change="chooseFile" :on-success="handleSuccess">
                                    <el-button type="primary">选取文件</el-button>
                                </el-upload>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文件信息">
                        <el-col :span="11">
                            <el-form-item>
                                <el-input v-model="ruleForm.size" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-form-item>
                                <el-input v-model="ruleForm.type" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属课程" prop="course">
                        <el-select v-model="ruleForm.course" placeholder="请选择课程" value="" @change="getChapter">
                            <el-option v-for="cos in course" :key="cos.courseID"
                                       :label="cos.courseName" :value="cos.courseID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属章节" prop="chapter">
                        <el-select v-model="ruleForm.chapter" placeholder="请选择章节" value="">
                            <el-option v-for="cpt in chapter" :key="cpt.chapterID"
                                       :label="cpt.chapterName" :value="cpt.chapterID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" v-if="dialogFormInfo.type==='add'">
                            立即添加
                        </el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" v-if="dialogFormInfo.type==='update'">
                            立即更新
                        </el-button>
                        <el-button @click="resetForm('ruleForm')" v-if="dialogFormInfo.type==='add'">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {getChapter, deleteFile, updateFile, getFile, getCourse, recoverFile} from "../../../api/course-manage";

    export default {
        name: "FileManage",
        data() {
            return {
                isSearch: false,
                selectValue: 'name',
                searchContent: null,
                file: [],
                pageSum: 0,
                currentPage: 1,
                dialogFormVisible: false,
                dialogFormInfo: {
                    id: null,
                    title: null,
                    type: null
                },
                course: [],
                chapter: [],
                ruleForm: {
                    name: '',
                    size: '',
                    type: '',
                    course: '',
                    chapter: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入文件名称', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    course: [
                        {required: true, message: '请选择课程', trigger: 'change'}
                    ],
                    chapter: [
                        {required: true, message: '请选择章节', trigger: 'change'}
                    ]
                },
                fileChoose: false,
                preDefined: {fileID: '', fileType: '', fileSize: '', deletedAt: '', chapterName: ''}
            }
        },
        methods: {
            /* 获取文件信息 */
            async getFile(page, type, content) {
                this.currentPage = page;
                let res = type === '' ?
                    await getFile({page}) :
                    await getFile({page, type, content});
                if (res) {
                    this.file = res.file;
                    this.pageSum = res.pageSum;
                }
            },
            /* 页码改变 */
            pageChanged(val) {
                this.isSearch ?
                    this.getFile(val, this.selectValue, this.searchContent) :
                    this.getFile(val, '', null);
            },
            /* 搜索 */
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.getFile(1, this.selectValue, this.searchContent);
                }
            },
            /* 清空搜索框 */
            clearSearch() {
                this.searchContent = '';
                this.getFile(1, '', null);
            },
            /* 提交表单 */
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (this.dialogFormInfo.type === 'add' && !this.fileChoose) Message.warning('请选择要上传的文件');
                    else if (valid) {
                        if (this.dialogFormInfo.type === 'add') this.$refs.upload.submit();
                        else {
                            let res = await updateFile({
                                name: this.ruleForm.name, course: this.ruleForm.course,
                                chapter: this.ruleForm.chapter, id: this.dialogFormInfo.id
                            });
                            this.handleSuccess(res);
                        }
                    } else return false;
                })
            },
            /* 初始化 */
            init() {
                this.ruleForm = {
                    name: '',
                    size: '',
                    type: '',
                    course: '',
                    chapter: '',
                };
                this.fileChoose = false;
                this.dialogFormInfo = {
                    id: null,
                    title: null,
                    type: null
                };
                this.course = [];
                this.chapter = [];
            },
            /* 添加文件 */
            async addFile() {
                this.init();
                this.resetForm('ruleForm');
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "添加文件";
                this.dialogFormInfo.type = "add";
                this.getCourse();
            },
            /* 获取课程章节 */
            async getChapter(courseID) {
                let res = await getChapter({courseID});
                if (res) this.chapter = res.chapter;
            },
            /* 获取课程 */
            async getCourse() {
                let res = await getCourse();
                this.course = res.course;
            },
            /* 选择文件 */
            chooseFile(file) {
                if (this.beforeCoverUpload(file.raw)) {
                    this.fileChoose = true;
                    this.ruleForm.name = file.name.split(".")[0];
                    this.ruleForm.size = file.size > (1024 * 1024) ? `${(file.size / (1024 * 1024)).toFixed(2)}MB` :
                        `${(file.size / 1024).toFixed(2)}KB`;
                    this.ruleForm.type = this.mimeTypeToExtension(file.raw.type);
                }
            },
            /* 文件类型转化为后缀名 */
            mimeTypeToExtension(mimeType) {
                switch (mimeType) {
                    case 'image/jpeg':
                        return 'jpg';
                    case 'image/png':
                        return 'png';
                    case 'application/x-zip-compressed':
                        return 'zip';
                    case 'text/plain':
                        return 'txt';
                    case 'application/pdf':
                        return 'pdf';
                    case 'application/msword':
                        return 'doc';
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        return 'docx';
                    case 'application/vnd.ms-excel':
                        return 'xls';
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        return 'xlsx';
                    case 'application/vnd.ms-powerpoint':
                        return 'ppt';
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        return 'pptx';
                }
            },
            /* 文件检查 */
            beforeCoverUpload(file) {
                const isValid = (file.type === 'image/jpeg' || file.type === 'image/png' ||
                    file.type === 'application/x-zip-compressed' ||
                    file.type === 'text/plain' || file.type === 'application/pdf' ||
                    file.type === 'application/msword' || file.type === 'application/vnd.ms-excel' ||
                    file.type === 'application/vnd.ms-powerpoint' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (!isValid) Message.error('仅支持.jpg .png .zip .txt .pdf .doc .docx .xls .xlsx .ppt .pptx格式的文件上传!');
                if (!isLt20M) Message.error('上传文件大小不能超过 20MB!');
                return isValid && isLt20M;
            },
            /* 添加/更改提交成功后执行 */
            handleSuccess(res) {
                if (res.status === 1) {
                    Message.success(res.msg);
                    this.dialogFormVisible = false;
                    this.getFile(1, '', null);
                    this.init();
                    this.resetForm('ruleForm');
                }
            },
            /* 重置表单内容 */
            resetForm(formName) {
                if (this.$refs[formName] !== undefined)
                    this.$refs[formName].resetFields();
            },
            //从课程中删除成员
            deleteFile(val, force) {
                let msg = force ? '确定删除该文件（不可恢复）？' : '确定删除该文件（可恢复）？';
                MessageBox.confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteFile({
                        course: val['CourseChapter.CourseInformation.courseID'],
                        chapter: val['CourseChapter.chapterID'],
                        id: val['fileID'],
                        force
                    });
                    if (res) {
                        Message.success(res.msg);
                        this.getFile(1, '', null);
                    }
                }).catch(() => {
                    Message.info('已取消操作')
                })
            },
            /* 更新文件信息 */
            async updateFile(val) {
                this.init();
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "更新文件";
                this.dialogFormInfo.type = "update";
                this.dialogFormInfo.id = val['fileID'];
                this.getCourse();
                this.ruleForm.name = val['fileName'];
                this.ruleForm.course = val['CourseChapter.CourseInformation.courseID'];
                await this.getChapter(this.ruleForm.course);
                this.ruleForm.chapter = val['CourseChapter.chapterID'];
                this.ruleForm.type = val['fileType'];
                this.ruleForm.size = val['fileSize'];
            },
            /* 恢复文件 */
            async recoverFile(val) {
                MessageBox.confirm('确认恢复该文件吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(async () => {
                    let res = await recoverFile({
                        course: val['CourseChapter.CourseInformation.courseID'],
                        chapter: val['CourseChapter.chapterID'],
                        id: val['fileID'],
                    });
                    if (res) {
                        Message.success(res.msg);
                        this.getFile(1, '', null);
                    }
                }).catch(() => {
                    Message.info('已取消操作')
                })
            }
        },
        async created() {
            this.getFile(1, '', null);
        }
    }
</script>
