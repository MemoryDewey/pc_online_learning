<template>
    <div class="flex-list">
        <!--课程列表顶部信息 S-->
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell">价格</div>
                <div class="flex-cell">状态</div>
                <div class="flex-cell">成绩</div>
                <div class="flex-cell">操作</div>
            </div>
        </div>
        <!--课程列表顶部信息 E-->
        <!--课程列表 S-->
        <!--课程不存在 S-->
        <div class="flex-list-no-data" v-if="courses.length===0">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无课程信息</div>
                </div>
            </div>
        </div>
        <!--课程不存在 E-->
        <!--课程存在 S-->
        <div class="flex-list-item" v-else v-for="course in courses" :key="course['courseID']">
            <div class="flex-row head">
                <div class="time">{{course['joinTime']}}</div>
            </div>
            <div class="flex-row content">
                <div class="flex-cell first cover">
                    <router-link :to="`/course/${course['courseID']}`">
                        <img :src="course.image" alt="">
                        <div class="title">{{course['courseName']}}</div>
                    </router-link>
                </div>
                <div class="flex-cell price">{{course['price']===0?'免费':course['price']}}</div>
                <div class="flex-cell state">已报名</div>
                <div class="flex-cell score">{{course['score']}}</div>
                <div class="flex-cell operating">
                    <a class="btn-operate" @click="openDialog(course['courseID'])">
                        评价课程
                    </a>
                    <a class="btn-operate" v-if="course['price']===0" @click="cancelCourse(course['courseID'])">
                        取消报名
                    </a>
                </div>
            </div>
        </div>
        <!--课程存在 E-->
        <!--课程列表 E-->
        <!--分页 S-->
        <div class="sort-page" v-if="courses.length>0">
            <el-pagination background layout="prev, pager, next"
                           :pager-count="5" @current-change="pageChanged"
                           :total="10*count">
            </el-pagination>
        </div>
        <!--分页 E-->
        <!--对话框 S-->
        <div class="comment-dialog">
            <el-dialog :show-close="false" :visible.asnc="dialogVisible" top="20vh" width="476px"
                       style="text-align: left">
                <!--对话框标题 S-->
                <div slot="title" class="dialog-title">
                    {{dialogFormInfo.title}}
                    <button class="close" @click="dialogVisible = false">×</button>
                </div>
                <!--对话框标题 E-->
                <!--评分 S-->
                <div class="verbose-rating">
                    <div class="label-rate">
                        总评
                    </div>
                    <el-rate v-model="dialogFormInfo.rateValue" show-text
                             :texts="['非常失望，差评', '比较失望，勉强中评',
                         '一般，中评', '还不错，好评', '点赞，五星好评']">
                    </el-rate>
                </div>
                <div class="rating-text-area">
                    <div class="label-rate">
                        评价内容
                    </div>
                    <label>
                    <textarea placeholder="课程怎么样？快来说说学习感受吧" v-model="dialogFormInfo.text"
                              @keyup="checkInput"></textarea>
                    </label>
                    <div class="text-area-remain">
                        还可以输入<span style="color: #e80808;">{{dialogFormInfo.remain}}</span> 字
                    </div>
                    <div class="tip-error" v-if="!dialogFormInfo.qualified"><i class="fas fa-info-circle"></i>
                        {{dialogFormInfo.errorMsg}}
                    </div>
                </div>
                <!--评分 E-->
                <!--对话框底部 S-->
                <div slot="footer" class="dialog-footer">
                    <span class="dialog-button dialog-button-submit" @click="submitComment(dialogCourseID)">确认</span>
                    <span class="dialog-button dialog-button-cancer" @click="dialogVisible = false">取消</span>
                </div>
                <!--对话框底部 E-->
            </el-dialog>
        </div>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {addComment} from '../../api/course'
    import {getCourse, cancelFree} from '../../api/profile'

    export default {
        name: "Course",
        data() {
            return {
                count: 1,
                courses: [],
                dialogCourseID: 0,
                dialogVisible: false,
                dialogFormInfo: {
                    title: '评价课程',
                    rateValue: 5,
                    remain: 1000,
                    qualified: true,
                    errorMsg: '',
                    text: ''
                }
            }
        },
        methods: {
            //获取课程信息
            async getCourse(page) {
                let response = await getCourse({page});
                if (response) {
                    this.count = response.count % 4 === 0 ?
                        Math.floor(response.count / 4) : Math.floor(response.count / 4) + 1;
                    this.courses = response.course;
                }
            },
            //检测评论框输入
            checkInput() {
                this.dialogFormInfo.remain = 1000 - this.dialogFormInfo.text.length;
                if (this.dialogFormInfo.text.length < 15) {
                    this.dialogFormInfo.qualified = false;
                    this.dialogFormInfo.errorMsg = '小于15字的评论无法提交，请修改';
                } else if (this.dialogFormInfo.text.length > 1000) {
                    this.dialogFormInfo.qualified = false;
                    this.dialogFormInfo.errorMsg = '大于1000字的评论无法提交，请修改';
                } else this.dialogFormInfo.qualified = true;
            },
            //打开评论框
            openDialog(courseID) {
                this.dialogVisible = true;
                this.dialogCourseID = courseID;
            },
            //提交评论
            async submitComment(courseID) {
                this.checkInput();
                if (this.dialogFormInfo.qualified) {
                    let response = await addComment({
                        courseID,
                        star: this.dialogFormInfo.rateValue,
                        comment: this.dialogFormInfo.text
                    });
                    if (response) {
                        this.dialogVisible = false;
                        Message.success(response.msg);
                    }
                }
            },
            //取消报名
            async cancelCourse(courseID) {
                MessageBox.confirm('确定取消报名该节课程？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await cancelFree({courseID});
                    if (response) {
                        Message.success(response.msg);
                        this.getCourse(1);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            },
            //页码改变
            pageChanged(val) {
                this.getCourse(val);
            }
        },
        created() {
            this.getCourse(1);
        }
    }
</script>
