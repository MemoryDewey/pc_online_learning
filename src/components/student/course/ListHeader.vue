<template>
    <div class="study-header">
        <course-bread :bread="bread"></course-bread>
        <!--课程分类 S-->
        <div class="nav-menu">
            <!--课程体系 S-->
            <div class="first-row">
                <ul>
                    <li>
                        <router-link to="/course/list">
                            <span :class="{'name':true, current:$route.query.system === undefined}">全部课程</span>
                        </router-link>
                    </li>
                    <li v-for="system in systems" :key="system.id">
                        <router-link :to="`${$route.path}?system=${system.id}`">
                        <span :class="{'name':true, current:system.id.toString() === $route.query.system}">
                            {{system.name}}
                        </span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--课程体系 E-->
            <!--课程类别 S-->
            <div class="second-row" v-if="$route.query.system !== undefined">
                <ul>
                    <li>
                        <router-link :to="`${$route.path}?system=${$route.query.system}`">
                            <span :class="{current:$route.query.type === undefined}">全部</span>
                        </router-link>
                    </li>
                    <li v-for="type in types" :key="type.id">
                        <router-link :to="`${$route.path}?system=${$route.query.system}&type=${type.id}`">
                        <span :class="{current:type.id.toString() === $route.query.type}">
                            {{type.name}}
                        </span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--课程类别 E-->
        </div>
        <!--课程分类 E-->
    </div>
</template>

<script>
    import CourseBread from './CourseBread'
    import {getCourseSystem, getCourseType} from "../../../api/course";

    export default {
        name: "ListHeader",
        data() {
            return {
                bread: {
                    systemName: false,
                    systemUrl: false,
                    typeName: false,
                    typeUrl: false,
                    courseName: false
                },
                systems: null,
                types: null
            }
        },
        components: {
            "course-bread": CourseBread
        },
        methods: {
            /**
             * 体系改变时传递体系名
             * @param system 选择的体系ID
             */
            systemChange(system) {
                this.bread.systemName = this.systems.find((x) => {
                    return x.id === parseInt(system);
                }).name;
                document.title = this.bread.systemName;
                this.bread.systemUrl = `/course/list?system=${system}`;
                this.bread.typeName = false;
                this.bread.courseName = false;
            },
            /**
             * 类别改变时传递类别名
             * @param type 选择的类别ID
             */
            typeChange(type) {
                this.bread.typeName = this.types.find((x) => {
                    return x.id === parseInt(type);
                }).name;
                document.title = this.bread.typeName;
                this.bread.typeUrl = `/course/list?system=${this.$route.query.system}&type=${type}`;
                this.bread.courseName = false;
            }
        },
        watch: {
            /**
             * 监视体系变化，变化后设置其类别
             * @param val
             */
            '$route.query.system'(val) {
                if (val !== undefined) {
                    this.systemChange(val);
                    getCourseType({system: val}).then((response) => {
                        if (response) this.types = response.data;
                    })
                } else {
                    this.bread.systemName = false;
                    this.bread.typeName = false;
                    this.bread.courseName = false;
                }
            },
            /**
             * 监视类别变化
             * @param val
             */
            '$route.query.type'(val) {
                if (val !== undefined) {
                    this.typeChange(val);
                }
            }
        },
        async created() {
            let response = await getCourseSystem();
            if (response) {
                this.systems = response.data;
                if (this.$route.query.system !== undefined) {
                    this.systemChange(this.$route.query.system);
                    getCourseType({system: this.$route.query.system}).then((response) => {
                        if (response) {
                            this.types = response.data;
                            if (this.$route.query.type !== undefined)
                                this.typeChange(this.$route.query.type);
                        }
                    });
                }
            }
        }
    }
</script>

