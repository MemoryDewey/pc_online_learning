<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addVideo">添加视频</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入视频名" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    <i class="el-icon-close el-input__icon" slot="suffix" style="cursor: pointer"
                       @click="clearSearch" v-show="searchContent">
                    </i>
                </el-input>
            </div>
        </div>
        <div class="flex-list">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="视频ID" width="120">
                </el-table-column>
                <el-table-column prop="name" label="视频名" width="230">
                </el-table-column>
                <el-table-column prop="course" label="所属课程" width="200"></el-table-column>
                <el-table-column prop="chapter" label="所属章节" width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="updateVideo(scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="deleteVideo(scope.row)">删除
                        </el-button>
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
        <el-dialog :show-close="false" top="20vh" width="650px" :visible.asnc="dialogFormVisible">
            <!--对话框标题 S-->
            <div slot="title" class="dialog-title">
                {{dialogFormInfo.title}}
                <button class="close" @click="dialogFormVisible = false">×</button>
            </div>
            <!--对话框标题 E-->
            <div class="dialog-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="视频名称" prop="name">
                        <el-input v-model="ruleForm.name">
                            <template slot="append" v-if="dialogFormInfo.type==='add'">
                                <label>
                                    <input type="file" id="upload" accept="video/*" style="display:none"
                                           ref="file" @change="getFileInfo"></input>
                                    <el-button type="primary" @click="chooseFile">选取视频</el-button>
                                </label>
                            </template>
                        </el-input>
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
                    <el-form-item label="上传进度" v-if="dialogFormInfo.type==='add'">
                        <el-progress :percentage="percent" :text-inside="true" :stroke-width="18"
                                     style="margin-top: 10px"></el-progress>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="uploadVideo" :disabled="upload"
                                   v-if="dialogFormInfo.type==='add'">
                            立即添加
                        </el-button>
                        <el-button type="primary" @click="updateSubmit" v-if="dialogFormInfo.type==='update'">
                            立即更新
                        </el-button>
                        <el-button @click="resetForm('ruleForm')" :disabled="upload"
                                   v-if="dialogFormInfo.type==='add'">重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox, Loading} from 'element-ui'
    import Tcvod from 'vod-js-sdk-v6'
    import {
        getCourse,
        getChapter,
        deleteVideo,
        getSignature,
        getVideo,
        addVideo,
        checkVideo,
        updateVideo
    } from '../../../api/course-manage'

    export default {
        name: "VideoManage",
        data() {
            return {
                isSearch: false,
                selectValue: null,
                searchContent: null,
                pageSum: 0,
                currentPage: 1,
                dialogFormVisible: false,
                dialogFormInfo: {
                    title: null,
                    type: null,
                    id: null
                },
                course: [],
                chapter: [],
                ruleForm: {
                    name: '',
                    duration: 0,
                    course: '',
                    chapter: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入视频名称', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    course: [
                        {required: true, message: '请选择课程', trigger: 'change'}
                    ],
                    chapter: [
                        {required: true, message: '请选择章节', trigger: 'change'}
                    ]
                },
                upload: false,
                tableData: [],
                file: null,
                percent: 0
            }
        },
        methods: {
            /* 获取视频信息 */
            async getVideo(page, search) {
                this.tableData = [];
                this.currentPage = page;
                let res = search === undefined ?
                    await getVideo({page}) :
                    await getVideo({page, search});
                if (res) {
                    let data = res.video;
                    for (let video of data) {
                        this.tableData.push({
                            id: video.videoID, name: video.videoName,
                            chapter: video['CourseChapter.chapterName'],
                            cptID: video['CourseChapter.chapterID'],
                            course: video['CourseChapter.CourseInformation.courseName'],
                            cseID: video['CourseChapter.CourseInformation.courseID'],
                            ware: video.wareUrl
                        })
                    }
                    this.pageSum = res.pageSum;
                }
            },
            /* 获取课程章节 */
            async getChapter(courseID) {
                let res = await getChapter({courseID});
                if (res) this.chapter = res.chapter;
            },
            /* 页码改变 */
            pageChanged(val) {
                this.isSearch ?
                    this.getVideo(val, this.searchContent) :
                    this.getVideo(val);
            },
            /* 搜索 */
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.tableData = [];
                    this.getVideo(1, this.searchContent);
                }
            },
            /* 添加章节 */
            addVideo() {
                this.getCourse();
                this.resetForm("ruleForm");
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "添加视频";
                this.dialogFormInfo.type = "add";
            },
            /* 获取课程 */
            async getCourse() {
                let response = await getCourse();
                this.course = response.course;
            },
            /* 文件检查 */
            beforeUpload(file) {
                const isValid = (file.type === 'video/mp4' || file.type === 'video/x-ms-wmv'
                    || file.type === 'video/mpg' || file.type === 'video/avi');
                const isLt1G = file.size / 1024 / 1024 < 1024;
                if (!isValid) Message.error('仅支持.mp4, .wmv, .mpg, .mepg, .avi视频文件上传!');
                if (!isLt1G) Message.error('上传文件大小不能超过 1GB!');
                return isValid && isLt1G;
            },
            /* 从服务端获取签名 */
            async getSignature() {
                let res = await getSignature();
                if (res) return res.signature;
                else return null;
            },
            /* 选择文件 */
            chooseFile() {
                const fileInput = document.getElementById('upload');
                fileInput.click();
            },
            /* 获取视频信息 */
            getFileInfo() {
                let file = this.$refs.file.files[0];
                this.ruleForm.name = file.name.split(".")[0];
            },
            /* 上传视频 */
            uploadVideo() {
                let file = this.$refs.file.files[0];
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid && this.beforeUpload(file)) {
                        this.upload = true;
                        const tcVod = new Tcvod({getSignature: this.getSignature});
                        const uploader = tcVod.upload({
                            mediaFile: file, // 媒体文件（视频或音频或图片），类型为 File
                        });
                        uploader.on('media_progress', (info) => {
                            this.percent = info.percent * 100; // 进度
                        });
                        uploader.done().then(async (doneResult) => {
                            Loading.service({
                                fullscreen: true,
                                text: '正在处理视频，请稍等.....'
                            });
                            let fileId = doneResult.fileId.toString();
                            let count = 0;

                            let timer = setInterval(async () => {
                                let res = await checkVideo({fileId});
                                count++;
                                if (res.check === 1) {
                                    clearInterval(timer);
                                    let res = await addVideo({
                                        courseID: this.ruleForm.course, chapterID: this.ruleForm.chapter,
                                        videoName: this.ruleForm.name, fileId
                                    });
                                    if (res) {
                                        Loading.service({}).close();
                                        this.getVideo(1);
                                        this.dialogFormVisible = false;
                                        Message.success(res.msg);
                                        this.ruleForm = {name: '', duration: 0, course: '', chapter: ''};
                                        this.percent = 0;
                                        this.upload = false;
                                        this.file = null;
                                    } else {
                                        Loading.service({}).close();
                                        this.dialogFormVisible = false;
                                    }
                                } else if (count === 20) {
                                    clearInterval(timer);
                                    Message.error('视频不存在');
                                }
                            }, 1000);
                        });
                    } else return false;
                });
            },
            /* 重置表单内容 */
            resetForm(formName) {
                this.ruleForm = {
                    name: '', duration: 0, course: '', chapter: '',
                };
                if (this.$refs[formName] !== undefined)
                    this.$refs[formName].resetFields();
            },
            /* 更新视频信息 */
            updateVideo(val) {
                this.getCourse();
                this.dialogFormVisible = true;
                this.ruleForm.name = val.name;
                this.ruleForm.course = val.cseID;
                this.getChapter(val.cseID);
                this.ruleForm.chapter = val.cptID;
                this.dialogFormInfo.id = val.id;
                this.dialogFormInfo.title = "更新视频";
                this.dialogFormInfo.type = "update";
            },
            /* 更新视频提交 */
            updateSubmit() {
                this.$refs['ruleForm'].validate(async valid => {
                    if (valid) {
                        let res = await updateVideo({
                            courseID: this.ruleForm.course, chapterID: this.ruleForm.chapter,
                            videoName: this.ruleForm.name, videoID: this.dialogFormInfo.id
                        });
                        if (res) {
                            this.dialogFormVisible = false;
                            this.getVideo(1);
                            Message.success(res.msg);
                            this.ruleForm = {
                                name: '', duration: 0, course: '', chapter: '',
                            }
                        } else {
                            this.dialogFormVisible = false;
                        }
                    } else return false;
                });
            },
            /* 删除视频 */
            deleteVideo(val) {
                MessageBox.confirm('确定从该课程中删除该视频？（不可恢复）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteVideo({
                        courseID: val.cseID, videoID: val.id
                    });
                    if (res.status === 1) {
                        Message.success(res.msg);
                        this.getVideo(1);
                    } else Message.warning(res.msg);
                }).catch(() => {
                    Message.info('已取消操作')
                })
            },
            /* 清空搜索框 */
            clearSearch() {
                this.searchContent = '';
                this.getVideo(1);
            },
        },
        async created() {
            this.getVideo(1);
        }
    }
</script>
