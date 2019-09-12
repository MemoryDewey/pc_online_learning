<template>
    <div class="study-main">
        <div class="study-information">
            <!--页面上部分 S-->
            <div class="study-banner">
                <div class="inner-center clearfix">
                    <!--面包屑导航 S-->
                    <course-bread :bread="bread"></course-bread>
                    <!--课程视频 S-->
                    <div class="video-course">
                        <!--视频部分 S-->
                        <div class="video-study">
                            <div class="video-part">
                                <div class="video-wrapper">
                                    <!--视频 S-->
                                    <video-player class="study course-video vjs-custom-skin" ref="videoPlayer"
                                                  :playsinline="true"
                                                  :options="playerOptions"
                                                  v-if="showVideo && !replay"></video-player>
                                    <iframe class="study course-video"
                                            :src="videoUrl"
                                            width="100%" scrolling="no" height="360" allowfullscreen
                                            v-if="showVideo && replay">
                                    </iframe>
                                    <!--视频 E-->
                                    <!--课件 S-->
                                    <iframe class="study course-ware" :src="wareUrl" width="100%"
                                            scrolling="no" allowfullscreen v-if="!showVideo">
                                    </iframe>
                                    <!--课件 E-->
                                </div>
                                <!--视频下方 S-->
                                <div class="video-bottom">
                                    <div class="course-info">
                                        <div class="course-title">
                                            {{courseName}}
                                        </div>
                                        <div class="course-hints">
                                            <div class="line-item">累计报名 {{applyCount}}人</div>
                                            <div class="line-item">好评率 {{courseRate}}%</div>
                                        </div>
                                    </div>
                                </div>
                                <!--视频下方 E-->
                            </div>
                            <!--右侧视频列表 S-->
                            <div class="video-list-wrapper">
                                <div class="tabs">
                                    <div class="tabs-title-bar">
                                        <el-row>
                                            <el-col :span="12">
                                                <h2 class="tabs-title" :class="{active:showVideo}"
                                                    @click="showVideo=true">
                                                    视频</h2>
                                            </el-col>
                                            <el-col :span="12">
                                                <h2 class="tabs-title" :class="{active:!showVideo}"
                                                    @click="showVideo=false">
                                                    课件</h2>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <div class="tabs-content">
                                    <ol class="video-course-list">
                                        <li class="video-chapter" v-for="chapter in courseChapter"
                                            :key="chapter.number">
                                            <h4 class="chapter-title">{{chapter.name}}</h4>
                                            <ol>
                                                <li v-for="video in chapter.video" class="video-item" :key="video.id"
                                                    :class="{selected:videoID===video.id && replay}"
                                                    :id="`video-item-${video.id}`"
                                                    @click="changeVideo(video.id,video.name,video.url,video.ware)">
                                                    <div class="video-item-prefix">
                                                        <span class="video-item-number">{{video.number}}</span>
                                                    </div>
                                                    <div class="video-item-title">
                                                        <div class="video-item-text">{{video.name}}</div>
                                                        <span class="video-item-prefix">{{video.duration}}分钟</span>
                                                    </div>
                                                </li>
                                            </ol>
                                        </li>
                                        <li class="video-chapter" v-if="live.state">
                                            <h4 class="chapter-title">直 播 课 程</h4>
                                            <ol>
                                                <li :class="{'video-item':true,selected:!replay}"
                                                    @click="changeLive">
                                                    <div class="video-item-prefix">
                                                        <span class="video-item-number">直播</span>
                                                    </div>
                                                    <div class="video-item-title">
                                                        <div class="video-item-text">{{live.title}}</div>
                                                        <span class="video-item-prefix">{{live.state?'直播中':'未开播'}}</span>
                                                    </div>
                                                </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <!--右侧视频列表 E-->
                        </div>
                        <!--视频部分 E-->
                    </div>
                    <!--课程视频 E-->
                    <!--面包屑导航 E-->
                </div>
            </div>
            <!--页面上部分 E-->
            <!--页面下部分 S-->
            <div class="info-main">
                <div class="inner-center clearfix">
                    <!--课后习题 S-->
                    <course-exercise :exercise="exercise"></course-exercise>
                    <!--课后习题 E-->
                </div>
            </div>
            <!--页面下部分 E-->
        </div>
    </div>
</template>

