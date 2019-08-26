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
                            <img v-lazy="`${course.info['courseImage']}`" alt="">
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
                                    <div class="study-apply">已有{{applyCount}}人报名</div>
                                    <div class="enroll-apply-btn" v-if="!hadApply">
                                        <div class="info-button enroll-button" v-if="course.info['price']===0"
                                             @click="applyFree">
                                            免费报名
                                        </div>
                                        <div class="info-button enroll-button" v-else @click="buyCourse">
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
                                <h2 :class="{'tabs-title':true,active:tabsTitle.courseDetail}"
                                    @click="tabsChange('courseDetail')">课程详情</h2>
                                <h2 :class="{'tabs-title':true,active:tabsTitle.chapterList}"
                                    @click="tabsChange('chapterList')">课程目录</h2>
                                <h2 :class="{'tabs-title':true,active:tabsTitle.fileList}"
                                    @click="tabsChange('fileList')">课程资料</h2>
                                <h2 :class="{'tabs-title':true,active:tabsTitle.comment}"
                                    @click="tabsChange('comment')">课程评价({{commentCount}})</h2>
                            </div>
                            <div class="tabs-content">
                                <!--课程详情 S-->
                                <div :class="{'tabs-details':true,hide:!tabsTitle.courseDetail}">
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
                                <!--课程目录 S-->
                                <div :class="{'tabs-list':true,hide:!tabsTitle.chapterList}">
                                    <div class="tabs-item" v-for="chapter in courseChapter" :key="chapter.number">
                                        <div class="tabs-item-title">
                                            <span>{{chapter.number}}</span>
                                            <h3>{{chapter.name}}</h3>
                                        </div>
                                        <div class="tabs-item-list">
                                            <a class="tabs-study-item" v-for="video in chapter.video"
                                               :key="video.id" @click="gotoVideo(video.id,video.ware,video.url)">
                                                <font-awesome-icon icon="play-circle"></font-awesome-icon>
                                                <p class="study-item-title">
                                                    <span :title="video.name" class="text">{{video.name}}</span>
                                                    <span class="duration">({{video.duration}}分钟)</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="tabs-item" v-if="courseForm==='L'">
                                        <div class="tabs-item-title">
                                            <span>##</span>
                                            <h3>直播</h3>
                                        </div>
                                        <div class="tabs-item-list">
                                            <a class="tabs-study-item" @click="gotoLive">
                                                <font-awesome-icon icon="video"></font-awesome-icon>
                                                <p class="study-item-title" v-if="live.exist">
                                                    <span title="直播课程" class="text">{{live.name}}</span>
                                                    <span class="duration">{{live.state?'(直播中)':'(未开始)'}}</span>
                                                </p>
                                                <p class="study-item-title" v-else>
                                                    <span title="无直播">无直播</span>
                                                    <span class="duration">(该课程无直播课)</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!--课程目录 E-->
                                <!--课程资料 S-->
                                <div :class="{'tabs-list':true,hide:!tabsTitle.fileList}">
                                    <div class="tabs-item" v-for="chapter in courseFile" :key="chapter.number">
                                        <div class="tabs-item-title">
                                            <span>{{chapter.number}}</span>
                                            <h3>{{chapter.name}}</h3>
                                        </div>
                                        <div class="tabs-item-list">
                                            <a class="tabs-study-item" v-for="file in chapter.file"
                                               :key="file.id" @click="downloadFile(file.str,file.name,file.type)">
                                                <font-awesome-icon far
                                                                   :icon="setFileIcon(file.type)"></font-awesome-icon>
                                                <p class="study-item-title">
                                                    <span :title="file.name" class="text">{{file.name}}</span>
                                                    <span class="duration">({{file.type}}, {{setFileSize(file.size)}})</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
                <div class="info" v-if="payType === 0">
                    <div class="have">当前余额：￥5064.3</div>
                    <div class="need">需要价格：￥{{course.info.price}}</div>
                </div>
            </div>
            <div>
                <el-radio v-model="payType" :label="1" border>BST支付</el-radio>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import CourseBread from './CourseBread'
    import InfoComment from './InfoComment'
    import {Message} from 'element-ui'
    import {saveAs} from 'file-saver'
    import wsClient from 'socket.io-client'
    import {
        getInfo,
        applyCharge,
        applyFree,
        examCheck,
        getLive,
        getVideo,
        getFile,
        getClass,
        getExamTime
    } from "../../../api/course";

    export default {
        name: "Information",
        data() {
            return {
                //传给子组件
                bread: {
                    systemName: '', systemUrl: '',
                    typeName: '', typeUrl: '',
                    courseName: '', courseUrl: ''
                },
                course: {
                    details: '', info: '',
                },
                tabsTitle: {
                    courseDetail: true,
                    chapterList: false,
                    fileList: false,
                    comment: false
                },
                //传给子组件
                comment: {
                    courseRate: 8,
                    courseName: null,
                    hide: false
                },
                courseChapter: null,
                courseFile: null,
                downloadUrl: `${process.env.VUE_APP_BASE_API}/course/information/file-download?courseID=${this.$route.params.courseID}&file=`,
                courseRate: 8,
                commentCount: 0,
                applyCount: 0,
                hadApply: false,
                examTime: {
                    startTime: null,
                    finishTime: null
                },
                fileIcon: {},
                courseForm: null,
                live: {
                    exist: false,
                    name: null,
                    state: false,
                },
                buyDialogVisible: false,
                payType: 0
            }
        },
        components: {
            'course-bread': CourseBread,
            'info-comment': InfoComment
        },
        computed: {
            //设置文件图标
            setFileIcon() {
                return function getIcon(type) {
                    let icon = null;
                    switch (type) {
                        case 'txt':
                            icon = 'file-alt';
                            break;
                        case 'png':
                            icon = 'file-image';
                            break;
                        case 'jpg':
                            icon = 'file-image';
                            break;
                        case 'zip':
                            icon = 'file-archive';
                            break;
                        case 'pdf':
                            icon = 'file-pdf';
                            break;
                        case 'docx':
                            icon = 'file-word';
                            break;
                        case 'doc':
                            icon = 'file-word';
                            break;
                        case 'ppt':
                            icon = 'file-powerpoint';
                            break;
                        case 'pptx':
                            icon = 'file-powerpoint';
                            break;
                        case 'xls':
                            icon = 'file-excel';
                            break;
                        case 'xlsx':
                            icon = 'file-excel';
                            break;
                    }
                    return icon;
                }
            }
        },
        methods: {
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
                this.comment.hide = val === 'comment';
            },
            //设置课程评价条数
            setCommentCount(val) {
                this.commentCount = val;
            },
            //跳转到视频页
            gotoVideo(videoID, ware, videoUrl) {
                this.$router.push({
                    name: 'CourseVideo',
                    params: {
                        courseID: this.$route.params.courseID,
                        ware, videoID, videoUrl
                    }
                })
            },
            //跳转到直播界面
            gotoLive() {
                if (this.live.exist && this.live.state)
                    this.$router.push({
                        name: 'CourseVideo',
                        params: {
                            courseID: this.$route.params.courseID,
                            live: "true"
                        },
                    });
                else if (!this.live.exist) Message.info('直播不存在');
                else Message.info('老师还未开播');
            },
            //跳转到课程页
            async gotoExam() {
                let response = await examCheck({courseID: this.$route.params.courseID});
                if (response) {
                    let url = this.$router.resolve({path: `/course/${this.$route.params.courseID}/exam`});
                    window.open(url.href, "_blank")
                }
            },
            //下载课程资料
            downloadFile(fileStr, fileName, fileType) {
                if (this.hadApply && this.$store.state.loginState)
                    saveAs(`${this.downloadUrl}${fileStr}.${fileType}&fileName=${fileName}.${fileType}`);
                else Message.info('需要报名后才能下载课程资料哦');
            },
            //获取课程基本信息
            async getInfo() {
                let response = await getInfo({courseID: this.$route.params.courseID});
                if (response) {
                    this.course = response.course;
                    let course = this.course;
                    this.courseRate = course.info['favorableRate'] * 10;
                    this.applyCount = course.info.applyCount;
                    this.comment.courseRate = this.courseRate;
                    this.comment.courseName = course.info.courseName;
                    this.bread.systemName = course.info.systemName;
                    this.bread.systemUrl = `/course/list?system=${course.info['systemID']}`;
                    this.bread.typeName = course.info.typeName;
                    this.bread.typeUrl = `/course/list?system=${course.info['systemID']}&type=${course.info['typeID']}`;
                    this.bread.courseName = course.info.courseName;
                    this.courseForm = course.info.courseForm;
                    document.title = course.info.courseName;
                }
            },
            //获取直播课程信息
            async getLive() {
                if (this.courseForm === 'L') {
                    let response = await getLive({courseID: this.$route.params.courseID});
                    if (response) {
                        if (response.live) {
                            this.live.name = response.title;
                            this.live.exist = true;
                            this.live.state = response.state;
                        }
                    }
                }
            },
            //获取视频与文件信息
            async getVideoFile() {
                let response = await getVideo({courseID: this.$route.params.courseID});
                if (response) this.courseChapter = response.data;
                response = await getFile({courseID: this.$route.params.courseID});
                if (response) this.courseFile = response.data;
            },
            //处理文件大小显示
            setFileSize(size) {
                return size > 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(2)}MB` :
                    `${(size / 1024).toFixed(2)}KB`
            },
            //获取其他信息
            async getClass() {
                let response = await getClass({courseID: this.$route.params.courseID});
                this.hadApply = response.status === 1;
                response = await getExamTime({courseID: this.$route.params.courseID});
                this.examTime = response.time;
            },
            //购买课程
            async buyCourse() {
                this.buyDialogVisible = true;
            },
            //通过BST购买课程
            async byBst() {
                if (this.$store.state.loginState) {
                    let sendDict = {};
                    console.log(this.$store.state.web3.coinbase);
                    sendDict["from"] = this.$store.state.web3.coinbase;
                    sendDict["gas"] = 100000;
                    try {
                        let res = await applyCharge({courseID: this.$route.params.courseID});
                        if (res) {
                            const socket = wsClient.connect(`${location.origin}`);
                            socket.emit('buyCourse', "");
                            socket.on('message', data => {
                                if (data.status === 1) {
                                    Message.success(data.msg);
                                    this.hadApply = true;
                                    this.applyCount = data.result.applyCount;
                                } else Message.error(data.msg);
                                socket.close();
                            });
                            sendDict["value"] = await this.$store.state.web3.web3Instance()
                                .utils.toWei(res.data.payAmount.toString(), 'finney');
                            let TID = "A" + res.data.paymentID;
                            TID = this.$store.state.web3.web3Instance().utils.fromAscii(TID);
                            this.$store.state.contractInstance().methods.submitPayment(TID)
                                .send(sendDict)
                                .on('receipt', receipt => {
                                    Message.success('支付成功')
                                })
                                .on('error', error => {
                                    Message.error('支付失败！')
                                })
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else Message.warning('请登录后再进行该操作')
            },
            //通过余额购买课程
            async byBalance() {

            }
        },
        async created() {
            await this.getInfo();
            this.getLive();
            this.getVideoFile();
            this.getClass();
        }
    }
</script>
