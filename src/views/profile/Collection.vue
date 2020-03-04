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
                    <span><font-awesome-icon icon="info-circle"/></span>
                </div>
                <div class="box-text">
                    <div>暂无收藏课程</div>
                </div>
            </div>
        </div>
        <div class="flex-list-item" v-else v-for="course in courses" :key="course.id">
            <div class="flex-row content">
                <div class="flex-cell first cover">
                    <router-link :to="`/course/${course.id}/information`">
                        <el-image :src="course.image">
                            <template slot="error">
                                <img src="../../assets/image/load-error.jpg" alt>
                            </template>
                        </el-image>
                        <div class="title">{{course.name}}</div>
                    </router-link>
                </div>
                <div class="flex-cell first" style="color: #00a1d6">
                    {{course.price===0?'免费':`${course.price} 课程币`}}
                </div>
                <div class="flex-cell">
                    <a class="btn-operate" @click="collectCourse(course.id)">取消收藏</a>
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
            async collectCourse(id) {
                const res = await collectCourse({id, value: 0});
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
