<template>
    <div class="tabs-list" :class="{hide:file.hide}" @click="getFile">
        <div class="tabs-item" v-for="chapter in courseFile" :key="chapter.number">
            <div class="tabs-item-title">
                <span>{{chapter.number}}</span>
                <h3>{{chapter.name}}</h3>
            </div>
            <div class="tabs-item-list">
                <a class="tabs-study-item" v-for="file in chapter.file"
                   :key="file.id" @click="downloadFile(file.str,file.name,file.type)">
                    <font-awesome-icon far :icon="file.type | fileFilter"></font-awesome-icon>
                    <p class="study-item-title">
                        <span :title="file.name" class="text">{{file.name}}</span>
                        <span class="duration">({{file.type}}, {{setFileSize(file.size)}})</span>
                    </p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import {getFile} from "../../../api/course";
    import {Message} from "element-ui";
    import {saveAs} from "file-saver";

    export default {
        name: "InfoFile",
        props: {
            file: {type: Object, required: true}
        },
        watch: {
            "file.hide"(val) {
                if (!val) this.getFile();
            }
        },
        data() {
            return {
                downloadUrl: process.env.VUE_APP_BASE_API +
                    `/course/information/file-download?courseID=${this.$route.params.courseID}&file=`,
                courseFile: [],
            }
        },
        filters: {
            fileFilter(type) {
                const FileMap = {
                    txt: 'file-alt',
                    png: 'file-image',
                    jpg: 'file-image',
                    zip: 'file-archive',
                    pdf: 'file-pdf',
                    docx: 'file-word',
                    doc: 'file-word',
                    ppt: 'file-powerpoint',
                    pptx: 'file-powerpoint',
                    xls: 'file-excel',
                    xlsx: 'file-excel'
                };
                return FileMap[type];
            }
        },
        methods: {
            //获取视频与文件信息
            async getFile() {
                let response = await getFile({courseID: this.$route.params.courseID});
                if (response) this.courseFile = response.data;
            },
            //处理文件大小显示
            setFileSize(size) {
                return size > 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(2)}MB` :
                    `${(size / 1024).toFixed(2)}KB`
            },
            //下载课程资料
            downloadFile(fileStr, fileName, fileType) {
                if (this.file.apply && this.$store.state.loginState)
                    saveAs(`${this.downloadUrl}${fileStr}.${fileType}&fileName=${fileName}.${fileType}`);
                else Message.info('需要报名后才能下载课程资料哦');
            },
        }
    }
</script>
