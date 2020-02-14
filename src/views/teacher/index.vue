<template>
    <div id="container">
        <div class="teacher-manage">
            <div class="inner-center">
                <div class="main">
                    <el-tabs type="border-card" v-model="activeName" @tab-click="tabsChange">
                        <el-tab-pane label="学员管理" name="student"></el-tab-pane>
                        <el-tab-pane label="信息管理" name="list"></el-tab-pane>
                        <el-tab-pane label="章节管理" name="chapter"></el-tab-pane>
                        <el-tab-pane label="视频管理" name="video"></el-tab-pane>
                        <el-tab-pane label="直播管理" name="live"></el-tab-pane>
                        <el-tab-pane label="课件管理" name="pdf"></el-tab-pane>
                        <el-tab-pane label="资料管理" name="file"></el-tab-pane>
                        <el-tab-pane label="试卷管理" name="exam"></el-tab-pane>
                        <router-view></router-view>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Course",
        data() {
            return {
                page: "courseMng",
                activeName: null
            }
        },
        methods: {
            //tabs改变时触发
            tabsChange(event) {
                this.$router.push(`/teacher/course/${event.name}`)
            },
            //路由加载或更新时设置activeName
            setActiveName(routerName) {
                switch (routerName) {
                    case'CSM':
                        this.activeName = 'course';
                        break;
                    case 'CM':
                        this.activeName = 'list';
                        break;
                    case 'CCM':
                        this.activeName = 'chapter';
                        break;
                    case 'CVM':
                        this.activeName = 'video';
                        break;
                    case 'CLM':
                        this.activeName = 'live';
                        break;
                    case 'CPM':
                        this.activeName = 'pdf';
                        break;
                    case 'CFM':
                        this.activeName = 'file';
                        break;
                    case 'CEM':
                        this.activeName = 'exam';
                        break;
                }
            }
        },
        beforeCreate() {
            this.$emit('setHeader', 'manage');
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.setActiveName(to.name)
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.setActiveName(to.name);
            next();
        }
    }
</script>
