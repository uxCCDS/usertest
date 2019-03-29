<template>
    <div class='header'>
        <div class='cls' v-bind:class='{rotate:collapsed}' v-on:click.stop='collapse' ></div>
        <div class='title'>{{ title }}</div>
        <div class='close' v-on:click.stop='close' ></div>
    </div>
</template>

<script>


export default {
    props:[
        'title',
        'type',
    ],
    data() {
        return {
            
        }
    },
    computed:{
        plistPanelClsed(){
            return this.$store.state.plistPanelClsed;
        },
        chatPanelClsed(){
            return this.$store.state.chatPanelClsed;
        },
        collapsed(){
            if(this.type=='plist' && this.plistPanelClsed){
                return true;
            }else if(this.type=='chat' && this.chatPanelClsed){
                return true;
            }else{
                return false;
            }
        },
    },
    mounted(){
        
    },
    watch: {
        
    },
    methods:{
        close(){
            this.$emit('close')
        },
        collapse(){
            this.$emit('collapse')
        },
    }
}
</script>


<style scoped>
.header {
    position: relative;
    width: 100%;
    height: 28px;
    background: #F5F5F6;
}
.cls {
    position: absolute;
    top: 1px;
    left: 0;
    width: 26px;
    height: 26px;
    background: url(../img/icon/ico_arrow_down.svg) no-repeat center center;
    pointer-events: auto;
    cursor: pointer;
}
.cls.rotate {
    transform:rotate(-90deg);
}
.title {
    width: 100%;
    height: 100%;
    line-height: 28px;
    margin-left: 26px;
}
.close {
    position: absolute;
    right: 0;
    top: 0;
    width: 38px;
    height: 100%;
    background: url(../img/icon/ico_panel_x.svg) no-repeat center center;
    pointer-events: auto;
    cursor: pointer;
}

</style>