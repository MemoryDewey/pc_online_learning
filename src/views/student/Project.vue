<template>
    <div id="container">
        <header-course :page="page"></header-course>
        <router-view></router-view>
        <footer-course></footer-course>
    </div>
</template>

<script>
    import Header from '../../components/common/Header'
    import Footer from '../../components/common/Footer'

    export default {
        name: "Project",
        data() {
            return {
                page: "project"
            }
        },
        components: {
            "header-course": Header,
            "footer-course": Footer
        }
    }
</script>

