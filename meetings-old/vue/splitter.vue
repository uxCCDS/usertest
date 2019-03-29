<template>
    <div id="splitter" class='flex_none' v-show='panelVisible || videoLayoutMode=="side-by-side"' ></div>
</template>

<script>

export default {
    data() {
        return {
            domParent: null,
            domSpl: null,
        }
    },
    computed:{
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        rightPanelContentWidth(){
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        rightPanelMinWidth(){
            return this.$store.state.rightPanelMinWidth;
        },
        rightPanelMaxWidth(){
            return this.$store.state.rightPanelMaxWidth;
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSpl = $('#splitter');
        this.initDrag();
        window.addEventListener('resize', this.onResize);
    },
    watch: {
        panelVisible (newVal) {
            if(newVal){
                let left = this.domParent.width() - this.rightPanelContentWidth;
                this.domSpl.css('left', left+'px');
            }
        },
        videoLayoutMode (newVal) {
            this.initDrag();
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
    },
    methods:{
        initDrag(){
            // self video draggable

            let offset = this.domParent.offset();
            let x1 = offset.left+this.domParent.width()-this.rightPanelMaxWidth;
            let x2 = offset.left+this.domParent.width()-this.rightPanelMinWidth;
            let y1 = offset.top;
            let y2 = offset.top;

            $('#splitter').css('left', this.domParent.width()-this.rightPanelContentWidth-2);
            $('#splitter').draggable({ 
                containment: [x1,y1,x2,y2],
                start: ()=>{
                    $('body').css('cursor', 'col-resize');
                },
                drag: ()=>{
                    let width = this.domParent.width() - this.domSpl.position().left;
                    this.$store.commit('rightPanelContentWidth', width); 
                    this.$store.commit('rightPanelWidth', width); 
                },
                stop: ()=>{
                    $('body').css('cursor', 'default');
                }
            });
            
        },
        onResize(){
            this.initDrag();
        },
    }
}
</script>

<style scoped>
#splitter{
    position: absolute;
    background-color: rgba(0,0,0,0);
    cursor: col-resize;
    z-index:900;
    width: 4px;
    height: 100%;
}

#splitter:hover,
#splitter:active {
}
</style>
