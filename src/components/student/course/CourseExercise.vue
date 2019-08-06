<template>
    <div class="exercise-main">
        <div class="exercise-tabs">
            <div class="exercise-tabs-title-bar">
                <h2 class="exercise-tabs-title" v-if="hasExercise">- 课后测验 -</h2>
                <h2 class="exercise-tabs-title" v-else>本节课程无习题</h2>
            </div>
            <div class="exercise-content" v-if="hasExercise">
                <div class="exercise">
                    <div class="title">
                        <h3>{{exercise.videoName}}
                            <span class="state unfinished" v-if="!exerciseFinished">未完成</span>
                            <span class="state finished" v-else>已完成</span>
                            <span class="score" v-if="exerciseFinished">
                                成绩：<span class="finished">{{exerciseInfo.score}}分</span>
                            </span>
                        </h3>
                    </div>
                    <div class="question-list clearfix">
                        <div class="question" v-for="exercise in courseExercise"
                             :key="exercise.question.number">
                            <div class="question-title">
                                <span class="question-title-number">{{exercise.question.number}}</span>
                                <span class="question-title-content">{{exercise.question.title}}</span>
                            </div>
                            <el-radio-group v-model="radio[exercise.question.number - 1]">
                                <label v-for="radio in exercise.question['section']" :key="radio['choose']">
                                    <el-radio :label="radio['choose']" :disabled="exerciseFinished">
                                        {{`${radio['choose']}. ${radio['content']}`}}
                                    </el-radio>
                                    <br>
                                </label>
                            </el-radio-group>
                            <div class="answer" v-if="exerciseFinished">
                                <span>我的答案：{{exercise.result.choose}}</span>
                                <i class="true" v-if="exercise.result.score>0">
                                    <font-awesome-icon icon="check"></font-awesome-icon>
                                </i>
                                <i class="false" v-else>
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </i>
                                <span class="answer-score">得分：
                                    <span class="finished">{{exercise.result.score}}分</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="bottom clearfix" v-if="!exerciseFinished">
                        <a class="info-button setting-save" @click="submitExercise">提交</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {addExam, getExercise} from '../../../api/course'

    export default {
        name: "CourseExercise",
        data() {
            return {
                hasExercise: false,
                exerciseFinished: false,
                finishedInfo: null,
                courseExercise: [],
                radio: []
            }
        },
        props: {
            exercise: {type: Object, require: true}
        },
        watch: {
            'exercise.videoID'(val) {
                this.changeExercise(val);
            }
        },
        methods: {
            /**
             * 改变视频时，课后习题也改变
             * @param videoID
             */
            async changeExercise(videoID) {
                this.courseExercise = [];
                this.radio = [];
                if (videoID !== undefined) {
                    let response = await getExercise({
                        videoID,
                        courseID: this.$route.params.courseID
                    });
                    if (response) if (response.exam !== false) {
                        this.hasExercise = true;
                        this.exerciseInfo = response.finished;
                        this.exerciseFinished = this.exerciseInfo.state !== false;
                        for (let i = 0; i < response.exam.length; i++) {
                            this.exerciseFinished ? this.courseExercise.push({
                                question: response.exam[i],
                                result: this.exerciseInfo.result[i]
                            }) : this.courseExercise.push({
                                question: response.exam[i],
                            })
                        }
                        for (let i = 0; i < this.courseExercise.length; i++) this.radio.push();
                    } else this.hasExercise = false;
                }
            },
            /**
             * 提交习题触发
             */
            submitExercise() {
                MessageBox.confirm('习题提交后不可更改，确定提交？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let response = await addExam({
                        courseID: this.$route.params.courseID,
                        answer: this.radio,
                        exam: {type: 'exercise', id: this.exercise.videoID},
                    });
                    if (response) {
                        Message.success(response.msg);
                        this.changeExercise(this.exercise.videoID);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            }
        },
        created() {
            if (this.$route.params.videoID !== undefined) this.changeExercise(this.$route.params.videoID);
        }
    }
</script>
