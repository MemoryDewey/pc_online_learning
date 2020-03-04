<template>
    <div class="study-main">
        <div class="study-information">
            <div class="info-main">
                <div class="inner-center clearfix">
                    <div class="exercise-main">
                        <div class="exercise-tabs">
                            <div class="exercise-tabs-title-bar">
                                <h2 class="exercise-tabs-title" v-if="hasExam">- 期末测验 -</h2>
                                <h2 class="exercise-tabs-title" v-else>期末测验未开始</h2>
                            </div>
                            <div class="exercise-content" v-if="hasExam">
                                <div class="exercise">
                                    <div class="title">
                                        <h3>
                                            <span class="state unfinished" v-if="!examFinished">未完成</span>
                                            <span class="state finished" v-else>已完成</span>
                                            <span class="score" v-if="examFinished">成绩：<span class="finished">{{examInfo.score}}分</span></span>
                                        </h3>
                                    </div>
                                    <div class="question-list clearfix">
                                        <div class="question" v-for="exam in courseExam"
                                             :key="exam.question.number">
                                            <div class="question-title">
                                                <span class="question-title-number">{{exam.question.number}}</span>
                                                <span class="question-title-content">{{exam.question.title}}</span>
                                            </div>
                                            <el-radio-group v-model="radio[exam.question.number - 1]">
                                                <label v-for="radio in exam.question['section']" :key="radio['choose']">
                                                    <el-radio :label="radio['choose']" :disabled="examFinished">
                                                        {{`${radio['choose']}. ${radio['content']}`}}
                                                    </el-radio>
                                                    <br>
                                                </label>
                                            </el-radio-group>
                                            <div class="answer" v-if="examFinished">
                                                <span>我的答案：{{exam.result.choose}}</span>
                                                <i class="true" v-if="exam.result.score>0">
                                                    <font-awesome-icon icon="check"></font-awesome-icon>
                                                </i>
                                                <i class="false" v-else>
                                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                                </i>
                                                <span class="answer-score">得分：
                                    <span class="finished">{{exam.result.score}}分</span>
                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottom clearfix" v-if="!examFinished">
                                        <label>
                                            <button class="info-button setting-save" @click="submitExam">提交</button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message, MessageBox} from "element-ui"
    import {getExam, addExam, checkApply} from '@/api/course'

    export default {
        name: "CourseExam",
        data() {
            return {
                hasExam: false,
                examInfo: null,
                examFinished: false,
                finishedInfo: null,
                courseExam: [],
                radio: []
            }
        },
        methods: {
            //获取试卷
            async getExam(id) {
                this.courseExam = [];
                this.radio = [];
                let response = await getExam({id});
                if (response) {
                    if (response.exam !== false) {
                        this.hasExam = true;
                        this.examInfo = response.finished;
                        this.examFinished = this.examInfo.state !== false;
                        for (let i = 0; i < response.exam.length; i++) {
                            this.examFinished ? this.courseExam.push({
                                question: response.exam[i],
                                result: this.examInfo.result[i]
                            }) : this.courseExam.push({
                                question: response.exam[i],
                            })
                        }
                        this.radio.fill(0, 0, this.courseExam.length);
                    } else this.hasExam = false;
                }
            },
            //提交试卷
            submitExam() {
                MessageBox.confirm('试卷提交后不可更改，确定提交？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    console.log(this.radio);
                    let response = await addExam({
                        id: this.$route.params.id,
                        answer: this.radio,
                        exam: {type: 'exam', id: this.$route.params.id},
                    });
                    if (response) {
                        Message.success(response.msg);
                        this.getExam(this.$route.params.id);
                    }
                }).catch(() => {
                    Message.info("已取消操作");
                })
            }
        },
        created() {
            this.getExam(this.$route.params.id);
        },
        beforeRouteEnter(to, from, next) {
            next((vm => {
                checkApply({id: vm.$route.params.id}).then(response => {
                    if (!response) vm.$router.push('/');
                })
            }));
        }
    }
</script>
