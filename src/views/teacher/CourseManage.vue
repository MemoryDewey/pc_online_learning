<template>
    <div class="card-content manage-view">
        <div class="card-header">
            <div class="add-button" @click="addCourse">添加课程</div>
            <div class="search-area">
                <el-input v-model="searchContent" placeholder="请输入课程名" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    <i class="el-icon-close el-input__icon" slot="suffix" style="cursor: pointer"
                       @click="clearSearch" v-show="searchContent">
                    </i>
                </el-input>
            </div>
        </div>
        <!--列表 S-->
        <div class="flex-list">
            <!--表格内容 S-->
            <el-table :data="tableData" style="width: 100%" :border="true">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="课程名称">
                                <span style="margin-right: 20px">{{ props.row.cname }}</span>
                                <el-tag size="small">{{props.row.live?"直播课":"录播课"}}</el-tag>
                            </el-form-item>
                            <el-form-item label="课程描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="所属体系">
                                        <span>{{ props.row.sname }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="所属类别">
                                        <span>{{ props.row.tname }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="课程安排">
                                <span>{{ props.row.arra }}</span>
                            </el-form-item>
                            <el-form-item label="课程详情">
                                <span>{{ props.row.detail }}</span>
                            </el-form-item>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="课程价格">
                                        <span>{{ props.row.price }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="开课时间">
                                        <span>{{ props.row.stime }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="结课时间">
                                        <span>{{ props.row.ftime }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="课程名称" prop="cname">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.delete">
                            <el-button size="mini" @click="updateCourse(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteCourse(scope.row.cid)">删除</el-button>
                            <el-button size="mini" type="primary" @click="setDetailCover(scope.row)">设置课程详情图片
                            </el-button>
                            <el-button size="mini" type="warning" @click="setDiscount(scope.row)">设置优惠</el-button>
                        </template>
                        <el-button size="mini" type="success" @click="recoverCourse(scope.row.cid)" v-else>还原
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
        <el-dialog :title="dialogFormInfo.title" width="650px" :visible.asnc="dialogVisible"
                   @close="dialogVisible = false">
            <!--对话框内容 S-->
            <div class="dialog-content course-dialog">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         label-position="left">
                    <el-form-item label="课程名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="课程体系" required prop="system">
                                <el-select v-model="ruleForm.system" placeholder="选择课程体系" @change="getType" value="">
                                    <el-option v-for="sys in system" :key="sys.id"
                                               :label="sys.name" :value="sys.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="课程类别" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="选择课程类别" value="">
                                    <el-option v-for="tp in type" :key="tp.id"
                                               :label="tp.name" :value="tp.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                    <el-form-item label="课程简介" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="课程详情" prop="detail">
                        <el-input type="textarea" v-model="ruleForm.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="课程封面" prop="cover">
                        <el-upload class="cover" enctype="multipart/form-data" name="cover" :auto-upload="false"
                                   action="/api/teacher/course" :show-file-list="false"
                                   :before-upload="beforeCoverUpload" :on-change="chooseCover"
                                   :headers="headers" :data="ruleForm" :on-success="handleSuccess" ref="upload">
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
                        <el-button type="primary" :disabled="formSubmit" @click="submitForm('ruleForm')">
                            {{dialogFormInfo.type}}
                        </el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--对话框内容 E-->
        </el-dialog>
        <el-dialog title="设置课程详情图片" width="550px" :visible.asnc="coverDialogVisible"
                   @close="coverDialogVisible=false">
            <div class="dialog-content detail-dialog">
                <el-upload class="detail-cover" enctype="multipart/form-data" name="detail-cover" :auto-upload="false"
                           action="/api/teacher/course/detail-cover" :show-file-list="false"
                           :before-upload="beforeDetailCoverUpload" :on-change="chooseDetailCover"
                           :headers="headers" :data="{id:detailId}" :on-success="handleDetailSuccess"
                           ref="upload-detail-cover">
                    <div class="cover-image" slot="trigger">
                        <el-image :src="detailCoverUrl" v-if="detailCoverUrl">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                        <div v-else class="cover-uploader-icon">
                            <font-awesome-icon icon="plus"></font-awesome-icon>
                        </div>
                    </div>
                </el-upload>
            </div>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitDetailCover">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置课程优惠" width="400px" :visible.async="discountDialog"
                   @close="discountDialog=false">
            <div class="dialog-content discount-dialog">
                <div class="dialog-item">
                    <span class="title">课程原价：</span>{{coursePrice}}
                </div>
                <div class="dialog-item">
                    <span class="title">折扣(XX折)：</span>
                    <el-input-number v-model="discount" :step="1" :max="100" :min="1"></el-input-number>
                </div>
                <div class="dialog-item">
                    <span class="title">折后价格：</span>{{computeDiscountPrice}}
                </div>
                <div class="dialog-item">
                    <span class="title">截止日期：</span>
                    <el-date-picker v-model="discountTime" type="date" placeholder="选择截止日期"></el-date-picker>
                </div>
            </div>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitDiscount">提交</el-button>
            </div>
        </el-dialog>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Loading, Message, MessageBox} from 'element-ui'
    import {
        deleteCourse,
        getCourseInfo,
        recoverCourse,
        setCourseDiscount,
        updateCourseInfo,
    } from "@/api/course-manage";
    import {getCourseSystem, getCourseType} from "@/api/course";
    import moment from "moment"

    export default {
        name: "CourseManage",
        data() {
            // 是否选择图片
            const validateImg = (rule, value, callback) => {
                if (this.imageUrl === false) {
                    callback('请选择课程封面图片');
                } else callback();
            };
            // 输入的课程价格是否合法
            const validatePrice = (rule, value, callback) => {
                if (value === '') callback('请输入课程价格');
                else if (!Number.isInteger(parseInt(value))) callback('请输入整数数字');
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
                    detail: '',
                    option: ''
                },
                system: [],
                type: [],
                rules: {
                    name: [
                        {required: true, message: '请输入课程名称', trigger: 'blur'},
                        {min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur'}
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
                    detail: [
                        {required: true, message: '请填写课程详情', trigger: 'blur'},
                        {min: 10, max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur'}
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
                formSubmit: false,
                headers: {authorization: localStorage.getItem('token')},
                coverDialogVisible: false,
                detailCoverUrl: null,
                detailId: null,
                loadingInstance: null,
                uploadLoading: false,
                discountDialog: false,
                discount: 100,
                discountId: null,
                coursePrice: null,
                discountPrice: 0,
                discountTime: null
            }
        },
        methods: {
            // 获取课程
            async getCourse(page, search) {
                this.currentPage = page;
                this.tableData = [];
                let res = search === '' ?
                    await getCourseInfo({page}) :
                    await getCourseInfo({page, search});
                if (res) {
                    let courses = res.course;
                    this.pageSum = res.pageSum;
                    for (let course of courses) {
                        this.tableData.push({
                            cid: course.id,
                            cname: course.name,
                            sid: course.system.id,
                            sname: course.system.name,
                            tid: course.type.id,
                            tname: course.type.name,
                            arra: course.detail.arrange,
                            detail: course.detail.detail,
                            desc: course.description,
                            ftime: moment(course.detail.finish).format('YYYY-MM-DD'),
                            stime: moment(course.detail.start).format('YYYY-MM-DD'),
                            detailCover: course.detail.coverUrl,
                            price: course.price,
                            live: course.form === 'L',
                            cover: course.image,
                            delete: !!course.deletedAt,
                            discount: course.discount,
                            discountTime: course.discountTime
                        })
                    }
                }
            },
            // 页码改变
            pageChanged(val) {
                this.isSearch ?
                    this.getCourse(val, this.searchContent) :
                    this.getCourse(val, '');
            },
            // 获取课程体系
            async getSystem() {
                this.system = await getCourseSystem();
            },
            // 获取课程类别
            async getType(system) {
                this.type = await getCourseType({system});
                this.ruleForm.type = this.type.length > 0 ? this.type[0].id : '';
            },
            // 初始化ruleForm
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
                    detail: '',
                    option: '',
                };
                this.imageUrl = false;
                this.imageSubmit = false;
            },
            // 添加课程
            addCourse() {
                this.initRuleForm();
                this.resetForm('ruleForm');
                this.dialogVisible = true;
                this.dialogFormInfo.title = "添加课程";
                this.dialogFormInfo.type = "立即创建";
                this.ruleForm.option = "add";
                this.getSystem();
            },
            // 更新课程
            async updateCourse(val) {
                this.initRuleForm();
                await this.getSystem();
                await this.getType(val.sid);
                this.ruleForm.id = val.cid;
                this.ruleForm.name = val.cname;
                this.ruleForm.system = val.sid;
                this.ruleForm.type = val.tid;
                this.ruleForm.start = val.stime;
                this.ruleForm.finish = val.ftime;
                this.ruleForm.arrange = val.arra;
                this.ruleForm.desc = val.desc;
                this.ruleForm.detail = val.detail;
                this.ruleForm.charge = val.price > 0;
                this.ruleForm.price = val.price;
                this.ruleForm.live = val.live;
                this.ruleForm.option = "update";
                this.imageUrl = val.cover;
                this.dialogVisible = true;
                this.dialogFormInfo.title = "更新课程";
                this.dialogFormInfo.type = "立即更新";
            },
            // 搜索课程
            search() {
                if (this.searchContent === null || this.searchContent === '') Message.info('输入内容不能为空');
                else {
                    this.isSearch = true;
                    this.getCourse(1, this.searchContent);
                }
            },
            // 清空搜索框
            clearSearch() {
                this.searchContent = '';
                this.getCourse(1, '');
            },
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.formSubmit = true;
                        if (this.imageSubmit) this.$refs.upload.submit();
                        else {
                            let res = await updateCourseInfo(this.ruleForm);
                            if (res) this.handleSuccess(res);
                        }
                    } else return false;
                });
            },
            // 重置表单内容
            resetForm(formName) {
                if (this.$refs[formName] !== undefined)
                    this.$refs[formName].resetFields();
                this.imageUrl = false;
            },
            // 选择封面图片
            chooseCover(file) {
                if (this.beforeCoverUpload(file.raw)) {
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.imageSubmit = true;
                }
            },
            // 选择课程详情图片
            chooseDetailCover(file) {
                if (this.beforeDetailCoverUpload(file.raw)) {
                    this.detailCoverUrl = URL.createObjectURL(file.raw);
                }
            },
            // 提交封面图片之前检查
            beforeCoverUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG) Message.error('上传图片只能是 JPG 或 PNG 格式!');
                if (!isLt4M) Message.error('上传图片大小不能超过 4MB!');
                return isJPG && isLt4M;
            },
            // 提交课程详情图片之前检查
            beforeDetailCoverUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt8M = file.size / 1024 / 1024 < 8;
                if (!isJPG && !isPNG) Message.error('上传图片只支持 PNG 与 JPG 格式');
                if (!isLt8M) Message.error('上传图片大小不能超过8MB');
                return (isJPG || isPNG) && isLt8M;
            },
            // 提交课程详情图片
            submitDetailCover() {
                this.loadingInstance = Loading.service({
                    lock: true,
                    text: '上传中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$refs['upload-detail-cover'].submit();
            },
            // 添加/更改提交成功后执行
            handleSuccess(res) {
                this.formSubmit = false;
                if (res.code === 1000) {
                    Message.success(res.msg);
                    this.dialogVisible = false;
                    this.resetForm('ruleForm');
                    this.getCourse(1, '');
                } else Message.error(res.msg);
            },
            handleDetailSuccess(res) {
                this.loadingInstance.close();
                if (res.code === 1000) {
                    this.coverDialogVisible = false;
                    this.getCourse(1, '');
                    Message.success(res.msg);
                } else Message.error(res.msg);
            },
            // 删除课程
            deleteCourse(id) {
                MessageBox.confirm('确定要删除该节课程吗？（删除后可手动还原）', "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteCourse({id});
                    if (res) {
                        Message.success(res.msg);
                        this.getCourse(1, '');
                    }
                }).catch(() => {
                    Message.info("已取消删除操作");
                })
            },
            // 还原删除的课程
            recoverCourse(id) {
                MessageBox.confirm('确定要还原该节课程吗？', "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await recoverCourse({id});
                    if (res) {
                        Message.success(res.msg);
                        this.getCourse(1, '');
                    }
                }).catch(() => {
                    Message.info("已取消还原操作");
                })
            },
            // 设置课程详情图片
            setDetailCover(course) {
                this.detailId = course.cid;
                this.detailCoverUrl = course.detailCover;
                this.coverDialogVisible = true;
            },
            // 设置课程折扣
            setDiscount(course) {
                this.discountDialog = true;
                this.coursePrice = course.price;
                this.discountId = course.cid;
                this.discount = course.discount ? course.discount : 100;
                this.discountTime = course.discountTime
            },
            // 提交课程折扣
            submitDiscount() {
                let data = {
                    id: this.discountId,
                    discount: this.discount,
                    discountTime: this.discountTime
                };
                setCourseDiscount(data).then(res => {
                    if (res) {
                        Message.success(res.msg);
                        this.discountDialog = false;
                        this.getCourse(1, '');
                    }
                });
            }
        },
        computed: {
            computeDiscountPrice() {
                return (this.discount * this.coursePrice / 100).toFixed(2);
            }
        },
        created() {
            this.getCourse(1, '');
        }
    }
</script>

<style lang="less">
    .manage-view {
        .course-dialog {
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

        .detail-dialog {
            .detail-cover {
                position: relative;
                overflow: hidden;

                .cover-image {
                    width: 508px;
                    height: 510px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    position: relative;
                    border: 1px solid #ddd;

                    img {
                        width: 100%;
                    }
                }
            }

            .cover-uploader-icon {
                font-size: 100px;
                color: #8c939d;
                height: 100%;
                width: 100%;
                line-height: 510px;
            }

            .cover-uploader-icon i {
                vertical-align: middle;
                margin-bottom: 5px;
            }
        }

        .discount-dialog {
            .dialog-item {
                padding: 10px 20px;

                .title {
                    display: inline-block;
                    width: 90px;
                }
            }
        }
    }
</style>
