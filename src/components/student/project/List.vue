<template>
    <div class="study-main">
        <div class="study-all clearfix">
            <div class="study-content">
                <div class="content-left">
                    <div class="search-bar" v-if="$route.params.search!==undefined">
                        <div class="keywords">
                            关键词：<span>{{$route.params.search}}</span>
                            <router-link to="/project/list" class="button-clear">×</router-link>
                        </div>
                        <div class="search-result">
                            共找到<span>{{` ${searchCount} `}}</span>门<span>{{` ${$route.params.search} `}}</span>相关项目
                        </div>
                    </div>
                    <list-header></list-header>
                    <!--项目 S-->
                    <div class="study-body">
                        <!--项目排序 S-->
                        <div class="study-tag">
                            <div class="right">
                                <ul>
                                    <li>
                                        <router-link :class="{cur:$route.query.sort===undefined}" :to="`${sortUrl}`">
                                            综合排序
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.sort==='1'}" :to="`${sortUrl}sort=1`">
                                            好评率
                                            <font-awesome-icon icon="long-arrow-alt-down"></font-awesome-icon>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.sort==='2'}" :to="`${sortUrl}sort=2`">
                                            人气
                                            <font-awesome-icon icon="long-arrow-alt-down"></font-awesome-icon>
                                        </router-link>
                                    </li>
                                    <li class="sort-item">
                                        <router-link tag="i"
                                                     :class="{up:true,active:$route.query.sort==='3'}"
                                                     :to="`${sortUrl}sort=3`">
                                        </router-link>
                                        <router-link :class="{cur:$route.query.sort==='3' || $route.query.sort==='4'}"
                                                     :to="$route.query.sort==='3'?`${sortUrl}sort=4`:`${sortUrl}sort=3`">
                                            &emsp;价格
                                        </router-link>
                                        <router-link tag="i"
                                                     :class="{down:true,active:$route.query.sort==='4'}"
                                                     :to="`${sortUrl}sort=4`">
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--课程排序 E-->
                        <!--课程列表 S-->
                        <div class="study-list">
                            <div class="no-study" v-if="projects.length === 0">
                                <div class="message">
                                    <font-awesome-icon icon="info-circle"></font-awesome-icon>
                                    <div class="text">该分类下无项目</div>
                                </div>
                            </div>
                            <div class="study-item" v-for="project in projects" :key="project['projectID']"
                                 @click="gotoCourseInfo(`/project/${project['projectID']}/information`)">
                                <!--图片-->
                                <div class="left">
                                    <div class="c-img">
                                        <el-image :src="project.projectPic">
                                            <div slot="error" style="font-size: 60px;margin-left: 100px">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                    </div>
                                </div>
                                <!--内容-->
                                <div class="right">
                                    <div class="info">
                                        <!--标题-->
                                        <div class="title">
                                            <a><span class="text">{{project['projectName']}}</span></a>
                                            <a :class="{price:true, free:false, charge:true}">
                                                {{project['projectFee'] === 0 ? '免费' : `${project['projectFee']}
                                                BST`}}</a>
                                        </div>
                                        <!--授课老师/机构-->
                                        <div class="teacher"><a>机构/老师名称:{{project.ProjectCreator.nickname}}</a></div>
                                        <!--描述-->
                                        <div class="description">{{project['projectIntro']}}</div>
                                        <!--细节-->
                                        <div class="detail">
                                            <span class="hot">
                                                <font-awesome-icon icon="tasks"></font-awesome-icon>
                                                项目状态:{{myTotalOption.labelProjectStatus[project['projectStatue']]}}
                                            </span>
                                            <div class="praise">
                                                状态登记:
                                                {{(project['txHash']!=null&&project['txHash'].startsWith('0x'))?"已登记":"未登记"}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--课程列表 E-->
                        <!--分页 S-->
                        <div class="study-sort-page" v-if="projects.length>0">
                            <el-pagination background layout="prev, pager, next"
                                           :total="pageCount * 10" @current-change="pageChanged">
                            </el-pagination>
                        </div>
                        <!--分页 E-->
                    </div>
                    <!--课程 E-->
                </div>
            </div>
            <information-dialog @dialogClose="handleDialogClose" :infoArr="infoArr" :infoTableWidth="infoTableWidth"
                                :infoDialogVisible="infoDialogVisible" :infoTable="infoTable"></information-dialog>
        </div>
    </div>
</template>

<script>
    import ListHeader from './ListHeader'
    import InformationDialog from '../../common/InformationDialog'
    import SearchBarMid from '../../common/SearchBarMid'
    import {TotalOption,} from '../../../utils/constant/options';
    import SearchBar_mid from '../../common/SearchBarMid';
    import {getProjectCount, getProject} from "../../../api/project";

    export default {
        name: "List",
        data() {
            return {
                //分页URL
                pageUrl: '',
                //排序URL
                sortUrl: '',
                //筛选URL
                filterUrl: '',
                //课程
                projects: '',
                //分页相关
                pageCount: 0,
                //搜索课程总数
                searchCount: 0,
                myTotalOption: [],
                infoDialogVisible: false,
                infoArr: [{title: 'defualt', value: 'default'}],
                infoTableWidth: 0,
                infoTable: [],
                searchColumnArr: [],
                isSelectCom: {},
                searchOptionArr: {},
            }
        },
        methods: {
            handleSearchInfo(val) {
                console.log(val);
            },
            handleDialogClose() {
                this.infoDialogVisible = false;
            },
            gotoCourseInfo(path) {
                this.$router.push(path);
            },
            //生成URL模板，当参数改变时自动生成对应的查询URL
            changeUrl(val) {
                let systemQuery = val.projectField === undefined ? '' : `projectField=${val.projectField}`;
                let typeQuery = val.type === undefined ? '' : `type=${val.type}`;
                let filterQuery = val.filter === undefined ? '' : `filter=${val.filter}`;
                let sortQuery = val.sort === undefined ? '' : `sort=${val.sort}`;
                this.filterUrl = `${this.$route.path}?${systemQuery}${systemQuery === '' ? '' : '&'}` +
                    `${typeQuery}${typeQuery === '' ? '' : '&'}` +
                    `${sortQuery}${sortQuery === '' ? '' : '&'}`;
                this.sortUrl = `${this.$route.path}?${systemQuery}${systemQuery === '' ? '' : '&'}` +
                    `${typeQuery}${typeQuery === '' ? '' : '&'}` +
                    `${filterQuery}${filterQuery === '' ? '' : '&'}`;
                this.pageUrl = `${this.$route.path}?${systemQuery}${systemQuery === '' ? '' : '&'}` +
                    `${typeQuery}${typeQuery === '' ? '' : '&'}` +
                    `${filterQuery}${filterQuery === '' ? '' : '&'}` +
                    `${sortQuery}${sortQuery === '' ? '' : '&'}`;
            },
            getPageCount() {
                getProjectCount({
                    projectField: this.$route.query.projectField,
                    type: this.$route.query.type,
                    filter: this.$route.query.filter,
                    search: this.$route.params.search
                }).then(res => {
                    if (res) this.pageCount = res.count;
                }).catch(err => {
                    console.log(err);
                })
            },
            pageChanged(val) {
                this.$router.push(`${this.pageUrl}page=${val}`);
            }
        },
        components: {
            "list-header": ListHeader,
            "information-dialog": InformationDialog,
            "searchBarMid": SearchBar_mid
        },
        watch: {
            /* 改变URL */
            async '$route.query'(to) {
                this.getPageCount();
                if (this.$route.params.search !== undefined)
                    getProjectCount({search: this.$route.params.search}).then((response) => {
                        if (response) this.searchCount = response.count;
                    }).catch((err) => {
                        console.log(err);
                    });
                getProject(this.$route.query).then((response) => {
                    if (response) this.projects = response.sqlres;
                }).catch((err) => {
                    console.log(err);
                });
                this.changeUrl(to);
            }
        },
        created() {
            this.getPageCount();
            this.myTotalOption = TotalOption;
            /* 改变URL */
            // Test SerachBarMid
            // this.searchColumnArr=[
            //     {'value':'creatorID','label':'创建者'},
            //     {'value':'projectField','label':'项目领域'},
            //     {'value':'projectName','label':'项目名称'},
            // ];
            // this.isSelectCom={
            //     'creatorID':false,
            //     'projectField':true,
            //     'projectName':false,
            // };
            // this.searchOptionArr={
            //     'projectField':TotalOption.optionProjectField,
            // };
            // Test SerachBarMid End
            let val = {
                projectField: this.$route.query.projectField,
                type: this.$route.query.type,
                sort: this.$route.query.sort,
                filter: this.$route.query.filter
            };
            /* 如果有搜索课程先获取符合条件的课程总数 */
            if (this.$route.params.search !== undefined) {
                getProjectCount({search: this.$route.params.search}).then((response) => {
                    if (response) this.searchCount = response.count;
                }).catch((err) => {
                    console.log(err);
                });
            }
            /* 获取项目 */
            getProject(this.$route.query).then((response) => {
                if (response) this.projects = response.sqlres;
            }).catch((err) => {
                console.log(err);
            });
            this.changeUrl(val);
        }
    }
</script>
