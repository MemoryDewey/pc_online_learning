<template>
    <div id="container">
        <app-header :page="page"></app-header>
        <div id="index">
            <div class="banner-slide">
                <el-carousel trigger="click" height="400px">
                    <el-carousel-item>
                        <a style="background-color: #010004" class="banner-slide-a" href="https://www.blockchain.com/zh"
                           target="_blank">
                            <img alt="" src="../../assets/image/block-chain.jpg" class="banner-slide-img">
                        </a>
                    </el-carousel-item>
                    <el-carousel-item>
                        <a style="background-color:#000000" class="banner-slide-a" href="https://bitcoin.org/zh_CN/"
                           target="_blank">
                            <img alt="" src="../../assets/image/bitcoin.jpg" class="banner-slide-img">
                        </a>
                    </el-carousel-item>
                    <el-carousel-item>
                        <a style="background-color: #131313" class="banner-slide-a" href="https://www.ethereum.org/"
                           target="_blank">
                            <img alt="" src="../../assets/image/ethereum.png" class="banner-slide-img">
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
                            <li v-for="course in chargeCourse" :key="course.courseID">
                                <router-link :to="{path:`/course/${course.courseID}/information`}">
                                    <img v-lazy="course.courseImage" alt="">
                                    <div class="course-title">{{course.courseName}}</div>
                                    <div class="course-info clear">
                                        <div style="float: left;color: #e85308;">￥ {{course.price}}</div>
                                        <div class="apply-num">
                                            {{course.applyCount}}人已报名
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="course-fee" v-if="!courseFee">
                        <ul class="clear">
                            <li v-for="course in freeCourse" :key="course.courseID">
                                <router-link :to="{path:`/course/${course.courseID}/information`}">
                                    <img v-lazy="course.courseImage" alt="">
                                    <div class="course-title">{{course.courseName}}</div>
                                    <div class="course-info clear">
                                        <div style="float: left;color: #42c02e;">免费</div>
                                        <div class="apply-num">{{course.applyCount}}人已报名</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="project" v-if="false">
                    <div class="header clear">
                        <ul class="clear">
                            <li class="active" style="border-right: 0;padding: 0">最新项目</li>
                        </ul>
                        <div class="more">
                            <a @click="canDown = !canDown" v-if="canDown && project.length > 4">展开
                                <font-awesome-icon icon="angle-double-down"></font-awesome-icon>
                            </a>
                            <a @click="canDown = !canDown" v-if="!canDown">收起
                                <font-awesome-icon icon="angle-double-up"></font-awesome-icon>
                            </a>
                        </div>
                    </div>
                    <div class="project-container" :class="{down: !canDown}">
                        <ul class="clear">
                            <li v-for="pro in project" :key="pro.projectID">
                                <router-link :to="`/project/${pro.projectID}/information`" tag="div">
                                    <img v-lazy="pro.projectPic" alt="">
                                    <div class="project-title">{{pro.projectName}}</div>
                                    <div class="duration">
                                        {{pro.projectIntro}}
                                    </div>
                                    <div class="project-info">
                                        <div class="apply-num">{{pro.applyCount}}人已申请</div>
                                        <div class="reward">项目资金：{{pro.projectFee}} BST</div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from '../../components/common/Header'
    import Footer from '../../components/common/Footer'
    import Project from "../teacher/Project";
    import {getIndexCourse} from "../../api/course";
    import {getIndexProject} from "../../api/project";

    export default {
        name: "index",
        data() {
            return {
                page: "home",
                chargeActive: {active: true},
                freeActive: {active: false},
                courseFee: true,
                newActive: {active: true},
                hotActive: {active: false},
                projectNew: true,
                canDown: true,
                freeCourse: [],
                chargeCourse: [],
                project: []
            }
        },
        methods: {
            changeCourseFee() {
                this.courseFee = !this.courseFee;
                let temp = this.chargeActive.active;
                this.chargeActive.active = this.freeActive.active;
                this.freeActive.active = temp;
            }
        },
        components: {
            Project,
            "app-header": Header,
            "app-footer": Footer
        },
        async created() {
            try {
                let course = await getIndexCourse();
                this.freeCourse = course.freeCourse;
                this.chargeCourse = course.chargeCourse;
                /*let res = await getIndexProject();
                this.project = res.sqlres;*/
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
            height: 400px;
            min-width: 1240px;
            z-index: 10;
            display: block;
        }

        .banner-slide-a {
            display: block;
            width: 100%;
            height: 400px;
        }

        .banner-slide-img {
            display: block;
            height: 400px;
            width: 710px;
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

                img {
                    display: inline-block;
                    width: 100%;
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

            .project {
                .project-container {
                    display: block;
                    width: 100%;
                    height: 280px;
                    overflow: hidden;

                    ul {
                        width: 100%;

                        li {
                            float: left;
                            width: 270px;
                            border-radius: 6px;
                            border: 1px solid #eee;
                            margin-right: 40px;
                            margin-bottom: 25px;
                            box-sizing: border-box;
                            text-align: center;
                            cursor: pointer;

                            a {
                                text-decoration: none;
                                cursor: pointer;
                            }

                            &:nth-child(4n) {
                                margin-right: 0;
                            }

                            .project-title {
                                width: 100%;
                                text-align: center;
                                margin-top: 13px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            .project-info {
                                margin-top: 2px;
                                text-align: left;

                                .apply-num {
                                    float: left;
                                    color: #888;
                                    margin-left: 10px;
                                    margin-bottom: 5px;
                                }

                                .reward {
                                    margin-right: 10px;
                                    margin-bottom: 5px;
                                    float: right;
                                    color: #e85308;
                                }
                            }
                        }
                    }
                }

                .down {
                    height: 560px;
                }
            }
        }
    }
</style>
