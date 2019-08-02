<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addCourse">添加课程</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入课程名" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
        </div>
        <!--列表 S-->
        <div class="flex-list">
            <!--表格内容 S-->
            <el-table :data="tableData" style="width: 100%" :border="true">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="课程名称">
                                <span>{{ props.row.cname }} <el-tag size="small">{{props.row.live?"直播课":"录播课"}}</el-tag>
                                </span>
                            </el-form-item>
                            <el-form-item label="课程描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            <el-form-item label="所属体系">
                                <span>{{ props.row.sname }}</span>
                            </el-form-item>
                            <el-form-item label="所属类别">
                                <span>{{ props.row.tname }}</span>
                            </el-form-item>
                            <el-form-item label="课程安排">
                                <span>{{ props.row.arra }}</span>
                            </el-form-item>
                            <el-form-item label="课程总结">
                                <span>{{ props.row.summ }}</span>
                            </el-form-item>
                            <el-form-item label="课程目标">
                                <span>{{ props.row.targ }}</span>
                            </el-form-item>
                            <el-form-item label="课程价格">
                                <span>{{ props.row.price }}</span>
                            </el-form-item>
                            <el-form-item label="开课时间">
                                <span>{{ props.row.stime }}</span>
                            </el-form-item>
                            <el-form-item label="结课时间">
                                <span>{{ props.row.ftime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="课程 ID" prop="cid">
                </el-table-column>
                <el-table-column label="课程名称" prop="cname">
                </el-table-column>
                <el-table-column label="课程描述" prop="desc" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="updateCourse(scope.row)" v-if="!scope.row.delete">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteCourse(scope.row.cid)"
                                   v-if="!scope.row.delete">删除
                        </el-button>
                        <el-button size="mini" type="success" @click="recoverCourse(scope.row.cid)"
                                   v-if="scope.row.delete">还原
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--表格内容 E-->
            <!--分页 S-->
            <div class="sort-page" v-if="pageSum > 0">
                <el-pagination background layout="prev, pager, next"
                               :pager-count="5" @current-change="pageChanged"
                               :total="pageSum * 10" :current-page.sync="currentPage">
                </el-pagination>
            </div>
            <!--分页 E-->
        </div>
        <!--列表 E-->
        <!--对话框 S-->
        <el-dialog :show-close="false" top="20vh" width="650px" :visible.asnc="dialogVisible">
            <!--对话框标题 S-->
            <div slot="title" class="dialog-title">
                {{dialogFormInfo.title}}
                <button class="close" @click="dialogVisible = false">×</button>
            </div>
            <!--对话框标题 E-->
            <!--对话框内容 S-->
            <div class="dialog-content" id="course">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         label-position="left">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="课程体系" required>
                        <el-col :span="11">
                            <el-form-item prop="system">
                                <el-select v-model="ruleForm.system" placeholder="选择课程体系" @change="getType" value="">
                                    <el-option v-for="sys in system" :key="sys.id"
                                               :label="sys.name" :value="sys.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="课程类别" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="选择课程类别" value="">
                                    <el-option v-for="tp in type" :key="tp.id"
                                               :label="tp.name" :value="tp.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="课程时间" required>
                        <el-col :span="11">
                            <el-form-item prop="start">
                                <el-date-picker type="date" placeholder="开课时间" v-model="ruleForm.start"
                                                style="width: 100%;" :editable="false"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="finish">
                                <el-date-picker type="date" placeholder="结课时间" v-model="ruleForm.finish"
                                                style="width: 100%;" :editable="false"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="付费课程" prop="charge">
                        <el-col :span="11">
                            <el-form-item>
                                <el-switch v-model="ruleForm.charge"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" v-if="ruleForm.charge">
                            <el-form-item label="课程价格" prop="price" required>
                                <el-input v-model="ruleForm.price"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="直播课程" prop="charge">
                        <el-form-item>
                            <el-switch v-model="ruleForm.live"></el-switch>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="课程安排" prop="arrange">
                        <el-input v-model="ruleForm.arrange"></el-input>
                    </el-form-item>
                    <el-form-item label="课程描述" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="课程总结" prop="summary">
                        <el-input type="textarea" v-model="ruleForm.summary"></el-input>
                    </el-form-item>
                    <el-form-item label="课程目标" prop="target">
                        <el-input type="textarea" v-model="ruleForm.target"></el-input>
                    </el-form-item>
                    <el-form-item label="课程封面" prop="cover">
                        <el-upload class="cover" enctype="multipart/form-data" name="cover" :auto-upload="false"
                                   action="/api/teacher/course/info/deal" :show-file-list="false"
                                   :before-upload="beforeCoverUpload" :on-change="chooseCover"
                                   :data="ruleForm" :on-success="handleSuccess" ref="upload">
                            <el-image :src="imageUrl" v-if="imageUrl">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <div v-else class="cover-uploader-icon" slot="trigger">
                                <font-awesome-icon icon="plus"></font-awesome-icon>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">{{dialogFormInfo.type}}</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--对话框内容 E-->
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import moment from 'moment'
    import {Message, MessageBox} from 'element-ui'
    import {getCourseInfo, deleteCourse, recoverCourse} from "../../../api/course-manage";
    import {getCourseType, getCourseSystem} from "../../../api/course";

    export default {
        name: "CourseManage",
        data() {
            /* 是否选择图片 */
            const validateImg = (rule, value, callback) => {
                if (this.imageUrl === false) {
                    callback('请选择课程封面图片');
                } else callback();
            };
            /* 输入的课程价格是否合法 */
            const validatePrice = (rule, value, callback) => {
                if (value === '') callback('请输入课程价格');
                else if (Number.isInteger(value)) callback('请输入数字');
                else if (value <= 0) callback('课程价格必须大于0');
                else callback();
            };
            return {
                searchContent: null,
                tableData: [],
                pageSum: 0,
                currentPage: 1,
                dialogVisible: false,
                dialogFormInfo: {
                    title: null,
                    type: null
                },
                isSearch: false,
                ruleForm: {
                    id: '',
                    name: '',
                    system: '',
                    type: '',
                    start: '',
                    finish: '',
                    charge: false,
                    live: false,
                    price: '',
                    arrange: '',
                    desc: '',
                    summary: '',
                    target: '',
                    option: ''
                },
                system: [],
                type: [],
                rules: {
                    name: [
                        {required: true, message: '请输入课程名称', trigger: 'blur'},
                        {min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'}
                    ],
                    system: [
                        {required: true, message: '请选择课程体系', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '请选择课程类别', trigger: 'change'}
                    ],
                    start: [
                        {required: true, message: '请选择开课日期', trigger: 'change'}
                    ],
                    finish: [
                        {required: true, message: '请选择结课日期', trigger: 'change'}
                    ],
                    price: [
                        {required: true, validator: validatePrice, trigger: 'blur'}
                    ],
                    arrange: [
                        {required: true, message: '请输入课程安排', trigger: 'blur'},
                        {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blue'}
                    ],
                    summary: [
                        {required: true, message: '请填写课程总结', trigger: 'blur'},
                        {min: 50, max: 500, message: '长度在 50 到 500 个字符', trigger: 'blur'}
                    ],
                    target: [
                        {required: true, message: '请填写课程目标', trigger: 'blur'},
                        {min: 50, max: 500, message: '长度在 50 到 500 个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请填写课程描述', trigger: 'blur'},
                        {min: 10, max: 50, message: '长度在 10 到 50 个字符', trigger: 'blur'}
                    ],
                    cover: [
                        {validator: validateImg, trigger: 'blur'}
                    ]
                },
                imageUrl: false,
                imageSubmit: false,
            }
        },
        methods: {
            /* 获取课程 */
            async getCourse(page, search) {
                this.currentPage = page;
                this.tableData = [];
                let res = search === '' ?
                    await getCourseInfo({page}) :
                    await getCourseInfo({page, search});
                if (res) {
                    let data = res.course;
                    this.pageSum = res.count % 8 === 0 ?
                        Math.floor(res.count / 8) : Math.floor(res.count / 8) + 1;
                    for (let i = 0; i < data.length; i++) {
                        this.tableData.push({
                            cid: data[i].courseID,
                            cname: data[i].courseName,
                            sid: data[i].systemID,
                            sname: data[i]['CourseSystem.systemName'],
                            tid: data[i].typeID,
                            tname: data[i]['CourseType.typeName'],
                            arra: data[i]['CourseDetail.courseArrange'],
                            summ: data[i]['CourseDetail.courseSummary'],
                            targ: data[i]['CourseDetail.courseTarget'],
                            desc: data[i]['courseDescription'],
                            ftime: moment(data[i]['CourseDetail.finishTime']).format('YYYY-MM-DD'),
                            stime: moment(data[i]['CourseDetail.startTime']).format('YYYY-MM-DD'),
                            cimg: data[i]['courseImage'],
                            price: data[i].price,
                            live: data[i].courseForm === 'L',
                            cover: data[i].courseImage,
                            delete: data[i].delete === 0
                        })
                    }
                }
            },
            /* 页码改变 */
            pageChanged(val) {
                this.isSearch ?
                    this.getCourse(val, this.searchContent) :
                    this.getCourse(val, '');
            },
            /* 获取课程体系 */
            async getSystem() {
                let res = await getCourseSystem();
                this.system = res.data;
            },
            /* 获取课程类别 */
            async getType(systemID) {
                let res = await getCourseType({system: systemID});
                this.type = res.data;
                this.ruleForm.type = this.type.length > 0 ? this.type[0].id : '';
            },
            /* 初始化ruleForm */
            initRuleForm() {
                this.ruleForm = {
                    id: '',
                    name: '',
                    system: '',
                    type: '',
                    start: '',
                    finish: '',
                    charge: false,
                    live: false,
                    price: '',
                    arrange: '',
                    desc: '',
                    summary: '',
                    target: '',
                    option: '',
                };
                this.imageUrl = false;
                this.imageSubmit = false;
            },
            /* 添加课程 */
            addCourse() {
                this.initRuleForm();
                this.resetForm('ruleForm');
                this.dialogVisible = true;
                this.dialogFormInfo.title = "添加课程";
                this.dialogFormInfo.type = "立即创建";
                this.ruleForm.option = "add";
                this.getSystem();
            },
            /* 更新课程 */
            updateCourse(val) {
                this.initRuleForm();
                this.getSystem();
                this.getType(val.sid);
                this.ruleForm.id = val.cid;
                this.ruleForm.name = val.cname;
                this.ruleForm.system = val.sid;
                this.ruleForm.type = val.tid;
                this.ruleForm.start = val.stime;
                this.ruleForm.finish = val.ftime;
                this.ruleForm.arrange = val.arra;
                this.ruleForm.target = val.targ;
                this.ruleForm.desc = val.desc;
                this.ruleForm.summary = val.summ;
                this.ruleForm.charge = val.price > 0;
                this.ruleForm.price = val.price;
                this.ruleForm.live = val.live;
                this.ruleForm.option = "update";
                this.imageUrl = `http://localhost:3000${val.cover}`;
                this.dialogVisible = true;
                this.dialogFormInfo.title = "更新课程";
                this.dialogFormInfo.type = "立即更新";
            },
            /* 搜索课程 */
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.getCourse(1, this.searchContent);
                }
            },
            /* 提交表单 */
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (this.imageSubmit) this.$refs.upload.submit();
                        else {
                            let res = await updateCourseInfo(this.ruleForm);
                            this.handleSuccess(res);
                        }
                    } else return false;
                });
            },
            /* 重置表单内容 */
            resetForm(formName) {
                if (this.$refs[formName] !== undefined)
                    this.$refs[formName].resetFields();
                this.imageUrl = false;
            },
            /* 选择封面图片 */
            chooseCover(file) {
                if (this.beforeCoverUpload(file.raw)) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.imageSubmit = true;
                }
            },
            /* 提交封面图片之前检查 */
            beforeCoverUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 4;
                if (!isJPG) Message.error('上传图片只能是 JPG 格式!');
                if (!isLt2M) Message.error('上传图片大小不能超过 4MB!');
                return isJPG && isLt2M;
            },
            /* 添加/更改提交成功后执行 */
            handleSuccess(res) {
                if (res) {
                    Message.success(res.msg);
                    this.dialogVisible = false;
                    this.resetForm('ruleForm');
                    this.getCourse(1, '');
                }
            },
            /* 删除课程 */
            deleteCourse(courseID) {
                MessageBox.confirm('确定要删除该节课程吗？（删除后可手动还原）', "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteCourse({courseID});
                    if (res) {
                        Message.success(res.msg);
                        this.getCourse(1, '');
                    }
                }).catch(() => {
                    Message.info("已取消删除操作");
                })
            },
            /* 还原删除的课程 */
            recoverCourse(courseID) {
                MessageBox.confirm('确定要还原该节课程吗？', "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await recoverCourse({courseID});
                    if (res) {
                        Message.success(res.msg);
                        this.getCourse(1, '');
                    }
                }).catch(() => {
                    Message.info("已取消还原操作");
                })
            }
        },
        created() {
            this.getCourse(1, '');
        }
    }
</script>

<style lang="less">
    .manage-view {
        #course {
            .cover {
                width: 90px;
                height: 50px;
                display: block;
                cursor: pointer;
                text-align: center;
                vertical-align: middle;
            }

            .cover img {
                width: 100%;
                height: 100%;
                border: 1px solid #ddd;
                vertical-align: middle;
            }

            .cover-uploader-icon {
                font-size: 20px;
                color: #8c939d;
                height: 50px;
                width: 90px;
                border: 1px solid #ddd;
                line-height: 50px;
            }

            .cover-uploader-icon i {
                vertical-align: middle;
                margin-bottom: 5px;
            }

            .demo-table-expand {
                font-size: 0;
            }

            .demo-table-expand label {
                width: 90px;
                color: #99a9bf;
            }

            .demo-table-expand .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 50%;
            }

            .el-form-item__content .line {
                text-align: center;
            }
        }
    }
</style>
