<template>
    <div class="tabs-comment" :class="{hide:comment.hide}">
        <!--课程评论头部 S-->
        <div class="comment-head">
            <!--好评度 S-->
            <div class="rating-scores">
                <span>{{courseRate<10?courseRate.toFixed(1):courseRate}}</span>
            </div>
            <!--好评度 S-->
            <!--评星 S-->
            <div class="rating">
                <div class="rating-stars">
                    <div class="stars">
                        <div class="dislike">
                            <i class="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                            <i class="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                            <i class="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                            <i class="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                            <i class="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                        </div>
                        <div class="like">
                            <i class="star"
                               v-for="star in courseRateStar"
                               :style="star">
                                <font-awesome-icon icon="star"></font-awesome-icon>
                            </i>
                        </div>
                    </div>
                </div>
                <div class="rating-sum">
                    <span>共{{commentCount['all']}}条评价</span>
                </div>
            </div>
            <!--评星 E-->
            <div class="comment-button-area">
                <div class="info-button comment-button" @click="setComment">我要评价</div>
            </div>
        </div>
        <!--课程评论头部 E-->
        <div class="comment-filter">
            <div class="filter-box">
                <span @click="setCommentFilter(0)" :class="{selected:commentFilter===0}">
                    全部评价({{commentCount['all']}})</span>
                <span @click="setCommentFilter(1)" :class="{selected:commentFilter===1}">
                    好评({{commentCount['good']}})</span>
                <span @click="setCommentFilter(2)" :class="{selected:commentFilter===2}">
                    中评({{commentCount['mid']}})</span>
                <span @click="setCommentFilter(3)" :class="{selected:commentFilter===3}">
                    差评({{commentCount['bad']}})</span>
            </div>
        </div>
        <!--评论列表 S-->
        <div class="comment-list">
            <div class="comment-list-item clearfix" v-for="comment in comments" :key="comment.id">
                <div class="comment-list-item-avatar">
                    <img :src="`${comment['UserInformation'].avatarUrl}`" alt="">
                </div>
                <div class="comment-list-item-body">
                    <div class="user-info">
                        <a>{{comment['UserInformation'].nickname}}</a>
                        <div class="user-info-rating">
                            <div class="stars">
                                <font-awesome-icon icon="star" v-if="comment.star>=1"></font-awesome-icon>
                                <font-awesome-icon icon="star" v-if="comment.star>=2"></font-awesome-icon>
                                <font-awesome-icon icon="star" v-if="comment.star>=3"></font-awesome-icon>
                                <font-awesome-icon icon="star" v-if="comment.star>=4"></font-awesome-icon>
                                <font-awesome-icon icon="star" v-if="comment.star>=5"></font-awesome-icon>
                            </div>
                        </div>
                    </div>
                    <div class="comment-content">
                        <span>{{comment.content}}</span>
                    </div>
                    <div class="comment-time">{{comment.time}}</div>
                </div>
            </div>
            <div class="page-sort">
                <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
                               @current-change="pageChanged" :pager-count="5"
                               :total="commentPage*10" :current-page.sync="pageCurrent">
                </el-pagination>
            </div>
        </div>
        <!--评论列表 E-->
        <!--对话框 S-->
        <div class="comment-dialog">
            <el-dialog :title="dialogFormInfo.title" width="500px" :visible.asnc="dialogVisible"
                       @close="dialogVisible = false">
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
                    <div class="tip-error" v-if="!dialogFormInfo.qualified">
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                        {{dialogFormInfo.errorMsg}}
                    </div>
                </div>
                <!--评分 E-->
                <!--对话框底部 S-->
                <div slot="footer" class="dialog-footer">
                    <span class="dialog-button dialog-button-submit" @click="submitComment">确认</span>
                    <span class="dialog-button dialog-button-cancer" @click="dialogVisible = false">取消</span>
                </div>
                <!--对话框底部 E-->
            </el-dialog>
        </div>
        <!--对话框 E-->
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    import {getClass, addComment, getComment, getCommentCount} from "../../../api/course";

    export default {
        name: "InfoComment",
        data() {
            return {
                courseRate: 0,
                courseRateStar: [],
                commentCount: {},
                comments: [],
                commentPage: 0,
                commentFilter: 0,
                pageCurrent: 1,
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
        props: {
            comment: {type: Object, required: true}
        },
        methods: {
            //设置评星
            setRateStars() {
                this.courseRateStar = [];
                let sumWidth = this.courseRate * 10;
                for (let i = 0; i < 5; i++) {
                    if (sumWidth > 0) {
                        if (sumWidth < 20) {
                            this.courseRateStar.push({
                                width: `${sumWidth}px`
                            });
                        } else {
                            this.courseRateStar.push({
                                width: '20px'
                            });
                        }
                    }
                    sumWidth -= 20;
                }
            },
            //评论课程
            async setComment() {
                let response = await getClass({courseID: this.$route.params.courseID,});
                if (response) this.dialogVisible = true;
            },
            //获取评论
            async getComment(page, filter) {
                let response = await getComment({courseID: this.$route.params.courseID, page, filter});
                if (response) {
                    this.comments = response.comments;
                }
            },
            //获取评论总数
            async getCommentCount(filter) {
                let response = await getCommentCount({courseID: this.$route.params.courseID});
                let count = response.count;
                this.commentCount = response.count;
                this.$emit('getCommentCount', count.all);
                switch (filter) {
                    case 0:
                        this.commentPage = count.all % 5 === 0 ?
                            Math.floor(count.all / 5) : Math.floor(count.all / 5) + 1;
                        break;
                    case 1:
                        this.commentPage = count['good'] % 5 === 0 ?
                            Math.floor(count['good'] / 5) : Math.floor(count['good'] / 5) + 1;
                        break;
                    case 2:
                        this.commentPage = count['mid'] % 5 === 0 ?
                            Math.floor(count['mid'] / 5) : Math.floor(count['mid'] / 5) + 1;
                        break;
                    case 3:
                        this.commentPage = count['bad'] % 5 === 0 ?
                            Math.floor(count['bad'] / 5) : Math.floor(count['bad'] / 5) + 1;
                        break;
                }
            },
            //课程评论页面分页
            pageChanged(val) {
                this.getComment(val, this.commentFilter)
            },
            //设置评论类型
            setCommentFilter(val) {
                this.commentFilter = val;
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
            //提交评论
            async submitComment() {
                this.checkInput();
                if (this.dialogFormInfo.qualified) {
                    let response = await addComment({
                        courseID: this.$route.params.courseID,
                        star: this.dialogFormInfo.rateValue,
                        comment: this.dialogFormInfo.text
                    });
                    if (response) {
                        this.dialogVisible = false;
                        Message.success(response.msg);
                        this.courseRate = response.rate * 10;
                        this.getCommentCount();
                        this.getComment(1, 0);
                        this.setRateStars();
                    }
                }
            }
        },
        watch: {
            courseRate() {
                this.setRateStars();
            },
            commentFilter(val) {
                this.getComment(1, val);
                this.getCommentCount(val);
                this.pageCurrent = 1;
            },
            comment: {
                deep: true,
                handler(val) {
                    this.courseRate = val.courseRate;
                    this.dialogFormInfo.title = val.courseName;
                    if (!val.hide) {
                        this.getCommentCount(0);
                        this.getComment(1, 0);
                    }
                    this.setRateStars();
                }
            },
        }
    }
</script>
<style lang="less">
    @import "../../../assets/css/comment";

    .tabs-content {
        .tabs-comment {
            padding: 20px 0 60px 20px;

            .stars {
                display: inline-block;
                position: relative;
                white-space: nowrap;
            }

            .comment-head {
                margin-bottom: 14px;
                height: 64px;

                .rating-scores {
                    line-height: 64px;
                    font-size: 48px;
                    width: 73px;
                    color: #ffb200;
                    font-weight: bold;
                    margin-right: 15px;
                    float: left;
                }

                .rating {
                    width: 150px;
                    margin-top: 12px;
                    float: left;

                    .rating-stars {
                        height: 25px;

                        .star {
                            font-size: 18px;
                            display: inline-block;
                            margin-right: 9px;
                            overflow: hidden;
                        }

                        .dislike {
                            font-size: 0;
                            position: relative;
                            z-index: 1;

                            svg {
                                color: #dddddd;
                            }
                        }

                        .like {
                            font-size: 0;
                            position: absolute;
                            left: 0;
                            top: 0;
                            overflow: hidden;
                            z-index: 2;

                            svg {
                                color: #ffb200;
                            }
                        }
                    }

                    .rating-sum {
                        font-size: 13px;
                        color: #999999;
                    }
                }

                .comment-button-area {
                    margin-top: 12px;
                    float: right;

                    .comment-button {
                        width: 96px;
                        font-size: 14px;
                        height: 34px;
                        line-height: 34px;
                        border-radius: 1px;
                    }
                }
            }

            .comment-filter {
                text-align: left;

                .filter-box {
                    span {
                        border-right: 1px solid #ededed;
                        cursor: pointer;
                        padding: 0 25px;

                        &:first-child {
                            padding-left: 0;
                        }

                        &:last-child {
                            border-right: 0;
                        }
                    }

                    text-align: center;
                    display: inline-block;
                    padding: 7px 15px;
                    border: 1px solid #ededed;
                    color: #999;
                    font-size: 13px;

                    .selected {
                        color: #409eff;
                    }
                }
            }

            .comment-list {
                outline: none;

                .comment-list-item {
                    padding-top: 30px;
                    font-size: 0;
                    border-bottom: 1px solid #e5e5e5;

                    .comment-list-item-avatar {
                        float: left;
                        width: 40px;

                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            vertical-align: top;
                        }
                    }

                    .comment-list-item-body {
                        float: right;
                        padding-bottom: 30px;
                        margin-left: 17px;
                        width: calc(-58px + 100%);

                        .user-info {
                            margin-bottom: 9px;

                            a {
                                color: #333;
                                font-size: 13px;
                                text-decoration: none;
                                margin-right: 10px;
                                float: left;
                            }

                            .user-info-rating {
                                font-size: 13px;

                                svg {
                                    margin-right: 5px;
                                    color: #ffb200;
                                }
                            }
                        }

                        .comment-content {
                            color: #666;
                            font-size: 14px;
                            position: relative;
                            line-height: 24px;
                            margin-bottom: 10px;
                        }

                        .comment-time {
                            color: #999;
                            font-size: 13px;
                        }
                    }
                }

                .page-sort {
                    text-align: center;
                    padding-top: 35px;
                }
            }
        }
    }
</style>
