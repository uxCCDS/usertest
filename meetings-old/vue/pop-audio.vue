<template>
    <transition name="fade">
	<div id='pop_audio' v-show='popAudioVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Audio and Video Connection</div>

            <div class='itm menuitm con_flex_row btn_callme' v-on:click='connectAudio' >
                <div class='ico flex_none'></div>
                <div class='colr flex_1'>
                    <div class='lb'>Call Me</div>
                    <div class='sub'>1-4080-555-1234</div>
                    <div class='link'>Change settings</div>
                    <span></span>
                </div>
            </div>

            <div class='itm menuitm con_flex_row btn_callin' v-on:click='connectAudio' >
                <div class='ico flex_none'></div>
                <div class='colr flex_1'>
                    <div class='lb'>I Will Call In</div>
                    <span></span>
                </div>
            </div>

            <div class='itm menuitm con_flex_row btn_pc' v-on:click='connectAudio' >
                <div class='ico flex_none'></div>
                <div class='colr flex_1'>
                    <div class='lb'>Call Using Computer</div>
                    <div class='link'>Change settings</div>
                </div>
            </div>

            <div class='itm menuitm con_flex_row btn_callvs' v-on:click='connectAudio' >
                <div class='ico flex_none'></div>
                <div class='colr flex_1'>
                    <div class='lb'>Call My Video System</div>
                </div>
            </div>   

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
        popAudioVisible(){
            return this.$store.state.popAudioVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_audio');
    },
    watch: {
        popAudioVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_audio').css('left', left+'px');
                $('#pop_audio').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },

    },
    methods:{
        onMouseDown(evt){
            if( ($('#controls .btn_audio').length>0 && !$('#controls .btn_audio').hitTest(evt.pageX, evt.pageY) || $('#controls .btn_mute').length>0 && !$('#controls .btn_mute').hitTest(evt.pageX, evt.pageY)) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY) ){
                this.close();
            }
        },
        connectAudio(evt){
            this.$store.commit('audioConnected', true); 
            this.close();
        },
        close(evt){
           this.$store.commit('popAudioVisible', false); 
        }
    }

}
</script>

<style scoped>
#pop_audio {
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
    height: 32px;
    width: 100%;
    line-height: 32px;
}
.itm {
    height: 72px;
    width: 100%;
}
.itm .ico{
    height: 100%;
    width: 66px;
    vertical-align: middle;
}
.btn_callme .ico{
    background: url(../img/icon/ico_audio_callme.svg) no-repeat center center;
}
.btn_callin .ico{
    background: url(../img/icon/ico_audio_callin.svg) no-repeat center center;
}
.btn_pc .ico{
    background: url(../img/icon/ico_audio_pc.svg) no-repeat center center;
}
.btn_callvs .ico{
    background: url(../img/icon/ico_audio_callvs.svg) no-repeat center center;
}
.itm .lb{
    font-size: 14px;
}
.itm .sub{
    font-size: 12px;
    color: #4F5051;
}
.itm .link{
    font-size: 12px;
    color: #049FD9;
}
.btn_callme .lb{
    margin-top: 10px;
}
.btn_callin .lb{
    line-height: 72px;
}
.btn_pc .lb{
    margin-top: 16px;
}
.btn_callvs .lb{
    line-height: 72px;
}



/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>