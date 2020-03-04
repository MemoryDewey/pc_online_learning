<template>
    <div id="container">
        <div id="index">
            <div class="banner-slide">
                <el-carousel trigger="click" height="400px">
                    <el-carousel-item v-for="banner in banners" :key="banner.id">
                        <a :style="{'background-color': banner.fillColor}" :href="banner.url"
                           class="banner-slide-a">
                            <img :src="banner.image" alt class="banner-slide-img">
                        </a>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="content">
                <div class="content-course" style="margin-bottom: 30px">
                    <div class="header clear">
                        <ul class="clear">
                            <li v-bind:class="chargeActive" @click="changeCourseFee">付费课程</li>
                            <li v-bind:class="freeActive" @click="changeCourseFee">免费课程</li>
                        </ul>
                        <div class="more">
                            <router-link to="/course/list">更多课程 >></router-link>
                        </div>
                    </div>
                    <div class="course-fee" v-if="courseFee">
                        <ul class="clear">
                            <li v-for="course in chargeCourse" :key="course.id">
                                <router-link :to="{path:`/course/${course.id}/information`}">
                                    <el-image :src="course.image" lazy>
                                        <template slot="error">
                                            <img src="../assets/image/load-error.jpg" alt>
                                        </template>
                                        <div slot="placeholder" class="image-slot"></div>
                                    </el-image>
                                    <div class="course-title">{{course.name}}</div>
                                    <div class="course-info clear">
                                        <div style="float: left;color: #e85308;">{{course.price}} 课程币</div>
                                        <div class="apply-num">
                                            {{course.apply}}人已报名
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="course-fee" v-if="!courseFee">
                        <ul class="clear">
                            <li v-for="course in freeCourse" :key="course.id">
                                <router-link :to="{path:`/course/${course.id}/information`}">
                                    <el-image :src="course.image" lazy>
                                        <template slot="error">
                                            <img src="../assets/image/load-error.jpg" alt>
                                        </template>
                                        <div slot="placeholder" class="image-slot"></div>
                                    </el-image>
                                    <div class="course-title">{{course.name}}</div>
                                    <div class="course-info clear">
                                        <div style="float: left;color: #42c02e;">免费</div>
                                        <div class="apply-num">{{course.apply}}人已报名</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getIndexBanner, getIndexCourse} from "@/api/course";

    export default {
        name: "index",
        data() {
            return {
                chargeActive: {active: true},
                freeActive: {active: false},
                courseFee: true,
                newActive: {active: true},
                hotActive: {active: false},
                freeCourse: [],
                chargeCourse: [],
                banners: []
            }
        },
        methods: {
            changeCourseFee() {
                this.courseFee = !this.courseFee;
                let temp = this.chargeActive.active;
                this.chargeActive.active = this.freeActive.active;
                this.freeActive.active = temp;
            },
            async getBanner() {
                let res = await getIndexBanner();
                this.banners = res.banners;
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'index');
        },
        async created() {
            try {
                let course = await getIndexCourse();
                this.freeCourse = course.freeCourse;
                this.chargeCourse = course.chargeCourse;
                await this.getBanner();
            } catch (e) {
                console.log(e);
            }
        }
    }
</script>

<style lang="less">
    #index {
        * {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 14px;
        }

        *, :after, :before {
            box-sizing: border-box
        }

        ul, li {
            list-style: none;
        }

        img {
            vertical-align: middle;
        }

        .clear:after {
            display: block;
            content: "";
            clear: both;
        }

        .banner-slide {
            position: relative;
            height: 405px;
            min-width: 1240px;
            z-index: 10;
            display: block;
        }

        .banner-slide-a {
            display: block;
            width: 100%;
            height: 405px;
        }

        .banner-slide-img {
            display: block;
            height: 405px;
            width: 720px;
            margin: 0 auto;
            position: relative;
        }

        .content {
            .content-course, .project {
                width: 1200px;
                margin: 0 auto;
                min-height: 303px;
                padding-top: 40px;

                a {
                    text-decoration: none;
                    background-color: transparent;
                }

                .image-slot{
                    width: 270px;
                    height: 170px;
                }

                img {
                    display: inline-block;
                    width: 270px;
                    height: 170px;
                    border-radius: 6px;
                }
            }

            .header {
                margin-bottom: 20px;

                ul {
                    float: left;
                    height: 22px;

                    li {
                        display: inline-block;
                        box-sizing: border-box;
                        font-size: 22px;
                        color: #888;
                        line-height: 22px;
                        cursor: pointer;

                        &:first-child {
                            border-right: 1px solid #888;
                            padding-right: 16px;
                            padding-left: 0;
                        }

                        &:last-child {
                            padding-left: 16px;
                        }
                    }

                    .active {
                        color: #202020;
                    }
                }

                .more {
                    float: right;
                    display: block;
                    line-height: 22px;
                    cursor: pointer;

                    &:hover a {
                        color: #409eff;
                    }

                    a {
                        text-decoration: none;
                        color: #888;
                    }
                }
            }

            .content-course {
                .course-fee {
                    display: block;

                    li {
                        float: left;
                        width: 270px;
                        margin-right: 40px;

                        .course-title {
                            color: #202020;
                            margin-top: 8px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: left;
                        }

                        &:last-child {
                            margin-right: 0;
                        }

                        .course-info {
                            margin-top: 2px;
                            text-align: left;
                        }
                    }

                    .apply-num {
                        float: right;
                        color: #888;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
