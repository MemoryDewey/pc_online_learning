<template>
    <div class="course-ware" v-loading="loading" :element-loading-text="loadingText"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0)">
        <!--翻页按钮 S-->
        <div class="arrow clearfix">
            <i class="left" @click="prePage">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </i>
            <i class="right" @click="nextPage">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </i>
        </div>
        <!--翻页按钮 E-->
        <!--PDF展示 S-->
        <pdf ref="pdf" :src="pdfUrl" :page="pageNum"
             @num-pages="pageTotalNum=$event" @page-loaded="pageLoaded"
             @error="pageError" @progress="pageLoading($event)">
        </pdf>
        <!--PDF展示 E-->
    </div>
</template>

<script>
    import pdf from 'vue-pdf'

    export default {
        name: "CourseWare",
        props: {ware: {type: String, required: true, default: null}},
        data() {
            return {
                pageTotalNum: 1,
                pageNum: 1,
                pdfUrl: null,
                loading: true,
                loadingText: '加载中',
                loadingProgress: 0,
                baseWareUrl: '',
                headers: {Authorization: localStorage.getItem('token')}
            }
        },
        components: {pdf},
        methods: {
            prePage() {
                let page = this.pageNum;
                page--;
                if (page > 0)
                    this.pageNum = page;
            },
            nextPage() {
                let page = this.pageNum;
                page++;
                if (page <= this.pageTotalNum) this.pageNum = page;
            },
            pageLoading(e) {
                let per = Math.round(e * 100) / 100;
                this.loadingText = `加载中,${Math.round(per * 100)}%`
            },
            pageLoaded() {
                this.loading = false;
            },
            pageError() {
                this.loading = true;
                this.loadingText = '暂无课件'
            }
        },
        watch: {
            ware(val) {
                this.pdfUrl = pdf.createLoadingTask({
                    url: `${this.baseWareUrl}&wareID=${val}`,
                    httpHeaders: this.headers
                });
            }
        },
        created() {
            let courseID = this.$route.params.courseID;
            this.baseWareUrl = `${process.env.VUE_APP_BASE_API}/course/information/course-ware?courseID=${courseID}`;
            this.pdfUrl = {
                url: `${this.baseWareUrl}&wareID=${this.ware}`,
                httpHeaders: this.headers
            };
        }
    }
</script>

<style lang="less">
    .course-ware {
        width: 100%;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;

        &:hover .arrow {
            display: inline-block;
        }

        .arrow {
            width: 870px;
            position: absolute;

            z-index: 10;
            display: none;

            i {
                font-size: 25px;
                color: #000;
                cursor: pointer;
            }

            .left {
                margin-left: 10px;
                float: left;
            }

            .right {
                margin-right: 10px;
                float: right;
            }
        }

        canvas {
            height: 490px !important;
            width: 870px !important;
        }

        .annotationLayer {
            transform: scale(1) !important;
        }
    }

</style>
