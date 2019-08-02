<template>
    <div id="informationDialog">
    <el-dialog title="详情信息" :visible.sync="infoDialogVisible" width="650px" center>
        <div v-for="(item,index) in infoArr" :key="index">
        <p>{{item.title}}:{{item.value}}</p>
        </div>
        <table style="margin-top:5%" border="1px" width="100%" v-if="infoTableWidth">           
            <tr v-for="n in infoTable.length/infoTableWidth" :key=n>
                <td v-for="n1 in infoTableWidth" :key="(n-1)*infoTableWidth+(n1-1)">{{infoTable[infoTableWidth*(n-1)+(n1-1)]}}</td>
            </tr>
        </table>    
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="infoDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog> 
    </div>
</template>

<script>

    export default {
        name: "InformationDialog",
        props: {
            infoDialogVisible: {
                type: Boolean,
                default:false,
            },
            //信息界面-详情清单
            //[{value:'aaa',title:'bbb'},....]
            infoArr: {
                type: Array,
                default:function(){ return []},
            },
            //信息界面-表格列数，列数为0时将不显示表格
            infoTableWidth:{
                type:Number,
                default:0,
            },
            infoTable: {
                type: Array,
                default:function(){ return []},
            },
        },
        data() {
            return {

            }
        },
        methods: {

        },
        computed: {
        },
        watch: {
            infoDialogVisible(val){
                if(val===false){
                    this.$emit('dialogClose',val)
                }
            },
        },
        mounted() {
        },
        created() {
        }
    }
</script>
