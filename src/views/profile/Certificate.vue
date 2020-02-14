<template>
    <div class="flex-list">
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell first">证书编号</div>
                <div class="flex-cell">操作</div>
            </div>
        </div>
        <div class="flex-list-no-data" v-if="certificates.length===0">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"/>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无证书信息</div>
                </div>
            </div>
        </div>
        <div class="flex-list-item" v-else v-for="(certificate,index) in certificates"
             :key="certificate['id']">
            <div class="flex-row content">
                <div class="flex-cell first cover">
                    <el-image :src="certificate['CourseInformation']['courseImage']">
                        <template slot="error">
                            <img src="../../assets/image/load-error.jpg" alt>
                        </template>
                    </el-image>
                    <div class="title">{{certificate['CourseInformation']['courseName']}}</div>
                </div>
                <div class="flex-cell first" style="color: #00a1d6">
                    {{certificate['id']}}
                </div>
                <div class="flex-cell">
                    <a class="btn-operate" @click="openDialog(index)">查看证书</a>
                </div>
            </div>
        </div>
        <div class="sort-page" v-if="certificates.length>0">
            <el-pagination background layout="prev, pager, next"
                           :pager-count="5" @current-change="getCertificate"
                           :total="10*count" :hide-on-single-page="true">
            </el-pagination>
        </div>
        <el-dialog title="证书" :visible="dialogShow" width="840px"
                   @close="dialogShow=false">
            <canvas ref="canvas" width="800" height="565"/>
        </el-dialog>
    </div>
</template>

<script>
    import {getCertificate} from "@/api/course";

    export default {
        name: "Certificate",
        data() {
            return {
                count: 1,
                certificates: [],
                choose: null,
                dialogShow: false,
            }
        },
        methods: {
            async getCertificate(page) {
                const res = await getCertificate({page});
                if (res) {
                    this.count = res.pageSum;
                    this.certificates = res.certificates;
                }
            },
            openDialog(index) {
                this.choose = index;
                this.dialogShow = true;
                this.$nextTick(() => {
                    let canvas = this.$refs.canvas;
                    let context = canvas.getContext('2d');
                    let img = new Image();
                    img.src = require('../../assets/image/certificate-bg.png');
                    let nickname = this.certificates[index]['UserInformation']['nickname'];
                    let time = this.certificates[index]['createdAt'].split('-');
                    let msg = `${time[0]} 年 ${time[1]}月 ${time[2]} 日，在` +
                        `${this.certificates[index]['CourseInformation']['courseName']}课程中` +
                        '完成全部课时，通过考核。';
                    img.onload = () => {
                        context.drawImage(img, 0, 0, 800, 565);
                        context.font = "bold 45px Microsoft YaHei";
                        context.textAlign = "center";
                        context.fillText('结 业 证 书', canvas.width / 2, 120);
                        context.font = "bold 20px Microsoft YaHei";
                        context.textAlign = "start";
                        context.fillText(nickname + ' : ', 100, 180);
                        this.drawText(context, `       ${msg}`, 100, 200, 600);
                        context.font = "bold 20px Microsoft YaHei";
                        context.textAlign = "start";
                        context.fillText(`       证书编号：${this.certificates[index]['id']}`, 100, 400);
                        let chopImg = new Image();
                        chopImg.src = require('../../assets/image/certificate.png');
                        chopImg.onload = () => {
                            context.drawImage(chopImg, 600, 330, 120, 120);
                        }
                    };
                });
            },
            drawText(context, t, x, y, w) {
                let chr = t.split("");
                let temp = "";
                let row = [];
                context.font = "normal 20px Microsoft YaHei";
                context.textAlign = "start";
                context.fillStyle = "black";
                context.textBaseline = "middle";
                for (let a = 0; a < chr.length; a++) {
                    if (context.measureText(temp).width >= w) {
                        row.push(temp);
                        temp = "";
                    }
                    temp += chr[a];
                }
                row.push(temp);
                for (let b = 0; b < row.length; b++) {
                    context.fillText(row[b], x, y + (b + 1) * 28);
                }
                context.fillText('       特发此证。', 100, y + (row.length + 1) * 28);
            }
        },
        created() {
            this.getCertificate();
        }
    }
</script>

<style scoped>

</style>
