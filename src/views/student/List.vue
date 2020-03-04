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
                        <div class="study-list" v-loading="loading">
                            <div class="no-study" v-if="courses.length === 0 && !loading">
                                <div class="message">
                                    <font-awesome-icon icon="info-circle"></font-awesome-icon>
                                    <div class="text">该分类下无课程</div>
                                </div>
                            </div>
                            <div class="study-item" v-for="course in courses" :key="course.id"
                                 @click="gotoCourseInfo(`/course/${course.id}/information`)">
                                <!--图片-->
                                <div class="left">
                                    <div class="c-img">
                                        <el-image :src="course.image" lazy>
                                            <template slot="error">
                                                <img src="../../assets/image/load-error.jpg" alt>
                                            </template>
                                        </el-image>
                                    </div>
                                </div>
                                <!--内容-->
                                <div class="right">
                                    <div class="info">
                                        <!--标题-->
                                        <div class="title">
                                            <a><span class="text">{{course.name}}</span></a>
                                            <a class="price free" v-if="course.price===0">免费</a>
                                            <template v-else>
                                                <a class="price charge">{{
                                                    `${getDiscountPrice(course.price,course.discount,course.discountTime)}
                                                    课程币`
                                                    }}</a>
                                                <template v-if="getDiscountTime(course.discountTime)">
                                                    <a class="price tag">限时</a>
                                                    <a class="price discount">{{course.price}} 课程币</a>
                                                </template>
                                            </template>
                                        </div>
                                        <!--授课老师/机构-->
                                        <div class="teacher"><a>
                                            {{course.detail.teacher.nickname}}
                                        </a></div>
                                        <!--描述-->
                                        <div class="description">{{course.description}}</div>
                                        <!--细节-->
                                        <div class="detail">
                                            <span class="hot"><font-awesome-icon icon="user"></font-awesome-icon>{{course.apply}}人已报名</span>
                                            <div class="praise">
                                                好评度 {{`${course.rate*100}%`}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--课程列表 E-->
                        <!--分页 S-->
                        <div class="study-sort-page" v-if="courses.length > 0">
                            <el-pagination background layout="prev, pager, next" :hide-on-single-page="true"
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
                            :key="recommend.id"
                            @click="gotoCourseInfo(`/course/${recommend.id}/information`)">
                            <a class="item-img-link">
                                <el-image :src="recommend.image" lazy>
                                    <template slot="error">
                                        <img src="../../assets/image/load-error.jpg" alt>
                                    </template>
                                </el-image>
                            </a>
                            <h4 class="item-title">
                                <a class="item-title-link">{{recommend.name}}</a>
                            </h4>
                            <div class="item-info">
                                <span class="price charge" v-if="recommend.price>0">{{recommend.price}} 课程币</span>
                                <span class="price free" v-else>免费</span>
                                <span class="praise">{{recommend.apply}}人报名</span>
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
    import {getListPage, getList, getRecommend} from '@/api/course'
    import moment from "moment";

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
                courses: [],
                //分页相关
                pageCount: 0,
                //搜索课程总数
                searchCount: 0,
                //加载中
                loading: true
            }
        },
        methods: {
            gotoCourseInfo(path) {
                /*以新窗口的方式打开*/
                /*let url = this.$router.resolve({path});
                window.open(url.href, "_blank");*/
                /*直接打开*/
                this.$router.push({path});
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
                        this.pageCount = res.page;
                        this.searchCount = res.count
                    }
                })
            },
            pageChanged(val) {
                this.$router.push(`${this.pageUrl}page=${val}`);
                window.scrollTo(0, 0);
            },
            getDiscountTime(time) {
                if (time === null) return false;
                return moment(time).isAfter(moment());
            },
            getDiscountPrice(price, discount, time) {
                if (!discount || !time) return price;
                if (!moment(time).isAfter(moment())) return price;
                return (price * discount / 100).toFixed(2);
            }
        },
        components: {
            "list-header": ListHeader,
        },
        watch: {
            async '$route.query'(to) {
                this.getPageCount();
                this.loading = true;
                let params = this.$route.query;
                params.search = this.$route.params.search ? this.$route.params.search : undefined;
                let response = await getList(params);
                if (response) {
                    this.courses = response.course;
                    this.loading = false;
                }
                this.changeUrl(to);
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
            /* 获取推荐课程 */
            response = await getRecommend();
            if (response) this.recommendCourse = response;
            /* 获取课程 */
            let params = this.$route.query;
            params.search = this.$route.params.search ? this.$route.params.search : undefined;
            response = await getList(params);
            if (response) {
                this.courses = response.course;
                this.loading = false;
            }
            this.changeUrl(val);
        }
    }
</script>