<script>
    import CourseBread from './CourseBread'
    import CourseExercise from './CourseExercise'
    import 'video.js/dist/video-js.css'
    import {videoPlayer} from 'vue-video-player'
    import 'videojs-contrib-hls'
    import {Message} from 'element-ui'
    import {getInfo, getVideo, getLive} from "@/api/course";

    export default {
        name: "Video",
        components: {
            "course-bread": CourseBread,
            "course-exercise": CourseExercise,
            videoPlayer
        },
        data() {
            return {
                courseRate: 0,
                applyCount: 0,
                courseName: null,
                courseChapter: null,
                videoID: 0,
                videoName: null,
                showVideo: true,
                videoUrl: null,
                wareUrl: null,
                //传给子组件
                exercise: {
                    videoID: 0,
                    videoName: null
                },
                bread: {
                    systemName: '', systemUrl: '',
                    typeName: '', typeUrl: '',
                    courseName: '', courseUrl: ''
                },
                replay: false,
                live: {
                    exist: false,
                    state: false,
                    title: null
                },
                playerOptions: {
                    controls: false
                }
            }
        },
        /*mounted(){
          window.addEventListener("scroll",this.handleScroll);
        },*/
        methods: {
            //改变视频时触发
            changeVideo(videoID, videoName, url, ware) {
                this.replay = true;
                this.videoID = videoID;
                this.videoName = videoName;
                this.videoUrl = url;
                this.wareUrl = `/course-ware?courseID=${this.$route.params.courseID}&wareID=${ware}`;
                this.exercise = {videoID, videoName}
            },
            //改变为直播时触发
            changeLive() {
                if (this.live.state)
                    this.replay = false;
                else Message.info('课程还未开播')
            },
            //获取课程信息
            async getInfo() {
                let response = await getInfo({courseID: this.$route.params.courseID});
                if (response) {
                    let course = response.course;
                    this.courseRate = course.info['favorableRate'] * 100;
                    this.applyCount = course.info.applyCount;
                    this.courseName = course.info.courseName;
                    this.bread.systemName = course.info.systemName;
                    this.bread.systemUrl = `/course/list?system=${course.info['systemID']}`;
                    this.bread.typeName = course.info.typeName;
                    this.bread.typeUrl = `/course/list?system=${course.info['systemID']}&type=${course.info['typeID']}`;
                    this.bread.courseName = course.info.courseName;
                    this.bread.courseUrl = `/course/${this.$route.params.courseID}/information`;
                    this.live.exist = course.info.courseForm === 'L';
                    document.title = course.info.courseName;
                }
            },
            //获取视频
            async getVideo() {
                let response = await getVideo({courseID: this.$route.params.courseID});
                if (response) {
                    this.courseChapter = response.data;
                    for (let chapter of this.courseChapter) {
                        let i = 1;
                        for (let v of chapter.video) {
                            v.number = i++;
                        }
                    }
                    if ((this.courseChapter.length === 0 || this.$route.params.live)
                        && this.$route.params.videoID === undefined) return;
                    else this.replay = true;
                    this.exercise = {videoID: this.videoID, videoName: this.videoName};
                    if (this.courseChapter[0].video.length > 0 && this.videoID === undefined) {
                        this.videoID = this.courseChapter[0].video[0].id;
                        this.videoName = this.courseChapter[0].video[0].name;
                        this.videoUrl = this.courseChapter[0].video[0].url;
                        let ware = this.courseChapter[0].video[0].ware;
                        this.wareUrl = `/course-ware?courseID=${this.$route.params.courseID}&wareID=${ware}`;
                        this.exercise = {videoID: this.videoID, videoName: this.videoName}
                    }
                }
            },
            //获取直播课程信息
            async getLive() {
                if (this.live.exist) {
                    let response = await getLive({courseID: this.$route.params.courseID});
                    if (response.status === 1) {
                        if (response.live) {
                            this.live.title = response.title;
                            if (response.state) {
                                this.live.state = true;
                                this.playerOptions = {
                                    autoplay: true, //如果true,浏览器准备好时开始回放。
                                    muted: false, // 默认情况下将会消除任何音频。
                                    loop: false, // 导致视频一结束就重新开始。
                                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                                    language: 'zh-CN',
                                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                                    sources: [{
                                        type: "application/x-mpegURL",
                                        src: response.streamName //你的m3u8地址（必填）
                                    }],
                                    //poster: "poster.jpg", //你的封面地址
                                    width: document.documentElement.clientWidth,
                                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                                };
                            }
                        }
                    }
                }
            }
        },
        async created() {
            this.videoID = this.$route.params.videoID;
            let ware = this.$route.params.ware;
            this.videoUrl = this.$route.params.videoUrl;
            this.wareUrl = `/course-ware?courseID=${this.$route.params.courseID}&wareID=${ware}`;
            if (this.$route.params.live) this.live.state = true;
            try {
                //获取课程相关信息
                await this.getInfo();
                //获取课程视频相关信息
                await this.getVideo();
                //查询直播相关信息
                await this.getLive();
            } catch (e) {
                console.log(e);
            }
            document.getElementById(`video-item-${this.videoID}`).scrollIntoView();
            window.scrollTo(0, 0);
        }
    }
