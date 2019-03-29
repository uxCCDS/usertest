<template>
    <transition name="fade">
	<div id='pop_record' v-show='popRecordVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Recorder</div>
            <div class='des' v-if='!recording'>Click the button to record on server</div>
            <div class='des' v-if='recording'><span style='color:#F5483F; padding-right:3px;'>●</span>Recording...</div>
            <div class='timer'>{{ formatedRecordingTime }}</div>
            <div class='btns'>
                <div class='btn btn_record' v-if='!recording' v-on:click.stop='start' ><span class='ico'></span><span class='lb'>Record</span><span class='padding'></span></div>
                <div class='btn btn_pause' v-if='recording' v-on:click.stop='pause' ><span class='ico'></span><span class='lb'>Pause</span><span class='padding'></span></div>
                <div class='btn btn_stop' v-bind:class='{disabled:!recording}' v-on:click.stop='stop' ><span class='ico'></span><span class='lb'>Stop</span><span class='padding'></span></div>
            </div>

        </div>
        
    </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
            timer: null
        }
    },
    computed:{
        popRecordVisible(){
            return this.$store.state.popRecordVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        recording(){
            return this.$store.state.recording;
        },
        recordingTime(){
            return this.$store.state.recordingTime;
        },
        formatedRecordingTime(){
            let tm = this.$store.state.recordingTime;
            let h = Math.floor(tm/3600);
            h = h < 10 ? '0'+h : h;
            let m = Math.floor(tm%3600/60);
            m = m < 10 ? '0'+m : m;
            let s = Math.floor(tm%60);
            s = s < 10 ? '0'+s : s;
            return h+':'+m+':'+s;
        },
    },
    mounted(){
        
    },
    watch: {
        popRecordVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_record').css('left', left+'px');
                $('#pop_record').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },
        recording: function (newVal) {
            if(newVal){
                clearInterval(this.timer);
                this.timer = setInterval(()=>{this.counter()}, 1000);
            }else{
                clearInterval(this.timer);
                this.$store.commit('recordingTime', 0); 
            }
        }
    },
    methods:{
        onMouseDown(evt){
            if( !$('#controls .btn_record').hitTest(evt.pageX, evt.pageY) && $('#pop_record').length && !$('#pop_record').hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popRecordVisible', false);
            }
        },
        start(evt){
           this.$store.commit('recording', true); 
        },
        pause(evt){
           this.$store.commit('recording', true); 
        },
        stop(evt){
           this.$store.commit('recording', false); 
        },
        counter(){
            this.$store.commit('recordingTime', this.recordingTime+1);
        },
        close(evt){
           this.$store.commit('popRecordVisible', false); 
        }
    }

}
</script>

<style scoped>
#pop_record {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 260px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    transform:translate(-50%,-100%);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    width: 50px;
    height: 20px;
    bottom: -20px;
    left: calc((100% - 50px)/2);
    background: url(../img/pop_triangle_down.svg) no-repeat 0 0;
}
.wrap{
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
}
.close {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 8px;
    right: 8px;
    background: url(../img/icon/ico_panel_x.svg) no-repeat center center;
    pointer-events: auto;
    cursor: pointer;
    z-index: 100;
}
.title {
    text-align: center;
    font-size: 14px;
}
.des {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #6A6B6C;
}
.timer {
    margin-top: 18px;
    text-align: center;
    font-size: 24px;
}
.btns {
    margin: 25px 0 25px 0;
    width: 100%;
    text-align: center;
}
.btns .btn{
    display: inline-block;
    min-width: 110px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    margin: 0 2px;
    text-align: center;
    color: #FFF;
    background: #F5483F;
    cursor: pointer;
}
.btns .btn .ico{
    display: inline-block;
    width: 28px;
    height: 32px;
    vertical-align: middle;
}
.btns .btn .padding{
    display: inline-block;
    width: 6px;
    height: 32px;
    vertical-align: middle;
}
.btns .btn .lb{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    text-align: left;
    vertical-align: middle;
}
.btns .btn.disabled{
    color: #AEAEAF;
    background: #EBEBEC;
}
.btns .btn_pause{
    color: rgba(41,41,41,1);
    background: rgba(41,41,41,0.12);
}
.btns .btn_stop{
    color: rgba(41,41,41,1);
    background: rgba(41,41,41,0.12);
}
.btn_record .ico{
    background: url(../img/icon/ico_btn_recorder.svg) no-repeat center center;
}
.btn_stop .ico{
    background:url(../img/icon/ico_btn_recorder_stop.svg) no-repeat center center;
}
.btn_pause .ico{
    background: url(../img/icon/ico_btn_recorder_pause.svg) no-repeat center center;
}
.btn_stop.disabled .ico{
    background:url(../img/icon/ico_btn_recorder_stop_disabled.svg) no-repeat center center;
}


/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>