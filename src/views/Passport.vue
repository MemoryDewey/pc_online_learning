<template>
    <div class="passport">
        <div class="logo">
            <router-link to="/">
                <img alt="Logo" src="../assets/image/logo-bcs.png">
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Passport"
    }
</script>
