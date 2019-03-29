<template>
	<div id='self_video' v-show='cameraOn && videoConnected' v-on:mousemove='mousemove' v-bind:class='{min:minimized}' >
        <video id="camera" autoplay="true" ></video>
        <div class='btn_minimize' v-tooltip.hover.click.bottom='minimized ? "Restore this Window" : "Minimize Selfvideo (Other will continue to see my video)"' v-on:click.stop='toggleMinimize' v-bind:class='{min:minimized}'></div>
    </div>
</template>

<script>

const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

export default {
    data(){
        return  {
            domVideo: null,
            domParent: null,
            domCon: null,
            minimized: false,
        };
    },
    computed:{
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        cameraOn(){
            return this.$store.state.cameraOn;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        headerHeight(){
            return this.$store.state.headerHeight;
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        activeSpeaker(){
            return this.$store.getters.activeSpeaker;
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
        floatVideoSize(){
            return this.$store.state.floatVideoSize;
        },
        videoConnected(){
            return this.$store.state.videoConnected;
        },
    },
	mounted(){
        this.domVideo = $('#self_video');
        this.domParent = $('#con_main');
        this.domCon = $('#con_left');
        this.initCam();
        this.initDrag();
        window.addEventListener('resize', this.onResize);        
    },
    watch: {
        panelVisible (newVal) {
            this.onResize();
        },
        rightPanelWidth (newVal) {
            this.onResize();
        },
        videoLayoutMode (newVal) {
            if(newVal != 'side-by-side'){
                this.onResize();
            }
        },
        floatVideoSize (newVal) {
            this.onResize();
        },
        videoConnected (newVal) {
            this.moveToCorner(false, 'BR');
        },
        fullscreen (newVal){
            let cnt = 0;
            let itv = setInterval(()=>{
                cnt++;
                this.onResize();
                if(cnt >= 100){
                    clearInterval(itv);
                }
            },10);
        },
    },
	methods:{
        initCam(){
            var selfViewVideo = document.getElementById('camera');
            
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
        initDrag(){
            // self video draggable
            let ww = !this.minimized ? this.domVideo.width() : 20;
            let wh = !this.minimized ? this.domVideo.height() : 20;

            let offset = this.domParent.offset();
            let panew = this.domParent.width() //this.chatPanelVisible ? (this.domParent.width()-this.rightPanelWidth) : this.domParent.width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew-ww-marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + this.domCon.height()-wh-marginBottom;
            $('#self_video').draggable({ 
                stack: '.floating_window',
                containment: [x1,y1,x2,y2],
                start: ()=>{},
                drag: ()=>{},
                stop: ()=>{this.moveToCorner(true)}
            });
        },
        onResize(){
            this.initDrag();
            this.moveToCorner();
        },
        moveToCorner(animated=false, corner=null){
            if($('#self_video').hasClass('fixedPosition')){
                return;
            }
            let ww = !this.minimized ? this.domVideo.width() : 20;
            let wh = !this.minimized ? this.domVideo.height() : 20;

            let ox = this.domVideo.position().left + ww/2;
            let oy = this.domVideo.position().top + wh/2;
            let panew = this.domParent.width() //this.chatPanelVisible ? (this.domParent.width()-this.rightPanelWidth) : this.domParent.width();
            let pox = panew/2;
            let poy = this.domCon.height()/2;
            let top, left;
            if(corner == 'TL' || corner === null && ox <= pox && oy <= poy){
                // TL
                top = marginTop;
                left = marginX;
            }else if(corner == 'TR' || corner === null && ox > pox && oy <= poy){
                // TR
                top = marginTop;
                left = panew-ww-marginX;
            }else if(corner == 'BR' || corner === null && ox > pox && oy > poy){
                // BR
                top = this.domCon.height()-wh-marginBottom;
                left = panew-ww-marginX;
            }else if(corner == 'BL' || corner === null && ox <= pox && oy > poy){
                // BL
                top = this.domCon.height()-wh-marginBottom;
                left = marginX;
            }
            
            if(animated){
                this.domVideo.velocity({ left:left, top:top }, { duration: 150 });
            }else{
                this.domVideo.css('left', left+'px');
                this.domVideo.css('top', top+'px');
            }
        },
        mousemove(evt){
            $('.btn_minimize').show();
            window.addEventListener('mousemove', this.globalMousemove);
        },
        globalMousemove(evt){
            if( !$('#self_video').hitTest(evt.pageX, evt.pageY) ){
                $('.btn_minimize').hide();
                window.removeEventListener('mousemove', this.globalMousemove);
            }
            
        },
        toggleMinimize(evt){
            if(this.minimized){
                this.minimized = false
                setTimeout(()=>{
                    this.initDrag();
                    this.moveToCorner(true, 'BR');
                },10);
                
            }else{
                this.minimized = true
                this.initDrag();
                this.moveToCorner(true, 'BR');
            }
            
        },
	}

}
</script>

<style>

.fixedPosition {
    pointer-events: none;
    border-radius: 3px !important;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.3) !important;
}

</style>

<style scoped>

#self_video {
    position: absolute;
    width: 120px;
    height: 68px;
    border-radius: 6px;
    overflow: hidden;
    transform: rotate(0deg);
    background-color: #FFF;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.3), 0px 0px 8px rgba(0,0,0,0.1);
}
#self_video.min {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}
#self_video.min video{
    display: none;
}

#camera {
    position: absolute; 
    left:0; 
    top:0; 
    width:100%;
    height:auto; 
}


.btn_minimize {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 1px rgba(0,0,0,0.3);
    border-radius: 10px;
    pointer-events: auto;
    cursor: pointer;
    background: url(../img/icon/ico_min_self.svg) no-repeat center;
    display: none;
    background-color: #FFF;
}
.btn_minimize.min {
    top: 0;
    left: 0;
    box-shadow: 0 0 0 rgba(0,0,0,0);
    border-radius: 0px;
    background: url(../img/icon/ico_restore_self.svg) no-repeat center;
    display: block !important;
}



</style>