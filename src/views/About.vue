<template>
    <div id="container">
        <div id="about">
            <div class="part-header">
                <h2>BAAS区块链学习平台</h2>
            </div>
            <div class="video-part" v-show="!loading">
                <video ref="intro-player" playsinline controls>
                    <source :src="url[0]" size="1080" type="video/mp4"/>
                    <source :src="url[1]" size="720" type="video/mp4"/>
                    <source :src="url[2]" size="360" type="video/mp4"/>
                </video>
            </div>
        </div>
    </div>
</template>

<script>
    import {getIntroduction} from "@/api/course";
    import Player from 'plyr'
    import 'plyr/dist/plyr.css'

    export default {
        name: "About",
        data() {
            return {
                loading: true,
                player: null,
                url: []
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'about');
        },
        created() {
            getIntroduction().then(res => {
                if (res) {
                    this.loading = false;
                    this.url = res.url;
                    this.$nextTick(() => {
                        this.player = new Player(this.$refs['intro-player'], {
                            speed: {selected: 1, options: [0.5, 1, 1.5, 2]},
                            quality: {default: 1080, options: [1080, 720, 360]},
                            i18n: {
                                speed: '播放速度',
                                normal: '正常',
                                quality: '清晰度'
                            },
                            controls: [
                                'play-large', // The large play button in the center
                                'play', // Play/pause playback
                                'progress', // The progress bar and scrubber for playback and buffering
                                'current-time', // The current time of playback
                                'duration', // The full duration of the media
                                'settings', // Settings menu
                                'volume',
                                'fullscreen', // Toggle fullscreen
                            ],
                        });
                    });
                }
            });
        },
        beforeDestroy() {
            if (this.player) {
                this.player.destroy();
            }
        }
    }
</script>

<style lang="less">
    #about {
        width: 1200px;
        margin: 0 auto 30px;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;

        .part-header {
            width: 100%;
            text-align: left;
        }

        .video-part {
            width: 1200px;
            height: calc(1200px * 9 / 16);

            video {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
