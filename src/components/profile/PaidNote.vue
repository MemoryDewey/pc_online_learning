<template>
    <div class="flex-list">
        <!--课程列表顶部信息 S-->
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="课程币" name="rmb">
                <div class="flex-list-header">
                    <div class="flex-row">
                        <div class="flex-cell first">课程信息</div>
                        <div class="flex-cell first">支付金额</div>
                    </div>
                </div>
                <div class="flex-list-no-data" v-if="rmbCourses.length===0">
                    <div class="status-box">
                        <div class="box-icon">
                        <span>
                            <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </span>
                        </div>
                        <div class="box-text">
                            <div>暂无支付信息</div>
                        </div>
                    </div>
                </div>
                <div class="flex-list-item" v-else v-for="course in rmbCourses"
                     :key="course['productID']">
                    <div class="flex-row head">
                        <div class="time">{{course['createdAt']}}</div>
                    </div>
                    <div class="flex-row content">
                        <div class="flex-cell first cover">
                            <el-image :src="course['CourseInformation'].courseImage">
                                <template slot="error">
                                    <img src="../../assets/image/commodity-error.jpg" alt>
                                </template>
                            </el-image>
                            <div class="title">{{course['CourseInformation'].courseName}}</div>
                        </div>
                        <div class="flex-cell first state">{{course.amount}} 课程币</div>
                    </div>
                </div>
                <div class="sort-page">
                    <el-pagination background layout="prev, pager, next"
                                   :pager-count="10" @current-change="getRmbCourse"
                                   :total="10*rmbPageSum" :hide-on-single-page="true">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="B S T" name="bst">
                <div class="flex-list-header">
                    <div class="flex-row">
                        <div class="flex-cell first">课程信息</div>
                        <div class="flex-cell first">支付代币</div>
                        <div class="flex-cell first">区块信息</div>
                    </div>
                </div>
                <div class="flex-list-no-data" v-if="bstCourses.length===0">
                    <div class="status-box">
                        <div class="box-icon">
                        <span>
                            <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        </span>
                        </div>
                        <div class="box-text">
                            <div>暂无支付信息</div>
                        </div>
                    </div>
                </div>
                <div class="flex-list-item" v-else v-for="course in bstCourses"
                     :key="course['productID']">
                    <div class="flex-row head">
                        <div class="time">{{course['createdAt']}}</div>
                    </div>
                    <div class="flex-row content">
                        <div class="flex-cell first cover">
                            <el-image :src="course['CourseInformation'].courseImage">
                                <template slot="error">
                                    <img src="../../assets/image/commodity-error.jpg" alt>
                                </template>
                            </el-image>
                            <div class="title">{{course['CourseInformation'].courseName}}</div>
                        </div>
                        <div class="flex-cell first state">{{course.amount}} BST</div>
                        <div class="flex-cell first hash">{{course['txHash']}}</div>
                    </div>
                </div>
                <div class="sort-page">
                    <el-pagination v-if="activeName==='rmb'" background layout="prev, pager, next"
                                   :pager-count="10" @current-change="getRmbCourse"
                                   :total="10*rmbPageSum" :hide-on-single-page="true">
                    </el-pagination>
                    <el-pagination v-else background layout="prev, pager, next"
                                   :pager-count="10" @current-change="getBstCourse"
                                   :total="10*bstPageSum" :hide-on-single-page="true">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
    import {getWalletBstCourse, getWalletCourse} from "@/api/profile";

    export default {
        name: "Wallet",
        data() {
            return {
                activeName: 'rmb',
                rmbPageSum: 1,
                rmbCourses: [],
                bstPageSum: 1,
                bstCourses: []
            }
        },
        methods: {
            //获取RMB支付课程信息
            async getRmbCourse(page) {
                let res = await getWalletCourse({page});
                if (res) {
                    this.rmbCourses = res.courses;
                    this.rmbPageSum = res.pageSum;
                }
            },
            //获取BST支付课程信息
            async getBstCourse(page) {
                let res = await getWalletBstCourse({page});
                if (res) {
                    this.bstCourses = res.courses;
                    this.bstPageSum = res.pageSum;
                }
            }
        },
        created() {
            this.getRmbCourse(1);
            this.getBstCourse(1);
        }

    }
</script>
