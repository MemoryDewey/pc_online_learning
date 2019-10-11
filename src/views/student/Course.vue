<template>
    <div id="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from '@/components/common/Header'
    import Footer from '@/components/common/Footer'

    export default {
        name: "Course",
        data() {
            return {
                page: "course"
            }
        },
        components: {
            "header-course": Header,
            "footer-course": Footer
        },
        beforeCreate() {
            this.$emit('setHeader', 'course');
        }
    }
</script>

