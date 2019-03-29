<template>
	<div id='controls' class='con_flex_row'>
        <div class='btn flex_none btn_audio' v-if='!audioConnected' v-on:click.stop='toggleAudioConnection' v-bind:class='{active:popAVConnectionVisible || popAudioVisible}' ></div>
        <div class='btn flex_none btn_mute' v-tooltip.hover.click.top='muted ? "Unmute" : "Mute"' v-if='audioConnected' v-on:click.stop='toggleMute' v-bind:class='{selected:muted}' ></div>
        <div class='btn flex_none btn_cam' v-if='audioConnected && !videoConnected' v-on:click.stop='toggleVideoConnection' v-bind:class='{active:popVideoVisible}' ></div>
        <div class='btn flex_none btn_video' v-tooltip.hover.click.top='!videoConnected ? "Start My Video" : "Switch / Stop My Video"' v-if='audioConnected && videoConnected' v-on:click.stop='toggleVideoConnection' v-bind:class='{active:popVideoVisible, selected:cameraOn}' ></div>
        <div class='btn flex_none btn_share' v-tooltip.hover.click.top='"Share Content"' v-on:click.stop='showPopShare' v-bind:class='{active:popShareVisible}' ></div>
        <div class='btn flex_none btn_record' v-tooltip.hover.click.top='"Recorder"' v-on:click.stop='toggleRecord' v-bind:class='{active:popRecordVisible, on:recording}' ></div>
        <div class='btn flex_none btn_plist' v-tooltip.hover.click.top='"Participants"' v-on:click.stop='togglePlist' v-bind:class='{selected:plistPanelVisible}'></div>
        <div class='btn flex_none btn_chat' v-tooltip.hover.click.top='"Chats"' v-on:click.stop='toggleChat' v-bind:class='{selected:chatPanelVisible, alert:newMsgAlert}'></div>
        <!--div class='btn flex_none btn_lock' v-on:click.stop='toggleLock' v-bind:class='{selected:locked}'></div-->
        <div class='btn flex_none btn_more' v-tooltip.hover.click.top='"More Options"' v-on:click.stop='showPopmenuMore' v-bind:class='{active:popmenuMoreVisible}' ></div>
        <div class='btn flex_none btn_x' v-tooltip.hover.click.top='"Leave"' ></div>
        <div class='flex_none btn_exp' v-if='truncated' v-on:mouseover='mouseover'></div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        	truncated: false,
            newMsgAlert: false,
        }
    },
    computed:{
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode(){
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched(){
            return this.$store.state.videoSharingSwitched;
        },
        audioConnected(){
            return this.$store.state.audioConnected;
        },
        videoConnected(){
            return this.$store.state.videoConnected;
        },
        muted(){
            return this.$store.state.muted;
        },
        cameraOn(){
            return this.$store.state.cameraOn;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        recording(){
            return this.$store.state.recording;
        },
        locked(){
            return this.$store.state.locked;
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        popAVConnectionVisible(){
            return this.$store.state.popAVConnectionVisible;
        },
        popRecordVisible(){
            return this.$store.state.popRecordVisible;
        },
        popAudioVisible(){
            return this.$store.state.popAudioVisible;
        },
        popVideoVisible(){
            return this.$store.state.popVideoVisible;
        },
        popShareVisible(){
            return this.$store.state.popShareVisible;
        },
        poptipVisible(){
            return this.$store.state.poptipVisible;
        },
        popmenuMoreVisible(){
            return this.$store.state.popmenuMoreVisible;
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        plistPanelVisible(){
            return this.$store.state.plistPanelVisible;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        notesPanelVisible(){
            return this.$store.state.notesPanelVisible;
        },
        hasOpenPanel(){
            return this.$store.state.plistPanelVisible || this.$store.state.chatPanelVisible || this.$store.state.notesPanelVisible;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        chatMsgList(){
            return this.$store.state.chatMsgList;
        },

    },
    mounted(){
        this.onResize();
        window.addEventListener('resize', this.onResize);        
    },
    watch: {
        panelVisible (newVal) {
            this.setResize()
        },
        audioConnected (newVal) {
            this.setResize()
        },
        plistPanelVisible (newVal) {
            this.setResize()
        },
        chatPanelVisible (newVal) {
            this.setResize()
        },
        rightPanelWidth (newVal) {
            this.setResize()
        },
        videoLayoutMode (newVal) {
            this.setResize()
        },
        fullscreen (newVal){
            let cnt = 0;
            let itv = setInterval(()=>{
                cnt++;
                this.onResize();
                if(cnt >= 50){
                    clearInterval(itv);
                }
            },10);
        },
        chatMsgList (newVal){
            let msgs = this.$store.getters.unreadMessages;
            this.newMsgAlert = msgs && msgs.length > 0 && !this.chatPanelVisible;

            if(this.newMsgAlert){
                let firstmsg = this.chatMsgList.find(msg => msg.unread);

                this.$store.commit('poptipText', firstmsg.name+': '+firstmsg.msg);
                
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_chat').offset();
                let left = offset.left - appos.left + $('#controls .btn_chat').width()/2;
                let top = offset.top- appos.top;

                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('poptipVisible', true);
            }
            
        },
    },
    methods:{
        setResize(){
            let cnt = 0;
            let itv = setInterval(()=>{
                cnt++;
                this.onResize();
                if(cnt >= 10){
                    clearInterval(itv);
                }
            },10);
        },
        toggleAudioConnection(evt){
            if(!this.popAudioVisible){
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_audio').offset();
                let left = offset.left - appos.left + $('#controls .btn_audio').width()/2;
                let top = offset.top- appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popAudioVisible', true);
            }else{
                this.$store.commit('popAudioVisible', false);
            }
        },
        toggleVideoConnection(evt){
            if(!this.popVideoVisible){
                let btn
                if($('#controls .btn_cam').length > 0){
                    btn = $('#controls .btn_cam')
                }else{
                    btn = $('#controls .btn_video')
                }
                let appos = $('#mainclient').offset();
                let offset = btn.offset();
                let left = offset.left - appos.left + btn.width()/2;
                let top = offset.top- appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popVideoVisible', true);
            }else{
                this.$store.commit('popVideoVisible', false);
            }
        },
        toggleMute(evt){
            if(this.muted){
                this.$store.commit('muted', false);
            }else{
                this.$store.commit('muted', true);
            }
        },
        toggleVideo(evt){
            if(this.cameraOn){
                this.$store.commit('cameraOn', false);
            }else{
                this.$store.commit('cameraOn', true);
            }
        },
        showPopShare(evt){
            if(!this.popShareVisible){
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_share').offset();
                let left = offset.left - appos.left + $('#controls .btn_share').width()/2;
                let top = offset.top- appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popShareVisible', true);
            }else{
                this.$store.commit('popShareVisible', false);
            }
        },
        toggleRecord(evt){
            if(this.popRecordVisible){
                this.$store.commit('popRecordVisible', false);
            }else{
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_record').offset();
                let left = offset.left - appos.left + $('#controls .btn_record').width()/2;
                let top = offset.top- appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popRecordVisible', true);
            }
        },
        toggleLock(evt){
            if(this.locked){
                this.$store.commit('locked', false);
                this.$store.commit('poptipText', 'The meeting room is unlocked.');
            }else{
                this.$store.commit('locked', true);
                this.$store.commit('poptipText', 'The meeting room is locked.');
            }
            
            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_lock').offset();
            let left = offset.left - appos.left + $('#controls .btn_lock').width()/2;
            let top = offset.top- appos.top;

            this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('poptipVisible', true);
        },
        showPopmenuMore(evt){
            if(!this.popmenuMoreVisible){
                let appos = $('#mainclient').offset();
                let offset = $('#controls .btn_more').offset();
                let left = offset.left - appos.left + $('#controls .btn_more').width()/2;
                let top = offset.top- appos.top;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popmenuMoreVisible', true);
            }else{
                this.$store.commit('popmenuMoreVisible', false);
            }
        },
        togglePlist(evt){
            if(this.fullscreen){
                this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
                return;
            }
            this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
            if(!this.panelVisible && this.hasOpenPanel){
                this.$store.commit('panelVisible', true);
            }else if(this.panelVisible && !this.hasOpenPanel){
                this.$store.commit('panelVisible', false);
            }
        },
        toggleChat(evt){
            if(this.newMsgAlert){
                this.$store.commit('poptipVisible', false);
                this.newMsgAlert = false;
            }

            if(this.fullscreen){
                this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
                return;
            }
            
            this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
            if(!this.panelVisible && this.hasOpenPanel){
                this.$store.commit('panelVisible', true);
            }else if(this.panelVisible && !this.hasOpenPanel){
                this.$store.commit('panelVisible', false);
            }
        },
        onResize(){
            let btnw = 52+8
            let hudw = $('#hud').width()
            let btnnum = $('#controls .btn').length
            let ctrlw = btnnum * btnw
            let left = 0;
            const margin = 20;
            const arrw = 20
            if(hudw > ctrlw + margin*2){
                this.truncated = false;
                left = (hudw-ctrlw)/2
                $('#controls .btn').show();
            }else{
                let visiblenum = Math.floor((hudw - margin*2 - arrw)/btnw)
                $('#controls .btn').each(function(index, el) {
                    if(index < visiblenum){
                        $(el).show();
                    }else{
                        $(el).hide();
                    }
                });
                this.truncated = true;
                ctrlw = visiblenum * btnw + arrw
                left = (hudw-ctrlw)/2
            }
            $('#controls').css('left', left)
        },
        mouseover(evt){
            this.truncated = false;
            $('#controls .btn').show();
            window.addEventListener('mousemove', this.mousemove);
        },
        mousemove(evt){
            if( !$('#controls').hitTest(evt.pageX, evt.pageY) ){
                this.onResize()
                window.removeEventListener('mousemove', this.mousemove);
            }
            
        },
    }

}
</script>

<style scoped>

#controls{
    position: absolute;
    height: 54px;
    bottom: 14px;
    text-align: center;
    pointer-events: none;
    overflow: hidden;
}
#controls .btn{
    display: inline-block;
    width: 52px;
    height: 52px;
    background-color: rgba(41,41,41,0.9);
    background-position: center center;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 1px rgba(255,255,255,1);
    border-radius: 26px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    margin: 1px 4px;
}
#controls .active{
    background-color: #292929;
}
#controls .btn_exp {
    height: 52px;
    width: 12px;
    pointer-events: auto;
    cursor: pointer;
    margin: 1px 4px;
    background: url(../img/icon/ico_ctrl_arr.svg) no-repeat center;
}
#controls .btn_audio{
    background-image: url(../img/icon/ico_ctrl_audio.svg);
}
#controls .btn_mute{
    background-image: url(../img/icon/ico_ctrl_mute.svg);
}
#controls .btn_cam{
    background-image: url(../img/icon/ico_ctrl_cam.svg);
}
#controls .btn_video{
    background-image: url(../img/icon/ico_ctrl_cam.svg);
    /*background-image: url(../img/icon/ico_ctrl_video.svg);*/
}
#controls .btn_video.camoff{
    background-image: url(../img/icon/ico_ctrl_cam.svg);
}
#controls .btn_share{
    background-image: url(../img/icon/ico_ctrl_share.svg);
}
#controls .btn_record{
    background-image: url(../img/icon/ico_ctrl_recorder.svg);
}
#controls .btn_record.on{
    background-image: url(../img/icon/ico_ctrl_recorder_on.svg);
}
#controls .btn_plist{
    background-image: url(../img/icon/ico_ctrl_plist.svg);
}
#controls .btn_chat{
    background-image: url(../img/icon/ico_ctrl_chat.svg);
}
#controls .btn_lock{
    background-image: url(../img/icon/ico_ctrl_lock.svg);
}
#controls .btn_more{
    background-image: url(../img/icon/ico_ctrl_more.svg);
}
#controls .btn_x{
    background-color: #F5483F;
    background-image: url(../img/icon/ico_ctrl_x.svg);
}
#controls .selected{
    background-color: #049FD9;
}
#controls .alert{
    background-color: #E9691E;
}


</style>