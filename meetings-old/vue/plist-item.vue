<template>
    <div class='itm con_flex_row'>
        <div class='col1 flex_none'>
            <div class='avatar' v-bind:style='{backgroundImage: avatarUrl}' >
                <span v-if='!avatar'>{{ abbr }}</span>
            </div>
            <div class='ico_host' v-if='host' ></div>
        </div>
        <div class='col2 flex_none'>
            <div class='ico_audio' v-bind:style='{backgroundImage: audioIcoUrl}' ></div>
        </div>
        <div class='col3 flex_1 lb_name' v-bind:class='{me:me}' >{{ name }} <span>{{ suffix }}</span></div>
        <div class='col4 flex_none'>
            <div class='ico_video' v-if='video' ></div>
        </div>
        <div class='col5 flex_none'>
            <div class='ico_muted' v-if='muted' ></div>
        </div> 
    </div>
</template>

<script>


export default {
    props:[
        'name',
        'me',
        'host',
        'avatar',
        'video',
        'audio',
        'muted',
    ],
    data() {
        return {
            
        }
    },
    computed:{
        activeSpeakerName(){
            return this.$store.state.activeSpeakerName;
        },
        suffix(){
            let arr = [];
            if(this.me){
                arr.push('Me');
            }
            if(this.host){
                arr.push('Host');
            }
            if(arr.length > 0){
                return '('+arr.join(', ')+')';
            }
            return '';
        },
        avatarUrl(){
            if(this.avatar){
                return 'url('+this.$store.state.avatarPath+this.avatar+')';
            }else{
                return 'none';
            }
        },
        abbr(){
            let arr = this.name.split(' ');
            return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
        },
        audioIcoUrl(){
            if(this.name == this.activeSpeakerName){
                return 'url(../img/icon/ico_plist_active_speaker.svg)';
            }else if(this.audio == 'mobile'){
                return 'url(../img/icon/ico_plist_mobile.svg)';
            }else if(this.audio == 'pc' && !this.muted){
                return 'url(../img/icon/ico_plist_pc.svg)';
            }else if(this.audio == 'pc' && this.muted){
                return 'url(../img/icon/ico_plist_pc_muted.svg)';
            }else if(this.audio == 'phone' && !this.muted){
                return 'url(../img/icon/ico_plist_phone.svg)';
            }else if(this.audio == 'phone' && this.muted){
                return 'url(../img/icon/ico_plist_phone_muted.svg)';
            }else{
                return 'none';
            }
        },
    },
    mounted(){
        
    },
    watch: {
        
    },
    methods:{

    }
}
</script>


<style scoped>
.itm {
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.itm:hover {
    background-color: #F9F9F9;
}
.col1 {
    width: 44px;
}
.col2 {
    width: 28px;
}
.col4 {
    width: 32px;
}
.col5 {
    width: 40px;
}
.avatar {
    position: absolute;
    width: 28px;
    height: 28px;
    left: 15px;
    top: 6px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #F5F5F6;
    text-align: center;
}
.avatar span{
    line-height: 28px;
    font-size: 10px;
    color: #33AC96;
}
.ico_host {
    position: absolute;
    width: 12px;
    height: 12px;
    bottom: 4px;
    left: 34px;
    background: url(../img/icon/ico_plist_wbx_ball.svg) no-repeat center;
}
.ico_audio {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
}
.lb_name {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    font-size: 12px;
    line-height: 40px;
}
.lb_name.me{
    font-family: 'Segoe UI Semibold';
}
.lb_name span {
    color: #6A6B6C;
}
.ico_video {
    position: absolute;
    width: 12px;
    height: 100%;
    background: url(../img/icon/ico_plist_cam.svg) no-repeat center;
}
.ico_muted {
    position: absolute;
    width: 16px;
    height: 100%;
    background: url(../img/icon/ico_plist_muted.svg) no-repeat center;
}

</style>