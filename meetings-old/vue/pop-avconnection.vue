<template>
    <transition name="fade">
	<div id='pop_ac_connection' v-show='popAVConnectionVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Audio and Video Connection</div>
            <div class='img'>



                    
                <svg width="508px" height="279px" viewBox="0 0 508 279" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 49.1 (51147) - http://www.bohemiancoding.com/sketch -->
                    <desc>Created with Sketch.</desc>
                    <defs>
                        <rect id="path-1" x="0" y="0" width="230" height="196" rx="4"></rect>
                    </defs>
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="audio-section" transform="translate(0.000000, -2.000000)">
                            <g>
                                <g id="dropdown" transform="translate(0.000000, 37.000000)">
                                    <rect id="bg" stroke="#D7D7D8" x="0.5" y="0.5" width="229" height="31" rx="4"></rect>
                                    <g id="arrow-down_12" transform="translate(206.000000, 10.000000)">
                                        <rect id="bound" x="0" y="0" width="12" height="12"></rect>
                                        <g id="icon" transform="translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)" fill="#343537">
                                            <path d="M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959" id="fill" transform="translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "></path>
                                        </g>
                                    </g>
                                    <text id="label" font-family="SegoeUI, Segoe UI" font-size="14" font-weight="normal" fill="#292929">
                                        <tspan x="12" y="21">Call Using Computer</tspan>
                                    </text>
                                </g>
                                <g id="call-in-info" transform="translate(0.000000, 85.000000)">
                                    <mask id="mask-2" fill="white">
                                        <use xlink:href="#path-1"></use>
                                    </mask>
                                    <rect stroke="#D7D7D8" x="0.5" y="0.5" width="229" height="195" rx="4"></rect>
                                    <g id="info" mask="url(#mask-2)">
                                        <g transform="translate(1.000000, 12.000000)">
                                            <text id="Speaker:" font-family="SegoeUI-SemiBold, Segoe UI" font-size="12" font-weight="500">
                                                <tspan x="11" y="13" fill="#292929">Speaker:</tspan>
                                            </text>
                                            <g id="dropdown" stroke-width="1" fill-rule="evenodd" transform="translate(11.000000, 24.000000)">
                                                <rect id="bg" stroke="#D7D7D8" x="0.5" y="0.5" width="205" height="31" rx="4"></rect>
                                                <g id="arrow-down_12" transform="translate(182.000000, 10.000000)">
                                                    <rect id="bound" x="0" y="0" width="12" height="12"></rect>
                                                    <g id="icon" transform="translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)" fill="#343537">
                                                        <path d="M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959" id="fill" transform="translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "></path>
                                                    </g>
                                                </g>
                                                <text id="label" font-family="SegoeUI, Segoe UI" font-size="14" font-weight="normal" fill="#292929">
                                                    <tspan x="12" y="21">Device Name</tspan>
                                                </text>
                                            </g>
                                            <text id="Microphone:" font-family="SegoeUI-SemiBold, Segoe UI" font-size="12" font-weight="500">
                                                <tspan x="11" y="85" fill="#292929">Microphone:</tspan>
                                            </text>
                                            <g id="dropdown" stroke-width="1" fill-rule="evenodd" transform="translate(11.000000, 96.000000)">
                                                <rect id="bg" stroke="#D7D7D8" x="0.5" y="0.5" width="205" height="31" rx="4"></rect>
                                                <g id="arrow-down_12" transform="translate(182.000000, 10.000000)">
                                                    <rect id="bound" x="0" y="0" width="12" height="12"></rect>
                                                    <g id="icon" transform="translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)" fill="#343537">
                                                        <path d="M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959" id="fill" transform="translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "></path>
                                                    </g>
                                                </g>
                                                <text id="label" font-family="SegoeUI, Segoe UI" font-size="14" font-weight="normal" fill="#292929">
                                                    <tspan x="12" y="21">Device Name</tspan>
                                                </text>
                                            </g>
                                            <g id="more-settings" stroke-width="1" fill-rule="evenodd" transform="translate(0.000000, 136.000000)">
                                                <rect id="Rectangle-10" x="0" y="0" width="228" height="36"></rect>
                                                <text id="More-Settings" font-family="SegoeUI, Segoe UI" font-size="14" font-weight="normal" fill="#049FD9">
                                                    <tspan x="12" y="23">More Settings</tspan>
                                                </text>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                                <g id="label" transform="translate(36.000000, 0.000000)">
                                    <g id="Group" transform="translate(24.000000, 0.000000)" fill="#343537" font-family="SegoeUI-SemiBold, Segoe UI" font-size="12" font-weight="500">
                                        <text id="Select-Audio-Connect">
                                            <tspan x="0" y="13">Select Audio Connection</tspan>
                                        </text>
                                    </g>
                                    <g id="handset_16" transform="translate(0.000000, 1.000000)">
                                        <rect id="bound" x="0" y="0" width="16" height="16"></rect>
                                        <g id="icon" transform="translate(1.000000, 1.000000)" fill="#292929">
                                            <path d="M1.65186929,1 C1.44886929,1 1.25986929,1.092 1.13486929,1.252 C1.01386929,1.409 0.971869286,1.608 1.01986929,1.798 C1.57186929,3.971 3.14486929,6.474 5.33686929,8.665 C7.52686929,10.855 10.0288693,12.428 12.2018693,12.98 C12.3928693,13.027 12.5918693,12.986 12.7488693,12.864 C12.9088693,12.74 13.0008693,12.552 13.0008693,12.349 L13.0008693,10.849 C13.0008693,10.437 12.7558693,10.066 12.3788693,9.904 L11.0608693,9.337 C10.6788693,9.173 10.2438693,9.185 9.87186929,9.372 L9.12186929,9.747 C8.67986929,9.966 8.14386929,9.909 7.75886929,9.598 C6.46386929,8.559 5.23386929,7.336 4.38386929,6.244 C4.08486929,5.859 4.02986929,5.329 4.24686929,4.894 L4.62986929,4.128 C4.81586929,3.756 4.82886929,3.323 4.66386929,2.94 L4.09686929,1.622 C3.93386929,1.244 3.56286929,1 3.15186929,1 L1.65186929,1 Z M12.3598693,14 C12.2248693,14 12.0898693,13.983 11.9558693,13.95 C9.61286929,13.354 6.94286929,11.686 4.62986929,9.372 C2.31386929,7.057 0.645869286,4.387 0.0508692858,2.044 C-0.0741307142,1.553 0.0338692858,1.041 0.345869286,0.639 C0.661869286,0.233 1.13786929,0 1.65186929,0 L3.15186929,0 C3.96386929,0 4.69486929,0.482 5.01486929,1.228 L5.58186929,2.545 C5.86386929,3.199 5.84186929,3.939 5.52386929,4.576 L5.14086929,5.341 C5.09486929,5.434 5.10686929,5.544 5.17286929,5.629 C5.96486929,6.648 7.16686929,7.84 8.38486929,8.818 C8.46986929,8.887 8.58186929,8.899 8.67386929,8.852 L9.42386929,8.477 C10.0608693,8.16 10.7998693,8.138 11.4558693,8.418 L12.7728693,8.985 C13.5188693,9.305 14.0008693,10.037 14.0008693,10.849 L14.0008693,12.349 C14.0008693,12.863 13.7678693,13.338 13.3628693,13.654 C13.0698693,13.881 12.7188693,14 12.3598693,14 L12.3598693,14 Z" id="fill"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g id="video-section" transform="translate(278.000000, 0.000000)">
                                <g id="dropdown" transform="translate(0.000000, 37.000000)">
                                    <rect id="bg" stroke="#D7D7D8" x="0.5" y="0.5" width="229" height="31" rx="4"></rect>
                                    <g id="arrow-down_12" transform="translate(206.000000, 10.000000)">
                                        <rect id="bound" x="0" y="0" width="12" height="12"></rect>
                                        <g id="icon" transform="translate(6.000000, 6.000000) scale(1, -1) rotate(90.000000) translate(-6.000000, -6.000000) translate(3.000000, 1.000000)" fill="#343537">
                                            <path d="M0.500700764,9.99959 C0.363700764,9.99959 0.227700764,9.94359 0.128700764,9.83459 C-0.0562992361,9.62859 -0.0392992361,9.31259 0.165700764,9.12759 L4.75270076,4.99959 L0.165700764,0.87159 C-0.0392992361,0.68659 -0.0562992361,0.37059 0.128700764,0.16459 C0.313700764,-0.03941 0.629700764,-0.05641 0.834700764,0.12759 L5.83470076,4.62759 C5.94070076,4.72359 6.00070076,4.85759 6.00070076,4.99959 C6.00070076,5.14159 5.94070076,5.27559 5.83470076,5.37159 L0.834700764,9.87159 C0.739700764,9.95759 0.619700764,9.99959 0.500700764,9.99959" id="fill" transform="translate(3.000476, 4.999738) scale(-1, 1) translate(-3.000476, -4.999738) "></path>
                                        </g>
                                    </g>
                                    <text id="label" font-family="SegoeUI, Segoe UI" font-size="14" font-weight="normal" fill="#292929">
                                        <tspan x="12" y="21">Microsoft LifeCam Font</tspan>
                                    </text>
                                </g>
                                <g id="label" transform="translate(37.000000, 0.000000)">
                                    <g id="Group" transform="translate(24.000000, 0.000000)" fill="#343537" font-family="SegoeUI-SemiBold, Segoe UI" font-size="12" font-weight="500">
                                        <text id="Select-Video-Connect">
                                            <tspan x="0" y="13">Select Video Connection</tspan>
                                        </text>
                                    </g>
                                    <g id="camera_16" transform="translate(0.000000, 1.000000)">
                                        <g id="icon">
                                            <rect id="bound" x="0" y="0" width="16" height="16"></rect>
                                            <path d="M15.388,4.088 C15.76,4.241 16,4.602 16,5.003 L16,10.997 C16,11.399 15.76,11.758 15.389,11.911 C15.266,11.963 15.136,11.987 15.008,11.987 C14.752,11.987 14.499,11.888 14.309,11.697 L12.004,9.392 L12,9.379 L12,11.991 C12,13.101 11.098,14 9.992,14 L2.009,14 C0.899,14 -8.8817842e-16,13.098 -8.8817842e-16,11.991 L-8.8817842e-16,4.009 C-8.8817842e-16,2.9 0.902,2 2.009,2 L9.992,2 C11.101,2 12,2.902 12,4.009 L12,6.611 L14.309,4.303 C14.593,4.02 15.016,3.936 15.388,4.088 Z M12.026,8 L15.016,10.99 L15,5.003 L12.026,8 Z M1,11.9914698 C1,12.5469054 1.45267418,13 2.0085302,13 L9.9914698,13 C10.5469054,13 11,12.5473258 11,11.9914698 L11,4.0085302 C11,3.45309463 10.5473258,3 9.9914698,3 L2.0085302,3 C1.45309463,3 1,3.45267418 1,4.0085302 L1,11.9914698 Z" id="fill" fill="#292929"></path>
                                        </g>
                                    </g>
                                </g>
                                <g id="info" transform="translate(0.000000, 220.000000)">
                                    <text id="Your-video-is-not-sh" font-family="SegoeUI, Segoe UI" font-size="12" font-weight="normal" fill="#292929">
                                        <tspan x="0" y="13">Your video is not showing in the meeting </tspan>
                                        <tspan x="0" y="29">yet.</tspan>
                                    </text>
                                    <g id="info_12" transform="translate(23.000000, 19.000000)">
                                        <rect id="bound" x="0" y="0" width="12" height="12"></rect>
                                        <g id="icon" transform="translate(1.000000, 1.000000)" fill="#292929" fill-rule="nonzero">
                                            <path d="M5.5,10 C7.98528137,10 10,7.98528137 10,5.5 C10,3.01471863 7.98528137,1 5.5,1 C3.01471863,1 1,3.01471863 1,5.5 C1,7.98528137 3.01471863,10 5.5,10 Z M5.5,11 C2.46243388,11 0,8.53756612 0,5.5 C0,2.46243388 2.46243388,0 5.5,0 C8.53756612,0 11,2.46243388 11,5.5 C11,8.53756612 8.53756612,11 5.5,11 Z M5.5,4 C5.77614237,4 6,3.77614237 6,3.5 C6,3.22385763 5.77614237,3 5.5,3 C5.22385763,3 5,3.22385763 5,3.5 C5,3.77614237 5.22385763,4 5.5,4 Z M5.5,5 C5.22385763,5 5,5.22385763 5,5.5 L5,7.5 C5,7.77614237 5.22385763,8 5.5,8 C5.77614237,8 6,7.77614237 6,7.5 L6,5.5 C6,5.22385763 5.77614237,5 5.5,5 Z" id="fill"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>



            </div>
            <div class='video'>
                <video id="camera_preview_av" autoplay="true" ></video>
                <div class='lb'>Preview Only</div>
            </div>
            <div class='btn_connect uibutton green' v-on:click.stop='connectAudioVideo' >Connect Audio and Video</div>
        </div>
        
    </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
            timer: null,
            domParent: null,
            domSelf: null,
        }
    },
    computed:{
        popAVConnectionVisible(){
            return this.$store.state.popAVConnectionVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_ac_connection');
        this.initCam();
    },
    watch: {
        popAVConnectionVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_ac_connection').css('left', left+'px');
                $('#pop_ac_connection').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },

    },
    methods:{
        initCam(){
            var selfViewVideo = document.getElementById('camera_preview_av');
            
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
            if( !$('#controls .btn_audio').hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popAVConnectionVisible', false);
            }
        },
        connectAudioVideo(evt){
            this.$store.commit('audioConnected', true);
            this.$store.commit('videoConnected', true);
            this.close();
        },
        close(evt){
           this.$store.commit('popAVConnectionVisible', false); 
        }
    }

}
</script>

<style scoped>
#pop_ac_connection {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 628px;
    height: 460px;
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
    height: 100%;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
}
.img {
    position: absolute;
    height: 390px;
    top: 51px;
    left: 61px;
}
.btn_connect {
    position: absolute;
    width: 282px;
    height: 36px;
    left: calc((100% - 282px)/2);
    bottom: 32px;
}
.close {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 5px;
    right: 5px;
    background: url(../img/icon/ico_panel_x.svg) no-repeat center center;
    pointer-events: auto;
    cursor: pointer;
    z-index: 100;
}
.title {
    text-align: center;
    font-size: 14px;
}
.video {
    position: absolute;
    width: 230px;
    height: 129px;
    left: 339px;
    top: 132px;
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


/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>