<template>
    <div id="con_panel">
        <div class="wrap con_flex_column" v-bind:style='{width:contentWidth}'>
            <div class='video_area'></div>
            <panel-plist></panel-plist>
            <panel-chat></panel-chat>
            <div class='whitebot' v-if='anyOpenPanel' v-bind:class='{flex_none: hasOtherOpenPanel, flex_1: !hasOtherOpenPanel}' ></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    computed:{
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        videoLayoutPrepareMode(){
            return this.$store.state.videoLayoutPrepareMode;
        },
        contentWidth(){
            return this.$store.state.rightPanelContentWidth+'px';
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        rightPanelContentWidth(){
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        anyOpenPanel(){
            return this.$store.getters.anyOpenPanel;
        },
        plistPanelVisible(){
            return this.$store.state.plistPanelVisible;
        },
        plistPanelClsed(){
            return this.$store.state.plistPanelClsed;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        chatPanelClsed(){
            return this.$store.state.chatPanelClsed;
        },
        hasOtherOpenPanel(){
            return this.plistPanelVisible && !this.plistPanelClsed || this.chatPanelVisible && !this.chatPanelClsed;
        },
    },
    mounted(){
        
    },
    watch: {
        panelVisible (newVal) {

            let conwidth = this.rightPanelContentWidth;
            let endw;
            if(this.panelVisible){
                endw = conwidth;
            }else{
                endw = 0;
            }

            if(this.panelVisible){
                
                $('#con_panel').velocity({ 
                    width: endw,
                    //scale: 1,
                }, { 
                    duration: 0,
                    queue: false,
                    progress: (elements, complete, remaining, start, tweenValue) => {
                        this.$store.commit('rightPanelWidth', this.panelVisible ? conwidth*complete : conwidth*(1-complete));
                    },
                    complete: elements => { 
                        this.$store.commit('rightPanelWidth', endw);
                    }
                });

            }else{

                let right = this.videoLayoutMode != 'side-by-side' ? 30 : (conwidth+30);

                $('#con_panel').velocity({
                    width: 0,
                    //scale: 0,
                    height: '0%',
                    top: 26,
                    right: right
                }, { 
                    duration: 0,
                    queue: false,
                    progress: (elements, complete, remaining, start, tweenValue) => {
                        this.$store.commit('rightPanelWidth', this.panelVisible ? conwidth*complete : conwidth*(1-complete));
                    },
                    complete: elements => { 
                        this.$store.commit('rightPanelWidth', endw);
                        //$('#con_panel').css('transform', 'scale(1)');
                        $('#con_panel').css('width', 0);
                        $('#con_panel').css('height', '100%');
                        $('#con_panel').css('top', 0);
                        $('#con_panel').css('right', 0);
                        //$('#con_panel').attr('style', '');
                    }
                });

            }
            
        },
        rightPanelContentWidth (newVal){
            $('#con_panel').css('width', newVal+'px');
        },
        fullscreen (newVal) {
            if(newVal){
                this.$store.commit('panelVisible', false);
            }
            if(this.anyOpenPanel && !newVal){
                this.$store.commit('panelVisible', true);
            }
            let cnt = 0;
            let itv = setInterval(()=>{
                cnt++;
                this.layout(10);
                if(cnt >= 50){
                    clearInterval(itv);
                }
            },10);
        },
        anyOpenPanel(newVal){
            if(!newVal){
                this.$store.commit('panelVisible', false);
            }
        },
        videoLayoutPrepareMode (newVal) {
            this.layout();
        },
        rightPanelWidth (newVal) {
            this.layout(0);
        },
    },
    methods:{
        layout(duration = 300) {
            let righth = $('#con_panel').height();
            let panelh = 0;
            if(this.videoLayoutPrepareMode == 'side-by-side'){
                let h = this.rightPanelWidth/16*9+1;
                $('#con_panel .video_area').velocity({ height:h }, { duration: duration, queue: false });
                //$('#con_panel .video_area').css('height', h);
                panelh = righth - h;
            }else{
                $('#con_panel .video_area').velocity({ height:0 }, { duration: duration, queue: false });
                //$('#con_panel .video_area').css('height', 0);
                panelh = righth;
            }

            if(panelh < 300){
                if(this.plistPanelVisible){
                    this.$store.commit('plistPanelClsed', true);
                }
            }


        }
    }
}
</script>

<style scoped>
#con_panel{
    position: absolute;
    height: 100%; 
    width: 0px; 
    top: 0;
    right: 0;
    overflow: hidden;
    pointer-events: none;
}
.wrap {
    position: absolute;
    height: 100%;
}
.video_area {
    width: 100%;
    height: 0;
}
.whitebot {
    width: 100%;
    background-color: #FFF;
}
</style>