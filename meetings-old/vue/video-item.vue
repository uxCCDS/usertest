<template>
    <div class='video_item' v-show='videoVisible' v-on:mouseover='mouseover' v-on:mouseout='mouseout' v-bind:data-name='name' v-bind:style='{backgroundColor:backgroundColor}' >
        <div class='video' v-bind:class='{ wave:showWave, wave_stop:showWaveStop }'  >
            <video 
                v-if='!showWave && !showWaveStop' 
                v-bind:src='videoUrl' 
                v-bind:class='{ 
                    big:isBgVideo && !floatingVideo, 
                    big_fl:isBgVideo && floatingVideo, 
                    small:(videoLayoutMode=="strip" || videoLayoutMode=="active-speaker" || videoLayoutMode=="side-by-side" || videoLayoutMode=="fullscreen") && !isBgVideo, 
                    grid:videoLayoutMode=="grid" && !isBgVideo 
                }' 
                autoplay='true' 
                loop='true'
            ></video>
        </div>
        <div class='avatar' 
            v-if='video===null' 
            v-bind:style='{backgroundImage:avatarUrl}' 
            v-bind:class='{ 
                grid:videoLayoutMode=="grid"
            }' 
        >
            <span class='abbr' v-if='!avatar'>{{ abbr }}</span>
        </div>
        <div class='lb_name con_flex_row' 
            v-if='!isBgVideo || videoLayoutMode=="fullscreen"' 
            v-bind:class='{
                lb_small:videoLayoutMode=="strip" || (videoLayoutMode=="side-by-side") && activeSpeakerName!=name && sideBySideVideoColumn > 1 || videoLayoutMode=="fullscreen" && videoFloatingLayoutMode=="strip" && !isBgVideo, 
                lb_big:videoLayoutMode=="grid", 
                lb_small2:(videoLayoutMode=="side-by-side" || videoLayoutMode=="active-speaker") && activeSpeakerName==name || videoLayoutMode=="side-by-side" && sideBySideVideoColumn == 1 || videoLayoutMode=="fullscreen" && videoFloatingLayoutMode=="grid" || isBgVideo, 
                lb_muted:videoLayoutMode=="grid" && muted, 
                lb_muted2:(videoLayoutMode=="side-by-side" && sideBySideVideoColumn == 1) && muted
            }' ><div class='ico_sts_pin' v-if='!isBgVideo && videoLayoutMode=="strip" && lockedPeopleName == name' ></div><div class='flex_1' >{{ name }}</div>
            <div class='ico_muted flex_none' v-if='muted' ></div>
        </div>
        <div class='ico_mobile' v-if='audio == "mobile"' ></div>
        <div class='ico_host' v-if='host && !isBgVideo && videoLayoutMode!="side-by-side" && videoLayoutMode!="active-speaker" && videoLayoutMode!="fullscreen"' ></div>
        <div class='as_border' v-if='videoLayoutMode=="grid" && activeSpeakerName==name' ></div>
        <div class='as_border_thin' v-if='(!isBgVideo && videoLayoutMode=="strip" && currentSharing!==null && activeSpeakerName==name && !videoSharingSwitched) || (!isBgVideo && videoLayoutMode=="strip" && activeSpeakerName==name && activeSpeakerName!=lockedPeopleName && lockedPeopleName!=null)' ></div>
        <div class='control video_controls' v-show='ctrlVisible && !isBgVideo' v-bind:class='{big: videoLayoutMode=="grid" || videoLayoutMode=="side-by-side" && (activeSpeakerName==name || sideBySideVideoColumn == 1) }' >
            <span></span>
            <div class='ico ico_mute' ></div>
            <div class='ico ico_chat' ></div>
            <div class='ico ico_pin' ></div>
            <span></span>
        </div>
    </div>
</template>

<script>


