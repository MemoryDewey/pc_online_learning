<template>
    <div class="breadcrumb">
        <span @click="chooseAll">
            <router-link to="/course/list">全部课程</router-link>
        </span>
        <span v-if="bread['systemName']">
            <font-awesome-icon icon="angle-right"></font-awesome-icon>
            <span @click="chooseSystem">
                <router-link :to="bread['systemUrl']">{{bread['systemName']}}</router-link>
            </span>
        </span>
        <span v-if="bread['typeName']">
            <font-awesome-icon icon="angle-right"></font-awesome-icon>
            <router-link :to="bread['typeUrl']">{{bread['typeName']}}</router-link>
        </span>
        <span v-if="bread['courseName']">
            <font-awesome-icon icon="angle-right"></font-awesome-icon>
            <router-link :to="bread['courseUrl']">{{bread['courseName']}}</router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: "CourseBread",
        props: {
            bread: {type: Object, required: true}
        },
        methods: {
            chooseAll() {
                this.bread['systemName'] = false;
                this.bread['typeName'] = false;
                this.bread['courseName'] = false;
            },
            chooseSystem() {
                this.bread['typeName'] = false;
                this.bread['courseName'] = false;
            }
        }
    }
</script>

<style lang="less">
    .breadcrumb {
        margin-top: 30px !important;
        font-size: 14px;
        text-align: left;

        a {
            color: #333333;
            cursor: pointer;

            &:hover {
                text-decoration: none;
                color: #409eff;
            }
        }

        span {
            color: #999999;
        }

        svg {
            margin: 0 10px;
        }
    }
</style>
