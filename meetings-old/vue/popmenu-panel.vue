<template>
    <transition name="fade">
	<div id='popmenu_panel' v-show='popmenuPanelVisible' v-bind:style='{width:width, right:right}'  >
        <div class='triangle'></div>
        <div class='wrap'>
            <div class='itm menuitm itm_plist' v-on:click.stop='togglePlist' v-bind:class='{selected:plistPanelVisible}' >
                <div class='icobtn' v-bind:class='{selected:plistPanelVisible}' >
                    <span></span>
                    <svg-ico-plist></svg-ico-plist>
                    <span></span>
                </div>
                <span class="lb">Participants</span>
            </div>

            <div class='itm menuitm itm_chat' v-on:click.stop='toggleChat' v-bind:class='{selected:chatPanelVisible}' >
                <div class='icobtn' v-bind:class='{selected:chatPanelVisible}' >
                    <span></span>
                    <svg-ico-chat></svg-ico-chat>
                    <span></span>
                </div>
                <span class="lb">Chat</span>
            </div>

            <div class='itm menuitm itm_notes' v-on:click.stop='toggleNotes' v-bind:class='{selected:notesPanelVisible}' >
                <div class='icobtn' v-bind:class='{selected:notesPanelVisible}' >
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
            
            <div class='itm menuitm itm_restore'>
                <span class="lb lb2">Restore Layout</span>
            </div>

            <div class='itm menuitm itm_hide_panel' v-on:click.stop='hidePanels'>
                <span class="lb lb2">Hide Panels</span>
            </div>

            <div class='itm menuitm itm_mg_panel'>
                <span class="lb lb2">Manage Panels...</span>
            </div>
        </div>
        
    </div>
    </transition>
</template>

<script>

export default {
    data() {
        return {
        	right:'0px',
            width:'196px',
        }
    },
    computed:{
        hasOpenPanel(){
            return this.$store.state.plistPanelVisible || this.$store.state.chatPanelVisible || this.$store.state.notesPanelVisible;
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        headerHeight(){
            return this.$store.state.headerHeight;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
        popmenuPanelVisible(){
            return this.$store.state.popmenuPanelVisible;
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
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        rightPanelContentWidth(){
            return this.$store.state.rightPanelContentWidth;
        },
    },
    mounted(){
        
    },
    watch: {
        popmenuPanelVisible: function (newVal) {
            if(newVal){
                let rpw = this.panelVisible || this.videoLayoutMode == 'side-by-side' ? this.rightPanelContentWidth : 0;
                this.right = (rpw+32/2+15-Number(this.width.substr(0,this.width.length-2))/2)+'px';
                if(this.fullscreen){
                    $('#popmenu_panel').css('top', '60px');
                }else{
                    $('#popmenu_panel').css('top', (this.headerHeight+60)+'px');
                } 
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods:{
        togglePlist(evt){
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('plistPanelVisible', !this.plistPanelVisible);
            if(!this.panelVisible && this.hasOpenPanel){
                this.$store.commit('panelVisible', true);
            }else if(this.panelVisible && !this.hasOpenPanel){
                this.$store.commit('panelVisible', false);
            }
        },
        toggleChat(evt){
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('chatPanelVisible', !this.chatPanelVisible);
            if(!this.panelVisible && this.hasOpenPanel){
                this.$store.commit('panelVisible', true);
            }else if(this.panelVisible && !this.hasOpenPanel){
                this.$store.commit('panelVisible', false);
            }
        },
        toggleNotes(evt){
            
        },
        hidePanels(evt){
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('panelVisible', false);
        },
        onMouseDown(evt){
            if( !$('.btn_panel').hitTest(evt.pageX, evt.pageY) && $('#popmenu_panel').length && !$('#popmenu_panel').hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popmenuPanelVisible', false);
            }
        }
    }

}
</script>

<style scoped>
#popmenu_panel {
    transition: all 0.2s ease-out;
    position: absolute;
    height: 361px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    width: 48px;
    height: 19px;
    top: -19px;
    right: 74px; 
    background: url(../img/pop_triangle_up.svg) no-repeat 0 0;
}
.wrap{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
}
.itm{
    width: 100%;
    min-height: 40px;
    padding-left: 15px;
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
    line-height: 100%;
    pointer-events: none;
}
.itm .lb2{
    line-height: 40px;
}
.itm.selected .icobtn{
    background-color: #049FD9;
}
.itm.selected .lb{
    color: #049FD9;
}
.spline {
    border-bottom: 1px solid rgba(0,0,0,0.08);
}
.itm.selected .lb{
    color: #049FD9;
}
.itm.selected .icobtn{
    background-color: #049FD9;
}

/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>