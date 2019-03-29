<template>
    <div id='plist_panel' class='con_flex_column' v-bind:class='{flex_none: flexNone, flex_1: !flexNone}' v-show='plistPanelVisible' >
        <panel-header class='flex_none' v-bind:title='title' v-bind:type='"plist"' v-on:close='close' v-on:collapse='collapse' ></panel-header>
        <div class='scrollpane flex_1' v-show='!plistPanelClsed' >
            <div class='list'>
                <plist-item 
                    v-for='(p, index) in peopleList' 
                    v-bind:key='index' 
                    v-bind:name='p.name' 
                    v-bind:me='p.me' 
                    v-bind:host='p.host' 
                    v-bind:avatar='p.avatar' 
                    v-bind:video='p.video' 
                    v-bind:audio='p.audio' 
                    v-bind:muted='p.muted' 
                ></plist-item>
            </div>
        </div>
    </div>
</template>

<script>

const marginX = 15;
const marginTop = 60;
const marginBottom = 14;

export default {
    props:[
        'floating',
    ],
    data() {
        return {
            title: 'Participants',
        }
    },
    computed:{
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        plistPanelVisible(){
            return this.$store.state.plistPanelVisible;
        },
        plistPanelClsed(){
            return this.$store.state.plistPanelClsed;
        },
        peopleList(){
            return this.$store.state.peopleList;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        flexNone(){
            return this.plistPanelClsed;
        },
    },
    mounted(){

        $('#plist_panel .scrollpane').niceScroll({
            cursorwidth: "7px",
            cursorcolor:"rgba(0,0,0,0.5)",
            cursorborder:"2px solid rgba(255,255,255,0)"
        });

        this.initDrag();

         if(this.floating){
            $('#floating_plist').resizable({
                handles: "all",
                maxHeight: 550,
                maxWidth: 550,
                minHeight: 200,
                minWidth: 200,
                resize: ()=>{this.onResize();},
                stop: ()=>{this.onResize();}
            });
        }

        window.addEventListener('resize', this.onResize);
    },
    watch: {
        plistPanelVisible(newVal){
            // set scrollbar style
            setTimeout(()=>{this.onResize();}, 10);
        },
        rightPanelWidth(newVal){
            this.onResize();
        },
        videoLayoutMode(newVal){
            setTimeout(()=>{this.onResize();}, 10);
        },
        chatPanelVisible(newVal){
            setTimeout(()=>{this.onResize();}, 10);
        },
        plistPanelClsed(newVal){
            if(newVal){
                $('#plist_panel').removeClass('flex_1')
            }else{
                $('#plist_panel').addClass('flex_1')
            }
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
        close(){
            this.$store.commit('plistPanelVisible', false);
        },
        collapse(){
            this.$store.commit('plistPanelClsed', !this.plistPanelClsed);
        },
        onResize(){
            if(this.plistPanelVisible){
                $('#plist_panel .scrollpane').getNiceScroll().resize();
                this.initDrag();
            }
        },
        initDrag(){
            if(!this.floating){
                return;
            }
            // self video draggable
            let ww = $('#floating_plist').width();
            let wh = $('#floating_plist').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew-ww-marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height()-wh-marginBottom;
            $('#floating_plist').draggable({ 
                stack: '.floating_window',
                containment: [x1,y1,x2,y2],
                start: ()=>{},
                drag: ()=>{},
                stop: ()=>{}
            });
        },
    }
}
</script>


<style scoped>
#plist_panel {
    width: 100%;
    background-color: #FFF;
    pointer-events: auto;
}
.scrollpane {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
.list {
    width: 100%;
}
</style>