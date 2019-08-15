<template>
    <div class="flex-list">
        <div class="flex-list-header">
            <div class="flex-row">
                <div class="flex-cell first">课程</div>
                <div class="flex-cell">证书编号</div>
                <div class="flex-cell">操作</div>
            </div>
        </div>
        <div class="flex-list-no-data" v-if="true">
            <div class="status-box">
                <div class="box-icon">
                    <span>
                        <font-awesome-icon icon="info-circle"></font-awesome-icon>
                    </span>
                </div>
                <div class="box-text">
                    <div>暂无证书信息</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Certificate"
    }
</script>

<style scoped>

</style>