</script>

<style lang="less">
    .study-banner {
        .video-course {
            margin-top: 30px;
            width: 100%;

            ol {
                list-style: none outside none;
            }

            ol, li {
                padding: 0;
                margin: 0;
            }

            .video-study {
                width: 100%;
                font-size: 0;

                .video-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    width: 870px;
                    height: 490px;
                    position: relative;
                    background-color: #000;

                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background-color: rgba(0, 0, 0, .6);
                    }
                }

                .video-part {
                    float: left;
                }

                .study {
                    display: inline;
                    z-index: 1;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .course-ware {
                    border-top: 1px solid #f5f5f5;
                    border-right: 0;
                    border-bottom: 0;
                    border-left: 1px solid #f5f5f5;
                }

                .course-video {
                    border: 0;
                }

                .video-list-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    height: 582px;
                    width: 330px;
                    background-color: #f5f5f5;
                    font-size: 12px;
                    float: right;
                    position: relative;

                    &:before {
                        content: "";
                        z-index: 1;
                        width: 310px;
                        height: 16px;
                        background-color: #f5f5f5;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    &:hover {
                        .video-course-list {
                            overflow-y: auto;
                        }
                    }

                    .tabs {
                        padding: 0 20px 5px;
                        background: transparent;
                        box-sizing: border-box;
                        border-bottom: 1px solid #ddd;

                        .tabs-title-bar {
                            height: 35px;
                            margin-bottom: 20px;

                            .tabs-title {
                                margin-top: 5px;
                                line-height: 40px;
                                font-size: 16px;
                                cursor: pointer;
                                font-weight: 400;
                            }

                            .active {
                                color: #409eff;
                                border-top-color: #409eff;
                            }
                        }
                    }

                    .tabs-content {
                        display: inline-block;
                        vertical-align: top;
                        height: 520px;
                        width: 330px;
                        position: relative;
                    }
                }

                .video-course-list {
                    box-sizing: border-box;
                    height: 100%;
                    padding: 0 16px;
                    font-size: 14px;
                    overflow-x: hidden;
                    overflow-y: hidden;
                    margin: 0;

                    .video-chapter {
                        margin-top: 16px;
                        margin-bottom: 16px;
                        position: relative;
                        border-bottom: 1px solid #969696;
                        padding: 0;
                    }

                    .chapter-title {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: left;
                        font-size: 100%;
                        font-weight: 400;
                        margin: 0;
                    }

                    .video-item {
                        margin-top: 20px;
                        display: block;
                        cursor: pointer;

                        &:last-child {
                            margin-bottom: 16px;
                        }
                    }

                    .selected, .video-item:hover {
                        color: #409eff;

                        .video-item-number {
                            background-color: #409eff;
                        }
                    }

                    .video-item-prefix {
                        float: left;
                    }

                    .video-item-number {
                        display: block;
                        box-sizing: border-box;
                        width: 30px;
                        height: 16px;
                        line-height: 16px;
                        background-color: #777;
                        border-radius: 2px;
                        text-align: center;
                        color: white;
                        font-size: 12px;
                        position: relative;
                        top: 1px;
                        padding-left: 1px;
                    }

                    .video-item-title {
                        margin-left: 35px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: left;
                    }

                    .video-item-text {
                        font-size: 14px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 400;
                    }
                }

                .video-bottom {
                    width: 870px;
                    min-height: 92px;
                    padding: 14px 16px;
                    box-sizing: border-box;
                    background-color: #232323;
                    text-align: left;

                    .course-info {
                        max-width: 850px;
                    }

                    .course-title {
                        font-size: 22px;
                        line-height: 32px;
                        color: white;
                    }

                    .course-hints {
                        margin-top: 4px;
                        font-size: 12px;
                        line-height: 16px;
                    }

                    .line-item {
                        display: inline-block;
                        margin-right: 32px;
                        color: rgba(255, 255, 255, 0.5);
                        vertical-align: middle;
                    }
                }

                .vjs-big-play-button {
                    top: 45% !important;
                    left: 45% !important;
                }

            }
        }
    }
</style>
