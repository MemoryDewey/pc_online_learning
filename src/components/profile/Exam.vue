<template>
    <div class="flex-list">
        <!--考试列表顶部信息 S-->
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell">状态</div>
                <div class="flex-cell">分数</div>
                <div class="flex-cell">时间</div>
            </div>
        </div>
        <!--考试列表顶部信息 E-->
        <!--考试不存在 S-->
        <div class="flex-list-no-data" v-if="courses.length===0">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无考试信息</div>
                </div>
            </div>
        </div>
        <!--考试不存在 E-->
        <!--课程存在 S-->
        <div class="flex-list-item" v-else v-for="course in courses" :key="course['courseID']">
            <div class="flex-row head">
                <div class="time">{{course['joinTime']}}</div>
            </div>
            <div class="flex-row content">
                <div class="flex-cell first cover">
                    <router-link :to="`/course/${course['courseID']}`">
                        <el-image :src="course.image">
                            <template slot="error">
                                <img src="../../assets/image/commodity-error.jpg" alt>
                            </template>
                        </el-image>
                        <div class="title">{{course['courseName']}}</div>
                    </router-link>
                </div>
                <div class="flex-cell state">{{course['state']}}</div>
                <div class="flex-cell score">{{course['score']}}</div>
                <div class="flex-cell time">{{course['time']['startTime']}}-{{course['time']['endTime']}}</div>
            </div>
        </div>
        <!--课程存在 E-->
        <!--分页 S-->
        <div class="sort-page" v-if="courses.length>0">
            <el-pagination background layout="prev, pager, next"
                           :pager-count="5" @current-change="pageChanged"
                           :total="10*count">
            </el-pagination>
        </div>
        <!--分页 E-->
    </div>
</template>

<script>
    import {getExam} from '../../api/profile'

    export default {
        name: "Exam",
        data() {
            return {
                count: 1,
                courses: [],
            }
        },
        methods: {
            //获取课程信息
            async getExam(page) {
                let response = await getExam({page});
                if (response) {
                    this.count = response.pageSum;
                    this.courses = response.course;
                }
            },
            //页码改变
            pageChanged(val) {
                this.getExam(val);
            }
        },
        created() {
            this.getExam(1);
        }
    }
</script>
