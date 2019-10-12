<template>
    <div class="flex-list">
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell first">课程价格</div>
                <div class="flex-cell">操作</div>
            </div>
        </div>
        <div class="flex-list-no-data" v-if="courses.length===0">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无收藏课程</div>
                </div>
            </div>
        </div>
        <div class="flex-list-item" v-else v-for="course in courses" :key="course['courseID']">
            <div class="flex-row content">
                <div class="flex-cell first cover">
                    <router-link :to="`/course/${course['courseID']}`">
                        <el-image :src="course['CourseInformation']['courseImage']">
                            <template slot="error">
                                <img src="../../assets/image/load-error.jpg" alt>
                            </template>
                        </el-image>
                        <div class="title">{{course['CourseInformation']['courseName']}}</div>
                    </router-link>
                </div>
                <div class="flex-cell first" style="color: #00a1d6">
                    {{course['CourseInformation']['price']===0?'免费':`￥${course['CourseInformation']['price']}`}}
                </div>
                <div class="flex-cell">
                    <a class="btn-operate" @click="collectCourse(course['courseID'])">取消收藏</a>
                </div>
            </div>
        </div>
        <div class="sort-page" v-if="courses.length>0">
            <el-pagination background layout="prev, pager, next"
                           :pager-count="5" @current-change="getCourse"
                           :total="10*count" :hide-on-single-page="true">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getCollectionCourse} from "@/api/profile";
    import {collectCourse} from "@/api/course";
    import {Message} from 'element-ui'

    export default {
        name: "Collection",
        data() {
            return {
                count: 1,
                courses: []
            }
        },
        methods: {
            async getCourse(page) {
                const res = await getCollectionCourse({page});
                if (res) {
                    this.count = res.pageSum;
                    this.courses = res.courses;
                }
            },
            async collectCourse(courseID) {
                const res = await collectCourse({courseID, value: 0});
                if (res) {
                    Message.success(res.msg);
                    this.getCourse(1);
                }
            }
        },
        created() {
            this.getCourse(1);
        }
    }
</script>
