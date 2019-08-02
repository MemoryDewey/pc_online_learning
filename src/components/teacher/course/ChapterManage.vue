<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addChapter">添加章节</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入章节名" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <div class="flex-list">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="章节ID" width="180">
                </el-table-column>
                <el-table-column prop="name" label="章节名" width="230">
                </el-table-column>
                <el-table-column prop="course" label="所属课程" width="230"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="!scope.row.delete"
                                   @click="updateChapter(scope.row.id,scope.row.name,scope.row.cid)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" v-if="!scope.row.delete"
                                   @click="deleteChapter(scope.row.cid,scope.row.id)">删除
                        </el-button>
                        <el-button size="mini" type="success" v-if="scope.row.delete"
                                   @click="recoverChapter(scope.row.cid,scope.row.id)">还原
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 S-->
            <div class="sort-page" v-if="tableData.length!==0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="5" @current-change="pageChanged"
                               :current-page.sync="currentPage"
                               :total="pageSum*10">
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
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="章节名">
                    <el-input v-model="formInline.chapter" placeholder="章节名"></el-input>
                </el-form-item>
                <el-form-item label="选择课程">
                    <el-select v-model="formInline.course" placeholder="选择课程" value="">
                        <el-option v-for="cos in course" :key="cos.courseID"
                                   :label="cos.courseName" :value="cos.courseID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addChapterSubmit"
                               v-if="dialogFormInfo.type === 'add'">添加
                    </el-button>
                    <el-button type="primary" @click="updateChapterSubmit"
                               v-if="dialogFormInfo.type === 'update'">更新
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {
        addChapter,
        deleteChapter,
        getChapterInfo,
        updateChapter,
        recoverChapter,
        getCourse
    } from '../../../api/course-manage'

    export default {
        name: "ChapterManage",
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
                formInline: {
                    chapter: '',
                    course: ''
                },
                course: [],
                tableData: []
            }
        },
        methods: {
            /* 获取章节信息 */
            async getChapter(page, search) {
                this.currentPage = page;
                this.tableData = [];
                let res = search === '' ?
                    await getChapterInfo({page}) :
                    await getChapterInfo({page, search});
                if (res) {
                    let data = res.chapter;
                    this.pageSum = res.count % 8 === 0 ?
                        Math.floor(res.count / 8) : Math.floor(res.count / 8) + 1;
                    for (let i = 0; i < data.length; i++) {
                        this.tableData.push({
                            id: data[i]['chapterID'],
                            name: data[i]['chapterName'],
                            course: data[i]['CourseInformation.courseName'],
                            cid: data[i]['CourseInformation.CourseDetail.courseID'],
                            delete: data[i]['deletedAt']
                        })
                    }
                }
            },
            /* 页码改变 */
            pageChanged(val) {
                this.currentPage = val;
                this.isSearch ?
                    this.getChapter(val, this.searchContent) :
                    this.getChapter(val, '');
            },
            /* 搜索 */
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.tableData = [];
                    this.getChapter(1, this.searchContent);
                }
            },
            /* 获取课程 */
            async getCourse() {
                let response = await getCourse();
                this.course = response.course;
            },
            /* 添加章节 */
            addChapter() {
                this.getCourse();
                this.dialogFormVisible = true;
                this.formInline = {chapter: '', course: ''};
                this.dialogFormInfo.title = "添加章节";
                this.dialogFormInfo.type = "add";
            },
            /* 检查输入 */
            checkInput() {
                if (this.formInline.chapter === '') {
                    Message.warning('请输入学员账号');
                    return false;
                } else if (this.formInline.chapter.length > 30) {
                    Message.warning('章节名应小于30个字符');
                    return false;
                } else if (this.formInline.course === '') {
                    Message.warning('请选择课程');
                    return false;
                } else return true;
            },
            /* 添加章节提交 */
            async addChapterSubmit() {
                if (this.checkInput()) {
                    let res = await addChapter({
                        courseID: this.formInline.course, name: this.formInline.chapter
                    });
                    if (res) {
                        Message.success(res.msg);
                        this.getChapter(1, '');
                        this.formInline.course = '';
                        this.formInline.chapter = '';
                        this.dialogFormVisible = false;
                    }
                }
            },
            /* 更新章节 */
            updateChapter(chapterID, chapterName, courseID) {
                this.getCourse();
                this.formInline.chapter = chapterName;
                this.formInline.course = courseID;
                this.dialogFormInfo.title = "编辑章节";
                this.dialogFormInfo.type = "update";
                this.dialogFormInfo.id = chapterID;
                this.dialogFormVisible = true;
            },
            /* 更新章节提交 */
            async updateChapterSubmit() {
                if (this.checkInput()) {
                    let res = await updateChapter({
                        courseID: this.formInline.course, name: this.formInline.chapter,
                        chapterID: this.dialogFormInfo.id
                    });
                    if (res) {
                        Message.success(res.msg);
                        this.getChapter(1, '');
                        this.formInline.course = '';
                        this.formInline.chapter = '';
                        this.dialogFormVisible = false;
                    }
                }
            },
            /* 删除章节 */
            deleteChapter(courseID, chapterID) {
                MessageBox.confirm('确定从该课程中删除该章节？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteChapter({courseID, chapterID});
                    if (res) {
                        Message.success(res.msg);
                        this.getChapter(1, '');
                    }
                }).catch(() => {
                    Message.info('已取消操作')
                })
            },
            /* 还原章节 */
            async recoverChapter(courseID, chapterID) {
                let res = await recoverChapter({courseID, chapterID});
                if (res) {
                    Message.success(res.msg);
                    this.getChapter(1, '');
                }
            }
        },
        async created() {
            this.getChapter(1, '');
        }
    }
</script>
