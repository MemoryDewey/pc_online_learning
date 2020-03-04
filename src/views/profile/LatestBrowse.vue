<template>
    <div class="flex-list">
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell first">课程价格</div>
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
                    <div>最近暂无浏览课程</div>
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
            </div>
        </div>
    </div>
</template>

<script>
    import {getLatestBrowseCourse} from "@/api/profile";

    export default {
        name: "LatestBrowse",
        data() {
            return {
                courses: []
            }
        },
        created() {
            getLatestBrowseCourse().then(res => {
                if (res) this.courses = res;
            });
        }
    }
</script>
