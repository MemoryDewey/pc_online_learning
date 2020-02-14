<template>
    <div class="card-content manage-view">
        <div class="card-header">
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
                <el-table-column prop="name" label="所属视频" width="220">
                </el-table-column>
                <el-table-column prop="course" label="所属课程" width="200"></el-table-column>
                <el-table-column prop="chapter" label="所属章节" width="200">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" v-if="scope.row.ware===null"
                                   @click="addWare(scope.row)">添加课件
                        </el-button>
                        <el-button size="mini" @click="changeWare(scope.row)"
                                   v-if="scope.row.ware!==null">更改课件
                        </el-button>
                        <el-button size="mini" type="danger" v-if="scope.row.ware!==null"
                                   @click="deleteWare(scope.row)">删除课件
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
        <el-dialog :title="dialogFormInfo.title" width="400px" :visible.asnc="dialogFormVisible"
                   @close="dialogFormVisible = false">
            <div class="dialog-content">
                <el-upload class="upload-demo" drag :data="uploadData" :before-upload="beforeUpload"
                           action="/api/teacher/course/ware" :on-success="uploadSuccess"
                           name="pdf" :show-file-list="false" :headers="headers">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传PDF文件，且不超过5MB</div>
                </el-upload>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {getVideo, deleteWare} from "@/api/course-manage";

    export default {
        name: "PDFManage",
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
                    id: null
                },
                tableData: [],
                uploadData: {},
                headers: {Authorization: localStorage.getItem('token')}
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
            /* 页码改变 */
            pageChanged(val) {
                this.isSearch ?
                    this.getVideo(val, this.searchContent) :
                    this.getChapter(val);
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
            /* 添加课件 */
            addWare(val) {
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "添加课件";
                this.uploadData = {videoID: val.id, courseID: val.cseID};
            },
            /* 更换课件 */
            changeWare(val) {
                this.dialogFormVisible = true;
                this.dialogFormInfo.title = "更换课件";
                this.uploadData = {videoID: val.id, courseID: val.cseID};
            },
            /* 删除课件 */
            deleteWare(val) {
                MessageBox.confirm('确定要删除该课件吗？(不可还原)', "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteWare({
                        videoID: val.id, courseID: val.cseID
                    });
                    if (res) {
                        Message.success(res.msg);
                        this.getVideo(1);
                    }
                }).catch(() => {
                    Message.info("已取消删除操作");
                })
            },
            /* 文件上传以前检查 */
            beforeUpload(file) {
                const isPDF = file.type === 'application/pdf';
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isPDF) Message.error('仅支持 .pdf 格式的文件上传!');
                if (!isLt5M) Message.error('上传文件大小不能超过 5MB!');
                return isPDF && isLt5M;
            },
            /* 上传至服务器成功 */
            uploadSuccess(res) {
                if (res.code === 1000) {
                    Message.success(res.msg);
                    this.dialogFormVisible = false;
                    this.getVideo(1);
                } else {
                    Message.error(res.msg);
                }
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
