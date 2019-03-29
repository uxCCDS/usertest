<template>
    <transition name="fade">
	<div id='pop_video' v-show='popVideoVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Video Connection</div>

            <select id='cam_list'>
              <option selected='selected'>Microsoft LifeCam Font</option>
              <option >iSight Cam</option>
            </select>

            <div class='video'>
                <video id="camera_preview" autoplay="true" ></video>
                <div class='lb'>Preview Only</div>
            </div>

            <div class='btn_start uibutton green' v-if='!videoConnected' v-on:click.stop='sendVideo'>Start My Video</div>
            <div class='btn_stop uibutton red' v-if='videoConnected' v-on:click.stop='stopVideo'>Stop My Video</div>

        </div>
        
    </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
            domParent: null,
            domSelf: null,
        }
    },
    computed:{
        popVideoVisible(){
            return this.$store.state.popVideoVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        videoConnected(){
            return this.$store.state.videoConnected;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_video');
        this.initCam();
        $('#cam_list').selectmenu();
    },
    watch: {
        popVideoVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_video').css('left', left+'px');
                $('#pop_video').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },

    },
    methods:{
        initCam(){
            var selfViewVideo = document.getElementById('camera_preview');
            
            // play if video stops playing
            var success = (stream) => {
                window.selfStream = stream;
                selfViewVideo.src = window.URL.createObjectURL(stream);
                selfViewVideo.addEventListener('pause', window.playVideoElement);
            };
            var videoError = (error) => {
                console.log(error);
            };
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, success, videoError);
            }
        },
        onMouseDown(evt){
            let btn
            if($('#controls .btn_cam').length > 0){
                btn = $('#controls .btn_cam')
            }else{
                btn = $('#controls .btn_video')
            }
            if( !btn.hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY) ){
                this.close();
            }
        },
        sendVideo(evt){
            this.$store.commit('videoConnected', true);
            this.close();
        },
        stopVideo(evt){
            this.$store.commit('videoConnected', false);
            this.close();
        },
        close(evt){
           this.$store.commit('popVideoVisible', false); 
        }
    }

}
</script>

<style>
 #cam_list-button {
    margin-top: 12px;
    width: 100%;
}
</style>

<style scoped>
#pop_video {
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
    margin: 0 20px 24px 20px;
    border-radius: 5px;
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
    height: 32px;
    width: 100%;
    line-height: 32px;
}
.video {
    margin-top: 10px;
    width: 100%;
    height: 124px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #f9f9f9;
}
.video video {
    width: 100%;
    height: auto;
}
.video .lb {
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    background-color: rgba(255,255,255,0.8);
}
.btn_start,
.btn_stop {
    margin-top: 15px;
}


/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>