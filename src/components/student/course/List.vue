<template>
    <div class="study-main">
        <div class="study-all clearfix">
            <div class="study-content">
                <div class="content-left">
                    <div class="search-bar" v-if="$route.params.search!==undefined">
                        <div class="keywords">
                            关键词：<span>{{$route.params.search}}</span>
                            <router-link to="/course/list" class="button-clear">×</router-link>
                        </div>
                        <div class="search-result">
                            共找到<span>{{` ${searchCount} `}}</span>门<span>{{` ${$route.params.search} `}}</span>相关课程
                        </div>
                    </div>
                    <list-header></list-header>
                    <!--课程 S-->
                    <div class="study-body">
                        <!--课程排序 S-->
                        <div class="study-tag">
                            <div class="left">
                                <ul>
                                    <li>
                                        <router-link :class="{cur:$route.query.filter===undefined}" :to="filterUrl">
                                            全部
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.filter==='1'}"
                                                     :to="`${filterUrl}filter=1`">
                                            免费课
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.filter==='2'}"
                                                     :to="`${filterUrl}filter=2`">
                                            付费课
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.filter==='3'}"
                                                     :to="`${filterUrl}filter=3`">
                                            录播
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :class="{cur:$route.query.filter==='4'}"
                                                     :to="`${filterUrl}filter=4`">
                                            直播
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="right">
                                <ul>
                                    <li>
                                        <router-link :class="{cur:$route.query.sort===undefined}" :to="`${sortUrl}`">
                                            默认排序
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
                                        <router-link tag="i" class="up"
                                                     :class="{active:$route.query.sort==='3'}"
                                                     :to="`${sortUrl}sort=3`">
                                        </router-link>
                                        <router-link :class="{cur:$route.query.sort==='3' || $route.query.sort==='4'}"
                                                     :to="$route.query.sort==='3'?`${sortUrl}sort=4`:`${sortUrl}sort=3`">
                                            &emsp;价格
                                        </router-link>
                                        <router-link tag="i" class="down"
                                                     :class="{active:$route.query.sort==='4'}"
                                                     :to="`${sortUrl}sort=4`">
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--课程排序 E-->
                        <!--课程列表 S-->
                        <div class="study-list">
                            <div class="no-study" v-if="courses.length === 0">
                                <div class="message">
                                    <font-awesome-icon icon="info-circle"></font-awesome-icon>
                                    <div class="text">该分类下无课程</div>
                                </div>
                            </div>
                            <div class="study-item" v-for="course in courses" :key="course.courseID"
                                 @click="gotoCourseInfo(`/course/${course.courseID}/information`)">
                                <!--图片-->
                                <div class="left">
                                    <div class="c-img">
                                        <img v-lazy="`${course.courseImage}`" alt="">
                                    </div>
                                </div>
                                <!--内容-->
                                <div class="right">
                                    <div class="info">
                                        <!--标题-->
                                        <div class="title">
                                            <a><span class="text">{{course['courseName']}}</span></a>
                                            <a class="price"
                                               :class="{free:course.price === 0, charge:course.price !== 0}">
                                                {{course.price === 0 ? '免费' : `${course.price} BST`}}</a>
                                        </div>
                                        <!--授课老师/机构-->
                                        <div class="teacher"><a>
                                            {{course['CourseDetail']['UserInformation'].nickname}}
                                        </a></div>
                                        <!--描述-->
                                        <div class="description">{{course['courseDescription']}}</div>
                                        <!--细节-->
                                        <div class="detail">
                                            <span class="hot"><font-awesome-icon icon="user"></font-awesome-icon>{{course['applyCount']}}人已报名</span>
                                            <div class="praise">
                                                好评度 {{`${course['favorableRate']*100}%`}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--课程列表 E-->
                        <!--分页 S-->
                        <div class="study-sort-page" v-if="courses.length > 0">
                            <el-pagination background layout="prev, pager, next"
                                           :total="pageCount * 10" @current-change="pageChanged">
                            </el-pagination>
                        </div>
                        <!--分页 E-->
                    </div>
                    <!--课程 E-->
                </div>
                <div class="content-right">
                    <h2 class="top">热门推荐</h2>
                    <ul class="study-card-list">
                        <li class="study-card-item" v-for="recommend in recommendCourse"
                            :key="recommend.courseID"
                            @click="gotoCourseInfo(`/course/${recommend.courseID}/information`)">
                            <a class="item-img-link">
                                <img v-lazy="`${recommend.courseImage}`" alt="">
                            </a>
                            <h4 class="item-title">
                                <a class="item-title-link">{{recommend.courseName}}</a>
                            </h4>
                            <div class="item-info">
                                <span class="price charge" v-if="recommend['price']>0">{{recommend.price}} BST</span>
                                <span class="price free" v-else>免费</span>
                                <span class="praise">{{recommend['applyCount']}}人报名</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from './ListHeader'
    import {getListPage, getList, getRecommend} from '../../../api/course'

    export default {
        name: "List",
        data() {
            return {
                recommendCourse: {courseImage: ''},
                //分页URL
                pageUrl: '',
                //排序URL
                sortUrl: '',
                //筛选URL
                filterUrl: '',
                //课程
                courses: '',
                //分页相关
                pageCount: 0,
                //搜索课程总数
                searchCount: 0
            }
        },
        methods: {
            gotoCourseInfo(path) {
                let url = this.$router.resolve({path});
                window.open(url.href, "_blank");
            },
            changeUrl(val) {
                let systemQuery = val.system === undefined ? '' : `system=${val.system}`;
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
                getListPage({
                    system: this.$route.query.system,
                    type: this.$route.query.type,
                    filter: this.$route.query.filter,
                    search: this.$route.params.search
                }).then(res => {
                    if (res) {
                        this.pageCount = res.page
                    }
                })
            },
            pageChanged(val) {
                this.$router.push(`${this.pageUrl}page=${val}`);
            },
            async searchCourseCount() {
                if (this.$route.params.search !== undefined) {
                    this.searchCount = this.courses.length
                }
            }
        },
        components: {
            "list-header": ListHeader,
        },
        watch: {
            async '$route.query'(to) {
                this.getPageCount();
                let response = await getList(this.$route.query);
                if (response) this.courses = response.course;
                this.changeUrl(to);
            },
            async '$route.params'(to) {
                if(this.$route.params) {
                    let res = await getList(this.$route.params);
                    this.courses = [];
                    if (res) this.courses = res.course;
                    this.searchCourseCount();
                    this.changeUrl(to);
                }
            }
        },
        async created() {
            /* 改变URL */
            let val = {
                system: this.$route.query.system,
                type: this.$route.query.type,
                sort: this.$route.query.sort,
                filter: this.$route.query.filter
            };
            this.getPageCount();
            let response;
            /* 如果有搜索课程先获取符合条件的课程总数 */
            this.searchCourseCount();
            /* 获取推荐课程 */
            response = await getRecommend();
            if (response) this.recommendCourse = response.course;
            /* 获取课程 */
            response = await getList(this.$route.query);
            if (response) this.courses = response.course;
            this.changeUrl(val);
        }
    }
</script>
