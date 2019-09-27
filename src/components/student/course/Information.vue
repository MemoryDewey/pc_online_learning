<template>
    <div class="study-main">
        <div class="study-information">
            <div class="study-banner">
                <div class="inner-center clearfix">
                    <!--面包屑导航 S-->
                    <course-bread :bread="bread"></course-bread>
                    <!--面包屑导航 E-->
                    <!--课程详情 S-->
                    <div class="study-img-text">
                        <div class="study-img-left">
                            <el-image v-if="course.info['courseImage']" :src="course.info['courseImage']">
                                <template slot="error">
                                    <img src="../../../assets/image/load-error.jpg" alt>
                                </template>
                            </el-image>
                        </div>
                        <div class="study-text-right">
                            <h1 class="text-title">{{bread.courseName}}</h1>
                            <div class="enroll-info">
                                <div class="enroll-study-info">
                                    <div class="teacher-name">授课教师：{{course.details['teacherName']}}</div>
                                    <div class="workload">课程安排：{{course.details['courseArrange']}}</div>
                                    <div class="study-time clearfix">
                                        <div style="float: left"><i class="far fa-calendar-alt"></i>
                                            开课时间:{{course.details['startTime']}}
                                        </div>
                                        <div style="float: right"><i class="far fa-calendar-alt"></i>
                                            结课时间:{{course.details['finishTime']}}
                                        </div>
                                    </div>
                                </div>
                                <div class="enroll">
                                    <div class="study-apply">已有{{applyCount}}人报名
                                        <!--<el-tooltip effect="light" placement="bottom" content="复制分享链接">
                                            <span v-if="course.info.price!==0" @click="shareCourse"><font-awesome-icon
                                                    icon="share-alt"></font-awesome-icon>分享</span>
                                        </el-tooltip>-->
                                    </div>
                                    <div class="enroll-apply-btn" v-if="!hadApply">
                                        <el-button v-if="bstApplyBtn" type="info" disabled>
                                            账单确认中...
                                        </el-button>
                                        <div class="info-button enroll-button" v-else-if="course.info['price']===0"
                                             @click="applyFree">
                                            免费报名
                                        </div>
                                        <div class="info-button enroll-button" v-else @click="buyCourseDialogOpen">
                                            立即购买
                                        </div>
                                    </div>
                                    <div class="enroll-apply-btn" v-else>
                                        <router-link tag="div" class="info-button enroll-button"
                                                     :to="`/course/${$route.params.courseID}`">
                                            已报名，进入学习
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--课程详情 E-->
                </div>
            </div>
            <div class="info-main">
                <div class="inner-center clearfix">
                    <div class="main">
                        <div class="tabs">
                            <div class="tabs-title-bar">
                                <h2 class="tabs-title" :class="{active:tabsTitle.courseDetail}"
                                    @click="tabsChange('courseDetail')">课程详情</h2>
                                <h2 class="tabs-title" :class="{active:tabsTitle.chapterList}"
                                    @click="tabsChange('chapterList')">课程目录</h2>
                                <h2 class="tabs-title" :class="{active:tabsTitle.fileList}"
                                    @click="tabsChange('fileList')">课程资料</h2>
                                <h2 class="tabs-title" :class="{active:tabsTitle.comment}"
                                    @click="tabsChange('comment')">课程评价({{commentCount}})</h2>
                            </div>
                            <div class="tabs-content">
                                <!--课程详情 S-->
                                <div class="tabs-details" :class="{hide:!tabsTitle.courseDetail}">
                                    <div class="details-title">
                                        <font-awesome-icon icon="th-large"></font-awesome-icon>
                                        <span>课程概述</span>
                                    </div>
                                    <div class="details-content">
                                        <div class="details-text">
                                            <p>
                                                <span>{{course.details['courseSummary']}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="details-title">
                                        <font-awesome-icon icon="book"></font-awesome-icon>
                                        <span>课程目标</span>
                                    </div>
                                    <div class="details-content">
                                        <div class="details-text">
                                            <p>
                                                <span>{{course.details['courseTarget']}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!--课程详情 E-->
                                <!--课程视频 S-->
                                <info-video :video="video"></info-video>
                                <!--课程视频 E-->
                                <!--课程资料 S-->
                                <info-file :file="file"></info-file>
                                <!--课程资料 E-->
                                <!--课程评论 S-->
                                <info-comment :comment="comment" @getCommentCount="setCommentCount"></info-comment>
                                <!--课程评论 E-->
                            </div>
                        </div>
                    </div>
                    <div class="main-aside">
                        <div class="aside-blocks">
                            <div class="exam-schedule">
                                <div class="exam-title">课程分数安排</div>
                                <div style="margin-top: 20px;color: #67c23a;">
                                    <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
                                    考试时间：<a v-if="examTime.startTime!==null">
                                    {{examTime.startTime}} - {{examTime.endTime}}</a>
                                    <a v-else>暂无考试</a>
                                </div>
                                <div class="exam-text">
                                <span><font-awesome-icon icon="file-alt"></font-awesome-icon>
                                    考试分数：采取百分制，30%来自平时测验，70%来自期末检测</span>
                                </div>
                                <div class="exam-text">
                                <span><font-awesome-icon icon="award"></font-awesome-icon>
                                    证书要求：考试分数需要达到70分以上，并且学习时长需达到课程总时长的70%</span>
                                </div>
                                <div class="exam-text">
                                    <div class="info-button exam-button" @click="gotoExam">
                                        进入考试
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="buyDialogVisible"
                   custom-class="buy-dialog" title="请选择购买课程方式"
                   @close="buyDialogVisible = false">
            <div class="balance">
                <el-radio v-model="payType" :label="0" border>余额支付</el-radio>
                <div class="info">
                    <div class="have">
                        余额：￥{{walletInfo.balance}}
                        <router-link to="/wallet" tag="span" class="recharge">充值</router-link>
                        <span class="refresh" @click="getUserBalance">刷新</span>
                    </div>
                    <div class="need">价格：￥{{course.info.price}}</div>
                </div>
            </div>
            <div class="bst">
                <el-radio v-model="payType" :label="1" border>BST支付</el-radio>
                <div class="info">
                    <div class="need" v-loading="!getBstSuccess">价格：{{bstPrice}} BST</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="buyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="buyCourse">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import CourseBread from './CourseBread'
    import InfoComment from './InfoComment'
    import InfoVideo from './InfoVideo'
    import InfoFile from './InfoFile'
    import {Message} from 'element-ui'
    import {mapState} from 'vuex'
    import {
        applyChargeByBst, applyCourseByCash, applyFree,
        checkBstConfirmation, checkBstStatue, examCheck,
        getClass, getExamTime, getInfo
    } from "@/api/course";
    import {getWalletInfo} from '@/api/wallet'
    // import wsClient from 'socket.io-client'

    export default {
        name: "Information",
        components: {InfoVideo, CourseBread, InfoComment, InfoFile},
        data() {
            return {
                //传给子组件
                bread: {systemName: '', systemUrl: '', typeName: '', typeUrl: '', courseName: '', courseUrl: ''},
                course: {details: {}, info: {}, images: null},
                tabsTitle: {courseDetail: true, chapterList: false, fileList: false, comment: false},
                comment: {courseRate: 0, courseName: null, hide: true},
                file: {hide: true, apply: false},
                video: {hide: true, form: null},
                courseRate: 8,
                commentCount: 0,
                applyCount: 0,
                hadApply: false,
                examTime: {
                    startTime: null,
                    finishTime: null
                },
                buyDialogVisible: false,
                payType: 0,
                bstPrice: 0,
                getBstSuccess: false,
                walletInfo: {balance: 0.00},
                bstApplyBtn: false
            }
        },
        computed: {
            ...mapState({
                contractInstance: state => state.contractInstance,
                coinbase: state => state.web3.coinbase
            })
        },
        methods: {
            //设置bread
            setBread(systemName, systemID, typeName, typeID, courseName) {
                this.bread.systemName = systemName;
                this.bread.systemUrl = `/course/list?system=${systemID}`;
                this.bread.typeName = typeName;
                this.bread.typeUrl = `/course/list?system=${systemID}&type=${typeID}`;
                this.bread.courseName = courseName;
            },
            //报名课程
            applyFree() {
                if (this.$store.state.loginState) {
                    applyFree({courseID: this.$route.params.courseID}).then(response => {
                        if (response) {
                            this.hadApply = true;
                            this.applyCount = response.applyCount;
                            Message.success(response.msg);
                        }
                    });
                } else Message.warning('请登录后再进行该操作')
            },
            //初始化tabs
            tabsInit() {
                this.tabsTitle = {
                    courseDetail: false,
                    chapterList: false,
                    fileList: false,
                    comment: false
                }
            },
            //tabs改变
            tabsChange(val) {
                this.tabsInit();
                this.tabsTitle[val] = true;
                this.video.hide = val !== 'chapterList';
                this.file.hide = val !== 'fileList';
                this.comment.hide = val !== 'comment';
            },
            //设置课程评价条数
            setCommentCount(val) {
                this.commentCount = val;
            },
            //跳转到课程页
            async gotoExam() {
                let response = await examCheck({courseID: this.$route.params.courseID});
                if (response) {
                    let url = this.$router.resolve({path: `/course/${this.$route.params.courseID}/exam`});
                    window.open(url.href, "_blank")
                }
            },
            //获取课程基本信息
            async getInfo() {
                let response = await getInfo({courseID: this.$route.params.courseID});
                if (response) {
                    this.$set(this.course, 'info', response.course.info);
                    this.$set(this.course, 'details', response.course.details);
                    let course = this.course;
                    this.courseRate = course.info['favorableRate'] * 10;
                    this.applyCount = course.info.applyCount;
                    this.$set(this.comment, 'courseRate', this.courseRate);
                    this.$set(this.comment, 'courseName', course.info.courseName);
                    this.setBread(course.info.systemName, course.info['systemID'], course.info.typeName,
                        course.info['typeID'], course.info.courseName
                    );
                    this.video.form = course.info['courseForm'];
                    document.title = course.info.courseName;
                }
            },
            //获取其他信息
            async getClass() {
                let response = await getClass({courseID: this.$route.params.courseID});
                this.hadApply = response.status === 1;
                this.file.apply = this.hadApply;
                response = await getExamTime({courseID: this.$route.params.courseID});
                this.examTime = response.time;
            },
            //购买课程Dialog
            async buyCourseDialogOpen() {
                if (this.$store.state.loginState) {
                    this.buyDialogVisible = true;
                    await this.getUserBalance();
                    await this.getBstPrice();
                } else Message.warning('请登录后再进行该操作');
            },
            //获取账户余额
            async getUserBalance() {
                let res = await getWalletInfo();
                this.walletInfo = res.wallet;
            },
            //获取BST换算信息
            async getBstPrice() {
                let res = await this.$axios.get('https://api1.zg.com/tickers');
                let data = res.data.ticker;
                let bstInfo = data.find((x) => {
                    return x.symbol = "BST_USDT";
                });
                this.getBstSuccess = true;
                this.bstPrice = ((1 / bstInfo.sell) / 7 * this.course.info.price).toFixed(2)
            },
            //购买课程
            async buyCourse() {
                if (this.$store.state.loginState) {
                    if (this.payType === 1) {
                        if (this.getBstSuccess) {
                            this.buyDialogVisible = false;
                            await this.byBst();
                        } else Message.warning('请在获取到价格后再进行操作')
                    }
                    if (this.payType === 0) {
                        this.buyDialogVisible = false;
                        await this.byBalance();
                    }
                } else Message.warning('请登录后再进行该操作')
            },
            //通过BST购买课程
            async byBst() {
                if (!window.web3 && !window.ethereum)
                    Message.warning('您的浏览器不支持BST方式购买，请安装MetaMask插件');
                else try {
                    if (this.$store.state.web3.coinbase) {
                        /*const socket = wsClient.connect(`${location.origin}`);
                            socket.emit('buyCourse', "");
                            socket.on('message', data => {
                                if (data.status === 1) {
                                    Message.success(data.msg);
                                    this.hadApply = true;
                                    this.applyCount = data.result.applyCount;
                                } else Message.error(data.msg);
                                socket.close();
                            });*/
                        let value = await this.$store.state.web3.web3Instance().utils.toWei(this.bstPrice.toString(), 'ether');
                        let res = await checkBstStatue({courseID: this.$route.params.courseID});
                        if (res) this.$store.state.contractInstance().methods.transfer(res.address, value)
                            .send({from: this.$store.state.web3.coinbase, data: ""})
                            .on('transactionHash', async hash => {
                                Message.success('已发起交易，请等待交易结果');
                                let data = {
                                    courseID: this.$route.params.courseID,
                                    hash, amount: this.bstPrice
                                };
                                await applyChargeByBst(data);
                            })
                            .on('error', error => {
                                Message.error('支付失败！')
                            })
                    } else Message.error('MetaMask未登录！')
                } catch (e) {
                    console.log(e);
                }
            },
            //通过余额购买课程
            async byBalance() {
                if (this.walletInfo.balance < this.course.info.price)
                    Message.error('余额不足，请充值');
                else {
                    let res = await applyCourseByCash({courseID: this.$route.params.courseID});
                    if (res) {
                        Message.success(res.msg);
                        this.hadApply = true;
                        this.applyCount = res.applyCount;
                    }
                }
            },
            //分享课程
            /*async shareCourse() {
                if (!this.hadApply) Message.warning('需要购买此课程才有权限分享该课程');
                else {
                    let res = await getShareUrl();
                    if (res) {
                        let url = `${location.origin}${res.url}`;
                        this.$copyText(url).then(() => {
                            Message.success('已将链接复制到粘贴板');
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }
            }*/
        },
        async mounted() {
            if(this.$store.state.loginState){
                let res = await checkBstConfirmation({courseID: this.$route.params.courseID});
                this.bstApplyBtn = parseInt(res.toString()) === 3;
            }
        },
        async created() {
            await this.getInfo();
            await this.getClass();
        },
        async beforeCreate() {
            if (!this.$store.state.web3.web3Instance) {
                await this.$store.dispatch('registerWeb3');
                await this.$store.dispatch('getContractInstance');
            }
        },
    }
</script>