export default {
    props:[
        'isBgVideo',
        'floatingVideo',
        'name',
        'host',
        'avatar',
        'video',
        'audio',
        'muted',
    ],
    data(){
        return {
            thisDom: null,
            ctrlVisible: false,
        }
    },
    mounted:function(){
        
    },
    computed:{
        videoVisible(){
            return !(this.videoLayoutMode == 'side-by-side' && this.panelVisible && this.activeSpeakerName != this.name)
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode(){
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched(){
            return this.$store.state.videoSharingSwitched;
        },
        activeSpeakerName(){
            return this.$store.state.activeSpeakerName;
        },
        lockedPeopleName(){
            return this.$store.state.lockedPeopleName;
        },
        showWave(){
            return (!this.isBgVideo && this.videoLayoutMode=="strip" && this.activeSpeakerName==this.name && this.currentSharing===null && (this.lockedPeopleName == null || this.activeSpeakerName==this.lockedPeopleName) )
            || (!this.isBgVideo && this.videoLayoutMode=="fullscreen" && this.videoFloatingLayoutMode=="strip" && this.activeSpeakerName==this.name)
            || (!this.isBgVideo && this.videoLayoutMode=="strip" && this.videoSharingSwitched && this.activeSpeakerName==this.name && (this.lockedPeopleName == null || this.activeSpeakerName==this.lockedPeopleName) )
        },
        showWaveStop(){
            return (!this.isBgVideo && this.videoLayoutMode=="strip" && this.lockedPeopleName == this.name && this.activeSpeakerName!=this.lockedPeopleName && (this.currentSharing===null || this.videoSharingSwitched) )
        },
        backgroundColor(){
            return this.showWave || this.showWaveStop ? 'rgba(0,0,0,0)' : '#EBEBEC';
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
        videoUrl(){
            return this.video ? this.$store.state.videoPath+this.video : '';
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
        sideBySideVideoColumn(){
            return this.$store.state.sideBySideVideoColumn;
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
    },
    watch: {
        lockedPeopleName (newVal) {
            if(this.isBgVideo && this.activeSpeakerName == this.name){
                if(this.lockedPeopleName != null){
                    let people = this.$store.getters.people(this.lockedPeopleName);
                    $('#active_speaker_video video').attr('src', this.$store.state.videoPath+people.video);
                }else{
                    let people = this.$store.getters.people(this.activeSpeakerName);
                    $('#active_speaker_video video').attr('src', this.$store.state.videoPath+people.video);
                }
            }
        },

    },
    methods:{
        mouseover(evt){
            if(this.isBgVideo){
                return;
            }
            if(this.videoLayoutMode=='fullscreen' && this.activeSpeakerName==this.name){
                return;
            }
            this.ctrlVisible = true;
        },
        mouseout(evt){
            if(this.isBgVideo){
                return;
            }
            this.ctrlVisible = false;
        },
    }
}
</script>

<style scoped>
.video_item {
    position: absolute;
    overflow: hidden;
    pointer-events: auto;
}
.video {
    position: absolute;
    height: 100%;
    width: 100%;
}
.wave {
    background-image: url(../img/sound_wave.gif);
    background-repeat: no-repeat;  
    background-position: center center;
    background-color: rgba(4,159,217,0.24);
}
.wave_stop {
    background-image: url(../img/wave_stopped.svg);
    background-repeat: no-repeat;  
    background-position: center 25px;
    background-color: rgba(4,159,217,0.24);
}
.as_border {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: 0 0 0 4px rgba(4,159,217,0.5) inset, 0 0 0 2px rgba(4,159,217,1) inset;
}
.as_border_thin {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: 0 0 0 2px rgba(4,159,217,0.5) inset, 0 0 0 1px rgba(4,159,217,1) inset;
}
.ico_muted {
    width: 16px;
    margin-left: 10px;
    background: url(../img/icon/ico_plist_muted.svg) no-repeat center;
}
.ico_mobile {
    display: inline-block;
    width: 12px;
    height: 12px;
    top: 5px;
    left: 5px;
    background: url(../img/icon/ico_plist_mobile.svg) no-repeat center;
}
.ico_host {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 5px;
    left: 5px;
    background: url(../img/icon/ico_plist_wbx_ball.svg) no-repeat center;
}
.ico_sts_pin {
    width: 16px;
    margin-right: 2px;
    background: url(../img/icon/ico_plist_pin.svg) no-repeat center;
}
.lb_small {
    position: absolute;
    bottom: 0px;
    width: calc(100% - 12px);
    font-size: 10px;
    line-height: 18px;
    padding-left: 6px;
    padding-right: 6px;
    background-color: rgba(255,255,255,0.8);
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}

.lb_big {
    position: absolute;
    bottom: 0px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: rgba(255,255,255,0.8);
}

.lb_small2 {
    position: absolute;
    bottom: 0px;
    font-size: 10px;
    line-height: 18px;
    padding-left: 6px;
    padding-right: 6px;
    background-color: rgba(255,255,255,0.8);
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}

.lb_muted {
}
.lb_muted2 {
}
video.big {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
}
video.big_fl {
    
    width: 100%;
    height: auto;
    margin: 0 auto;
}
video.small {
    width: 100%;
    height: auto;
    margin: 0 auto;
}
video.grid {
    width: auto;
    height: 100%;
    margin: 0 auto;
}
.avatar {
    position: absolute;
    height: 40px;
    width: 40px;
    top: calc(50% - 9px);
    left: 50%;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    transform:translate(-50%,-50%);
    text-align: center;
    background-color: #F5F5F6;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.2);
}
.avatar.grid {
    top: 50%;
    height: 50%;
    width: 37.5%;
}
.avatar .abbr{
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    line-height: 0px;
    padding-top: 50%;
    font-size: 18px;
    color: #33AC96;
}
.avatar.grid .abbr{
    font-size: 60px;
    color: #33AC96;
    vertical-align: middle;
}
.control {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(41,41,41,0.8);
    text-align: center;
}
.control .ico {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.89);
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 1px;
}
.control span{
    pointer-events: none;
    display: inline-block;
    height: 100%;
    width: 0px;
    vertical-align: middle;
}
.control .ico_mute {
    background-image: url(../img/icon/ico_video_ctrl_mute.svg);
}
.control .ico_chat {
    background-image: url(../img/icon/ico_video_ctrl_chat.svg);
}
.control .ico_pin {
    background-image: url(../img/icon/ico_video_ctrl_pin.svg);
}

.control.big {
    position: absolute;
    width: 120px;
    height: 48px;
    left: calc((100% - 120px)/2);
    top: calc((100% - 48px)/2);
    border-radius: 24px;
}
.control.big .ico {
    width: 24px;
    height: 24px;
    margin: 0 3px;
    background-size: 10px auto;
}

</style>