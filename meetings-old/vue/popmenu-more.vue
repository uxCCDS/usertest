<template>
    <transition name="fade">
	<div id='popmenu_more' v-show='popmenuMoreVisible' >
        <div class='triangle'></div>
        <div class='wrap'>

            <div class='itm menuitm itm_notes' >
                <div class='icobtn' >
                    <span></span>
                    <svg-ico-notes></svg-ico-notes>
                    <span></span>
                </div>
                <span class="lb">Notes</span>
            </div>

            <div class='itm menuitm itm_polling '>
                <div class='icobtn'>
                    <span></span>
                    <svg-ico-polling></svg-ico-polling>
                    <span></span>
                </div>
                <span class="lb">Polling</span>
            </div>

            <div class='itm menuitm itm_viewer spline'>
                <div class='icobtn'>
                    <span></span>
                    <svg-ico-multimedia></svg-ico-multimedia>
                    <span></span>
                </div>
                <span class="lb">Multimedia Viewer</span>
            </div>

            <div class='itm menuitm' v-on:click.stop='toggleLock' >
                <span class="lb" v-show='!locked' >Lock Room</span>
                <span class="lb" v-show='locked' >Unlock Room</span>
                <span class="ico ico_lock" v-show='locked'></span>
            </div>

            <div class='itm menuitm' >
                <span class="lb">Invite and Remind</span>
            </div>

            <div class='itm menuitm' >
                <span class="lb">Copy Meeting URL</span>
            </div>

            <div class='itm menuitm' v-on:click.stop='showAudioConnection' >
                <span class="lb">Audio Connection</span>
            </div>

        </div>
        
    </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed:{
        popmenuMoreVisible(){
            return this.$store.state.popmenuMoreVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        locked(){
            return this.$store.state.locked;
        },
    },
    mounted(){
        
    },
    watch: {
        popmenuMoreVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#popmenu_more').css('left', left+'px');
                $('#popmenu_more').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods:{
        showAudioConnection(evt){

            let appos = $('#mainclient').offset();
            let btn;
            if($('#controls .btn_audio').length > 0){
                btn = $('#controls .btn_audio');
            }else{
                btn = $('#controls .btn_mute');
            }
            let offset = btn.offset();
            let left = offset.left - appos.left + btn.width()/2;
            let top = offset.top- appos.top;
            this.$store.commit('popStartPoint', [left, top]);
            //this.$store.commit('popAVConnectionVisible', true);
            this.$store.commit('popAudioVisible', true);

            this.$store.commit('popmenuMoreVisible', false);
        },
        onMouseDown(evt){
            if( !$('#controls .btn_more').hitTest(evt.pageX, evt.pageY) && $('#popmenu_more').length && !$('#popmenu_more').hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popmenuMoreVisible', false);
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

            /*
            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_lock').offset();
            let left = offset.left - appos.left + $('#controls .btn_lock').width()/2;
            let top = offset.top- appos.top;

            this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('poptipVisible', true);
            */

            //this.$store.commit('popmenuMoreVisible', false);
        },
    }

}
</script>

<style scoped>
#popmenu_more {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 196px;
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
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
}
.itm{
    width: 100%;
    min-height: 40px;
    padding-left: 13px;
    cursor: pointer;
}
.icobtn{
    display: inline-block;
    width: 36px;
    height: 36px;
    margin: 6px 10px 6px 0;
    background-color: rgba(41,41,41,0.08);
    border-radius: 18px;
    cursor: pointer;
    text-align: center;
    pointer-events: none;
}
.icobtn svg{
    pointer-events: none;
    display: inline-block;
    vertical-align: middle;
}
.icobtn span{
    pointer-events: none;
    display: inline-block;
    height: 100%;
    width: 0px;
    vertical-align: middle;
}
.itm .lb{
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    pointer-events: none;
}
.itm .ico{
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    top: 12px;
    right: 28px;
    background-repeat: no-repeat;
    background-position: center;
}
.ico_lock {
    background-image: url(../img/icon/ico_sts_lock.svg);
}
.spline {
    border-bottom: 1px solid rgba(0,0,0,0.08);
}


/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>