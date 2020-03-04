<template>
    <div class="tabs-list" :class="{hide:video.hide}">
        <div class="tabs-item" v-for="chapter in courseChapter" :key="chapter.number">
            <div class="tabs-item-title">
                <span>{{chapter.number}}</span>
                <h3>{{chapter.name}}</h3>
            </div>
            <div class="tabs-item-list">
                <a class="tabs-study-item" v-for="video in chapter.video"
                   :key="video.id" @click="gotoVideo(video.id,video.wareUrl,video.videoUrl)">
                    <font-awesome-icon icon="play-circle"></font-awesome-icon>
                    <p class="study-item-title">
                        <span :title="video.name" class="text">{{video.name}}</span>
                        <span class="duration">({{video.duration}}分钟)</span>
                    </p>
                </a>
            </div>
        </div>
        <div class="tabs-item" v-if="video.form==='L'">
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
</template>

<script>
    import {Message} from 'element-ui'
    import {getLive, getVideo} from "@/api/course";

    export default {
        name: "InfoVideo",
        data() {
            return {
                courseChapter: [],
                live: {exist: false, name: null, state: false},
            }
        },
        props: {
            video: {type: Object, required: true},
            apply: {type: Boolean, required: true, default: false}
        },
        watch: {
            "video.hide"(val) {
                if (!val) {
                    this.getLive();
                    this.getVideo();
                }
            }
        },
        methods: {
            //获取直播课程信息
            async getLive() {
                if (this.video.form === 'L') {
                    let response = await getLive({id: this.$route.params.id});
                    if (response) {
                        if (response.live) {
                            this.live.name = response.title;
                            this.live.exist = true;
                            this.live.state = response.state;
                        }
                    }
                }
            },
            //获取视频信息
            async getVideo() {
                let response = await getVideo({id: this.$route.params.id});
                if (response) this.courseChapter = response.data;
            },
            //跳转到视频页
            gotoVideo(videoId, ware, videoUrl) {
                if (!this.apply) Message.warning('需要报名后才能学习该课程哦');
                else this.$router.push({
                    name: 'CourseVideo',
                    params: {
                        id: this.$route.params.id,
                        ware, videoId, videoUrl
                    }
                })
            },
            //跳转到直播界面
            gotoLive() {
                if (!this.apply) Message.warning('需要报名后才能学习该课程哦');
                else if (this.live.exist && this.live.state)
                    this.$router.push({
                        name: 'CourseVideo',
                        params: {
                            id: this.$route.params.id,
                            live: "true"
                        },
                    });
                else if (!this.live.exist) Message.info('直播不存在');
                else Message.info('老师还未开播');
            },
        }
    }
</script>
