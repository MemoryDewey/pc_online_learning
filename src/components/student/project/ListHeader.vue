<template>
    <div class="study-header">
        <!-- <course-bread :bread="bread"></course-bread> -->
        <!--项目领域 S-->
        <div class="nav-menu">
            <!--项目领域 S-->
            <div class="first-row">
                <ul>
                    <li>
                        <router-link to="/project/list">
                            <span :class="{'name':true, current:$route.query.projectField === undefined}">全部项目</span>
                        </router-link>
                    </li>
                    <li v-for="field in fields" :key="field.value">
                        <router-link :to="`${$route.path}?projectField=${field.value}`">
                        <span :class="{'name':true, current:field.value.toString() === $route.query.projectField}">
                            {{field.label}}
                        </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    // import CourseBread from './CourseBread'
    import {
        TotalOption,
    } from '../../../utils/constant/options';

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
                fields: TotalOption.optionProjectField,
                types: null
            }
        },
        components: {
            // "course-bread": CourseBread
        },
        computed: {
            setType() {
                return this.$route.query.projectField;
            },
            // getType() {
            //     return this.$route.query.type;
            // }
        },
        methods: {
            /**
             * 体系改变时传递体系名
             * @param system 选择的体系ID
             */
            // systemChange(system) {
            //     this.bread.systemName = this.systems.find((x) => {
            //         return x.id === parseInt(system);
            //     }).name;
            //     document.title = this.bread.systemName;
            //     this.bread.systemUrl = `/course/list?system=${system}`;
            //     this.bread.typeName = false;
            //     this.bread.courseName = false;
            // },
            /**
             * 类别改变时传递类别名
             * @param type 选择的类别ID
             */
            // typeChange(type) {
            //     this.bread.typeName = this.types.find((x) => {
            //         return x.id === parseInt(type);
            //     }).name;
            //     document.title = this.bread.typeName;

            // }
        },
        watch: {
            /**
             * 监视体系变化，变化后设置其类别
             * @param val
             */
            // setType(val) {
            //     if (val !== undefined) {
            //         this.systemChange(val);
            //     } 
            // },
            /**
             * 监视类别变化
             * @param val
             */
            // getType(val) {
            //     if (val !== undefined) {
            //         this.typeChange(val);
            //     }
            // }
        },
        created() {

        }
    }
</script>

