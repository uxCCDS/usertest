<template>
    <div class='itm con_flex_row' v-on:click.stop='lockPeople' >
        <div class='col1 flex_1'>
            {{ name }}
        </div>
        <div class='col2 flex_none'>
            <div class='ico_video' v-if='telepresence' ></div>
        </div> 
    </div>
</template>

<script>


export default {
    props:[
        'name',
        'host',
        'video',
        'telepresence',
    ],
    data() {
        return {
            
        }
    },
    computed:{
        
    },
    mounted(){
        
    },
    watch: {
        
    },
    methods:{
        lockPeople(evt){
            if(this.telepresence || this.video == null){
                return;
            }
            this.$store.commit('lockedPeopleName', this.name);
            this.$store.commit('popLockPeopleVisible', false);
        },
    }
}
</script>


<style scoped>
.itm {
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    padding-left: 10px;
}
.itm:hover {
    background-color: rgba(4,159,217,0.08);
}
.col2 {
    width: 28px;
}
.ico_video {
    position: absolute;
    width: 12px;
    height: 100%;
    background: url(../img/icon/ico_plist_cam.svg) no-repeat center;
}

</style>