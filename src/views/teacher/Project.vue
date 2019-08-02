<template>
    <div id="container">
        <app-header :page="page"></app-header>
        <div class="teacher-manage">
            <div class="inner-center">
                <div class="main">
                    <el-tabs type="border-card" v-model="activeName" @tab-click="tabsChange">
                        <el-tab-pane label="项目管理" name="project"></el-tab-pane>
                        <el-tab-pane label="项目成员管理" name="projectmember"></el-tab-pane>
                        <el-tab-pane label="项目报名申请管理" name="attendapply"></el-tab-pane>
                        <el-tab-pane label="项目创建申请管理" name="createapply"></el-tab-pane>
                        <router-view></router-view>
                    </el-tabs>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from '../../components/common/Header'
    import Footer from '../../components/common/Footer'
    export default {
        name: "Project",
        components: {
            'app-header': Header,
            'app-footer': Footer
        },
        data() {
            return {
                page: "projectMng",
                activeName: null
            }
        },
        methods: {
            //tabs改变时触发
            tabsChange(event) {
                this.$router.push(`/teacher/project/${event.name}`)
            },
            //路由加载或更新时设置activeName
            setActiveName(routerName) {
                switch (routerName) {
                    case'PP':
                        this.activeName = 'project';
                        break;
                    case 'PAAM':
                        this.activeName = 'attendapply';
                        break;
                    case 'PCAM':
                        this.activeName = 'createapply';
                        break;
                    case 'PPM':
                        this.activeName = 'projectmember';
                        break;
                }
            }
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
