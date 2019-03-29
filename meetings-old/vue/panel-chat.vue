<template>
    <div id='chat_panel' class='con_flex_column' v-bind:class='{flex_none: flexNone, flex_1: !flexNone}' v-show='chatPanelVisible' v-bind:style='{height: height}' >
        <panel-header class='flex_none' v-bind:title='title' v-bind:type='"chat"' v-on:close='close' v-on:collapse='collapse' ></panel-header>
        <div class='scrollpane flex_1' v-show='!chatPanelClsed' >
            <div class='list' >
                <chat-item 
                    v-for='(p, index) in chatMsgList' 
                    v-bind:key='index' 
                    v-bind:name='p.name' 
                    v-bind:to='p.to' 
                    v-bind:msg='p.msg' 
                ></chat-item>
            </div>
        </div>
        <div class='inputbox flex_none con_flex_column' v-show='!chatPanelClsed' >
            <div class='selectbox flex_none con_flex_row'><span class='lb flex_none'>To:</span><span class='name flex_1'>Everyone</span><span class='arrow flex_none'></span></div>
            <textarea v-model='message' class='flex_none' placeholder='' v-on:keyup.enter='sendmsg' ></textarea>
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
            title: 'Chat',
            message: '',
        }
    },
    computed:{
        height(){
            if(this.fixHeight && !this.fullscreen){
                return this.videoLayoutMode != 'side-by-side' ? '310px' : '270px';
            }else{
                return 'auto';
            }
            
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        chatPanelClsed(){
            return this.$store.state.chatPanelClsed;
        },
        plistPanelClsed(){
            return this.$store.state.plistPanelClsed;
        },
        fixHeight(){
            return !this.chatPanelClsed && this.$store.state.plistPanelVisible && !this.$store.state.plistPanelClsed && !this.fullscreen;
        },
        flexNone(){
            return this.chatPanelClsed || this.fixHeight;
        },
        peopleList(){
            return this.$store.state.peopleList;
        },
        chatMsgList(){
            return this.$store.state.chatMsgList;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        plistPanelVisible(){
            return this.$store.state.plistPanelVisible;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
    },
    mounted(){

        // set scrollbar style
        $('#chat_panel .scrollpane').niceScroll({
            cursorwidth: "7px",
            cursorcolor:"rgba(0,0,0,0.5)",
            cursorborder:"2px solid rgba(255,255,255,0)"
        });

        this.initDrag();

        if(this.floating){
            $('#floating_chat').resizable({
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
        chatPanelVisible(newVal){
            setTimeout(()=>{this.onResize();}, 10);

            if(newVal){
                // mark all as read
                for(var i in this.chatMsgList){
                    this.chatMsgList[i].unread = false;
                }
                this.$store.commit('chatMsgList', this.chatMsgList);
            }
        },
        rightPanelWidth(newVal){
            this.onResize();
        },
        videoLayoutMode(newVal){
            setTimeout(()=>{this.onResize();}, 10);
        },
        plistPanelVisible(newVal){
            setTimeout(()=>{this.onResize();}, 10);
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
        chatMsgList(newVal){
            setTimeout(()=>{this.onResize();}, 10);
        },
    },
    methods:{
        close(){
            this.$store.commit('chatPanelVisible', false);
        },
        collapse(){
            this.$store.commit('chatPanelClsed', !this.chatPanelClsed);
        },
        onResize(){
            if(this.chatPanelVisible){
                $('#chat_panel .scrollpane').getNiceScroll().resize();
                this.initDrag();
            }
        },
        initDrag(){
            if(!this.floating){
                return;
            }
            // self video draggable
            let ww = $('#floating_chat').width();
            let wh = $('#floating_chat').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew-ww-marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height()-wh-marginBottom;
            $('#floating_chat').draggable({ 
                stack: '.floating_window',
                containment: [x1,y1,x2,y2],
                start: ()=>{},
                drag: ()=>{},
                stop: ()=>{}
            });
        },
        sendmsg(){

        }
    }
}
</script>


<style scoped>
#chat_panel {
    width: 100%;
    font-size: 12px;
    background-color: #FFF;
    pointer-events: auto;
}
.scrollpane {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 30px;
}
.list {
    width: 100%;
    padding-bottom: 10px;
}
.inputbox {
    height: 72px;
    width: 100%;
    border-top: 1px solid rgba(0,0,0,0.08);
}
.selectbox {
    height: 28px;
    width: 100%;
}
.selectbox .lb {
    color: rgba(0,0,0,0.4);
    line-height: 28px;
    padding-left: 15px;
}
.selectbox .name {
    line-height: 28px;
    padding-left: 6px;
}
.selectbox .arrow {
    width: 42px;
    height: 100%;
    background: url(../img/icon/ico_arrow_down.svg) no-repeat center center;
    opacity: 0.8;
}
textarea {
    border: none;
    width: 100%;
    padding: 7px 15px 0 15px;
    resize : none;
    cursor: text;
}

</style>