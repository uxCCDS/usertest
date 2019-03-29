<template>
	<div id="con_main" class='flex_1' v-bind:style='{height:height, backgroundColor:backgroundColor}' >

        <div id='con_left' v-show='currentSharing!==null && !videoSharingSwitched'>
            <div id='sharing_layer' class='con_flex_row' v-show='currentSharing!==null'>
                <div id='annotation_tools' class='flex_none' v-show='currentSharing!==null && annotationToolsVisible'></div>
                <div class='doc flex_1 con_flex_row' v-show='currentSharing=="doc"'>
                    <div class='thumbs flex_none'>
                        <div class='img'></div>
                    </div>
                    <div class='page flex_1'></div>
                </div>
                <div class='screen flex_1' v-show='currentSharing=="screen"'></div>
            </div>
        </div>

        <div id='video_layer' v-show='currentSharing===null || videoLayoutMode!="fullscreen" || videoSharingSwitched ' class='con' >
            <div id='waitingPage' v-if='peopleList.length == 1' ><span>Waiting for others to join</span></div>
            <div id='active_speaker_layer' class='con' v-show='peopleList.length > 1' >
                <video-item 
                    id='active_speaker_video' 
                    v-bind:isBgVideo='true' 
                    v-bind:floatingVideo='false' 
                    v-bind:name='activeSpeaker.name' 
                    v-bind:host='activeSpeaker.host' 
                    v-bind:avatar='activeSpeaker.avatar' 
                    v-bind:video='activeSpeaker.video' 
                    v-bind:audio='activeSpeaker.audio' 
                    v-bind:muted='activeSpeaker.muted' 
                ></video-item>
            </div>
            <div id='video_scrollpane' >
                <div id='video_list'>
                    <video-item 
                        v-for='(p, index) in peopleList' 
                        v-if='!p.me' 
                        v-bind:key='index' 
                        v-bind:name='p.name' 
                        v-bind:host='p.host' 
                        v-bind:avatar='p.avatar' 
                        v-bind:video='p.video' 
                        v-bind:audio='p.audio' 
                        v-bind:muted='p.muted' 
                    ></video-item>
                </div>
            </div>

            <div class='cisco_logo' v-if='currentSharing===null || videoSharingSwitched'></div>
            <div class='top_label' >
                <span class='lb_active_speaker' v-if='(currentSharing===null || videoSharingSwitched) && videoLayoutMode != "grid" && peopleList.length > 1' >{{ topPeopleName }}</span>
                <div v-tooltip.hover.click.bottom='lockedPeopleName===null ? "Lock this video view on a specific participant" : "Unlock this video view"' v-if='(currentSharing===null || videoSharingSwitched) && videoLayoutMode != "grid" && peopleList.length > 1' class='icobtn hudelem ico_lockpeople' v-bind:class='{selected:lockedPeopleName!==null}' v-on:click.stop='toggleLockPeople' >
                    <span></span>
                    <svg-ico-pin></svg-ico-pin>
                    <span></span>
                </div>
                <div v-tooltip.hover.click.bottom='"Recording..."' v-if='fullscreen && recording && (currentSharing===null || videoSharingSwitched)' class='ico_recorder'></div>
            </div>
            <div class='icoset_left'>
                <div class='icobtn' style='opacity:0'>
                    <span></span>
                    <span></span>
                </div>
                <span class='lb_active_speaker' v-if='(currentSharing===null || videoSharingSwitched) && videoLayoutMode != "grid" && peopleList.length > 1 && lockedPeopleName!==null' >Speaking: {{ activeSpeakerName }}</span>
            </div><!--icoset_left-->


            <div id='btn_video_prev' v-show=' videoLayoutMode=="strip" || videoLayoutMode=="grid" || videoLayoutMode=="side-by-side" ' v-bind:class='{small:videoLayoutMode=="strip", big:videoLayoutMode=="grid", sbs:videoLayoutMode=="side-by-side"}' v-on:click='goPrevVideoPage' ></div>
            <div id='btn_video_next' v-show=' videoLayoutMode=="strip" || videoLayoutMode=="grid" || videoLayoutMode=="side-by-side" ' v-bind:class='{small:videoLayoutMode=="strip", big:videoLayoutMode=="grid", sbs:videoLayoutMode=="side-by-side"}' v-on:click='goNextVideoPage' ></div>
        </div><!--video_layer-->


        <div id='floating_plist' class='floating_window con_flex_column' v-show='plistPanelVisible && fullscreen' v-on:mousedown='swapZindex("floating_plist")' >
            <panel-plist
            v-bind:floating='true'
            ></panel-plist>
        </div><!--floating_plist-->

        <div id='floating_chat' class='floating_window con_flex_column' v-show='chatPanelVisible && fullscreen' v-on:mousedown='swapZindex("floating_chat")' >
            <panel-chat
            v-bind:floating='true'
            ></panel-chat>
        </div><!--floating_chat-->



        <div id='floating_layer' class='floating_window' v-show='currentSharing!==null && fullscreen' v-bind:class='{cls:floatingCollapsed}' v-on:mousedown='swapZindex("floating_layer")' >

            <div v-show='!videoSharingSwitched && !floatingCollapsed' id='floating_video_layer' class=''>
                <div id='fl_active_speaker_layer' class='con' >
                    <video-item 
                        id='fl_active_speaker_video' 
                        v-bind:isBgVideo='true' 
                        v-bind:floatingVideo='true' 
                        v-bind:name='activeSpeaker.name' 
                        v-bind:host='activeSpeaker.host' 
                        v-bind:avatar='activeSpeaker.avatar' 
                        v-bind:video='activeSpeaker.video' 
                        v-bind:audio='activeSpeaker.audio' 
                        v-bind:muted='activeSpeaker.muted' 
                    ></video-item>
                </div>
                <div id='fl_video_scrollpane' >
                    <div id='fl_video_list'>
                        <video-item 
                            v-for='(p, index) in peopleList' 
                            v-if='!p.me' 
                            v-bind:key='index' 
                            v-bind:name='p.name' 
                            v-bind:host='p.host' 
                            v-bind:avatar='p.avatar' 
                            v-bind:video='p.video' 
                            v-bind:audio='p.audio' 
                            v-bind:muted='p.muted' 
                        ></video-item>
                    </div>
                </div>
            </div>

            <div v-show='videoSharingSwitched && !floatingCollapsed' id='floating_sharing_layer' class='con_flex_row'>
                <div class='doc flex_1 con_flex_row' v-show='currentSharing=="doc"'>
                    <div class='page flex_1'></div>
                </div>
                <div class='screen flex_1' v-show='currentSharing=="screen"'></div>
            </div>

            <div v-tooltip.hover.click.bottom='!floatingCollapsed ? (!videoSharingSwitched ? "Hide Video" : "Hide Shared Content View") : (!videoSharingSwitched ? "Show Video" : "Show Shared Content View") ' class='icobtn_s btn_floating_cls floatingctrl' v-bind:class='{cls:floatingCollapsed}' v-on:click.stop='toggleFloatingCls'>
                <span></span>
                <svg-ico-floating-cls></svg-ico-floating-cls>
                <span></span>
            </div>

            <div v-show='floatingCollapsed' class='collapsed_label' >{{ collapsedLabel }}</div>

            <div v-if='!floatingCollapsed && !videoSharingSwitched' class='icobtn_s fc_view_switch floatingctrl' v-bind:class='{exp:switchOpen2 || switchAlwaysOpen}' v-on:mouseover.stop='openSwitch2'>
                <div class='btns con_flex_row'>

                    <div v-tooltip.hover.click.bottom='"Active Speaker Video View"' class='btn flex_none fc_active_speaker' v-on:click.stop='switchFloatingTo("active-speaker", true)' >
                        <span></span>
                        <svg-ico-activespeaker></svg-ico-activespeaker>
                        <span></span>
                    </div>

                    <div v-tooltip.hover.click.bottom='"Active Speaker and Thumbnail Video View"' class='btn flex_none fc_strip' v-on:click.stop='switchFloatingTo("strip", true)' >
                        <span></span>
                        <svg-ico-strip-bot></svg-ico-strip-bot>
                        <span></span>
                    </div>

                    <div v-tooltip.hover.click.bottom='"Equal Video View"' class='btn flex_none fc_grid' v-on:click.stop='switchFloatingTo("grid", true)' >
                        <span></span>
                        <svg-ico-grid></svg-ico-grid>
                        <span></span>
                    </div>

                </div><!--btns-->

            </div><!--fc_view_switch-->

            <div v-tooltip.hover.click.bottom='videoSharingSwitched ? "View All Participants in Floating View" : "View Shared Content in Floating View" ' v-if='!floatingCollapsed' class='icobtn_s btn_switch_floating floatingctrl' v-on:click.stop='toggleSwitchFloating'>
                <span></span>
                <svg-ico-switch-floating></svg-ico-switch-floating>
                <span></span>
            </div>

        </div><!--floating_layer-->


        


        <con-panel></con-panel>


        <div id='hud' class='con'>
            <div class='top_label' id='sharing_selection' v-if='!videoSharingSwitched'>
                <span class='lb_sharing_doc' v-if='currentSharing=="doc"' v-on:click.stop='showPopmenuSwitchSharing' ><span>Presentation.pdf</span><span class='arr'></span></span>
                <span class='lb_sharing_screen' v-if='currentSharing=="screen"' v-on:click.stop='showPopmenuSwitchSharing' ><span>Viewing {{ activeSpeakerName }}'s Screen</span><span class='arr'></span></span>
                <div v-tooltip.hover.click.bottom='"Recording..."' v-if='fullscreen && recording && currentSharing!==null && !videoSharingSwitched' class='ico_recorder'></div>
            </div>
            <div class='icoset_left'>
                <div class='icobtn btn_info hudelem' v-tooltip.hover.click.right='"Meeting Information"' v-on:click.stop='togglePopInfo'>
                    <span></span>
                    <svg-ico-info></svg-ico-info>
                    <span></span>
                </div>
            </div><!--icoset_left-->

            <div class='icoset_right'>
                
                <!--div v-if='fullscreen && locked' class='ico_lock'></div-->

                <div v-show='peopleList.length>2' class='icobtn btn_view_switch hudelem' v-bind:class='{exp:switchOpen || switchAlwaysOpen}' v-on:mouseover.stop='openSwitch' >
                    <div class='btns con_flex_row'>

                        <div v-tooltip.hover.click.bottom='"Active Speaker Video View"' v-if='currentSharing === null || videoSharingSwitched' class='btn flex_none btn_active_speaker' v-on:click.stop='switchTo("active-speaker", true)' >
                            <span></span>
                            <svg-ico-activespeaker></svg-ico-activespeaker>
                            <span></span>
                        </div>

                        <div v-tooltip.hover.click.bottom='"Active Speaker and Thumbnail Video View"' class='btn flex_none btn_strip' v-on:click.stop='switchTo("strip", true)' >
                            <span></span>
                            <svg-ico-strip-bot v-if='currentSharing === null || videoSharingSwitched'></svg-ico-strip-bot>
                            <svg-ico-strip v-else></svg-ico-strip>
                            <span></span>
                        </div>

                        <div v-tooltip.hover.click.bottom='"Equal Video View"' v-if='currentSharing === null || videoSharingSwitched' class='btn flex_none btn_grid' v-on:click.stop='switchTo("grid", true)' >
                            <span></span>
                            <svg-ico-grid></svg-ico-grid>
                            <span></span>
                        </div>

                        <div v-tooltip.hover.click.bottom='"Side by Side View"' v-if='currentSharing !== null && !videoSharingSwitched' class='btn flex_none btn_side_by_side' v-on:click.stop='switchTo("side-by-side", true)' >
                            <span></span>
                            <svg-ico-sidebyside></svg-ico-sidebyside>
                            <span></span>
                        </div>

                        <div v-tooltip.hover.click.bottom='"Floating View"' v-if='currentSharing !== null && !videoSharingSwitched' class='btn flex_none btn_fullscreen' v-on:click.stop='switchTo("fullscreen", true)' >
                            <span></span>
                            <svg-ico-fullscreen></svg-ico-fullscreen>
                            <span></span>
                        </div>

                    </div><!--btns-->

                </div><!--btn_view_switch-->

                <div v-tooltip.hover.click.bottom='!fullscreen ? "Floating View" : "Exit Floating View"' class='icobtn btn_fullscreen hudelem' v-if='currentSharing === null || videoSharingSwitched' v-bind:class='{selected:fullscreen}' v-on:click.stop='toggleFullscreen'>
                    <span></span>
                    <svg-ico-fullscreen></svg-ico-fullscreen>
                    <span></span>
                </div>

                <!--
                <div class='icobtn btn_panel hudelem' v-bind:class='{selected:popmenuPanelVisible}' v-on:click.stop='togglePanelMenu'>
                    <span></span>
                    <svg-ico-panel></svg-ico-panel>
                    <span></span>
                </div>
                -->
            </div><!--icoset_right-->

            
            <div id='sharing_tools' class='hudelem' v-if='currentSharing!==null && !videoSharingSwitched' v-bind:class='{short: currentSharing!="doc"}' >
                <div v-tooltip.hover.click.right='annotationToolsVisible ? "Stop Annotation":"Annotate"' class='ico_tools' v-bind:class='{selected:annotationToolsVisible}' v-on:click.stop='toggleTools'></div>
                <div v-tooltip.hover.click.right='docThumbsVisible ? "Collapse Thumbnails":"View Thumbnails"' class='ico_thumbs' v-if='currentSharing=="doc"' v-bind:class='{selected:docThumbsVisible}' v-on:click.stop='toggleDocThumbs'></div>
                <div class='ico_pages' v-if='currentSharing=="doc"' ></div>
                <div class='sp'></div>
                <div v-tooltip.hover.click.right='"Zoom In"' class='ico_zoomin'></div>
                <div v-tooltip.hover.click.right='"Zoom Out"' class='ico_zoomout'></div>
                <div v-tooltip.hover.click.right='"Fit to Viewer"' class='ico_zoomfit'></div>
            </div>

            <controls class='hudelem'></controls>

        </div><!--hud-->

        


        <splitter></splitter>
        <self-video class='floating_window' v-on:mousedown='swapZindex("self_video")' ></self-video>


	</div>
</template>

<script>

const marginX = 15;
const marginTop = 60;
const marginBottom = 14;


export default {
    data(){
        return {
            tmoResumeVideo: false,
            actionFreezed: false,
            switchOpen: false,
            switchOpen2: false,
            switchAlwaysOpen: false,
            domMain: null,
            domLeft: null,
            domAS: null,
            domSP: null,
            domVL: null,
            domVItems: null,
            domHud: null,
            itvHideHud: null,
            domDsk: null,
            floatingZindex: 8,
            videoPageIndex: 0,
            videoPagesize: 0,
            gridViewRow: 0,
            gridViewCol: 0,
            gridViewItemWidth: 0,

        };
    },
    computed:{
        height(){
            return 'calc(100% - ' + this.headerHeight + 'px)';
        },
        backgroundColor(){
            return this.peopleList.length > 1 ? 'rgba(41,41,41,0.7)' : 'rgba(245,245,245,0.64)';
        },
        videoLayoutMode(){
            return this.$store.state.videoLayoutMode;
        },
        videoFloatingLayoutMode(){
            return this.$store.state.videoFloatingLayoutMode;
        },
        videoSharingSwitched(){
            return this.$store.state.videoSharingSwitched;
        },
        floatingCollapsed(){
            return this.$store.state.floatingCollapsed;
        },
        collapsedLabel(){
            if(this.videoSharingSwitched){
                return 'Viewing '+this.$store.state.activeSpeakerName+"'s screen";
            }else{
                return 'Speaking: '+this.$store.state.activeSpeakerName;
            }
        },
        videoLayoutPrepareMode(){
            return this.$store.state.videoLayoutPrepareMode;
        },
        activeSpeakerName(){
            return this.$store.state.activeSpeakerName;
        },
        activeSpeaker(){
            return this.$store.getters.activeSpeaker;
        },
        lockedPeopleName(){
            return this.$store.state.lockedPeopleName;
        },
        topPeopleName(){
            let name = this.lockedPeopleName !== null ? this.lockedPeopleName : this.activeSpeakerName;
            return name;
        },
        muted(){
            return this.$store.state.muted;
        },
        headerHeight(){
            return this.$store.state.headerHeight;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        recording(){
            return this.$store.state.recording;
        },
        locked(){
            return this.$store.state.locked;
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
        popmenuPanelVisible(){
            return this.$store.state.popmenuPanelVisible;
        },
        popInfoVisible(){
            return this.$store.state.popInfoVisible;
        },
        popLockPeopleVisible(){
            return this.$store.state.popLockPeopleVisible;
        },
        popmenuSwitchSharingVisible(){
            return this.$store.state.popmenuSwitchSharingVisible;
        },
        panelVisible(){
            return this.$store.state.panelVisible;
        },
        peopleList(){
            return this.$store.state.peopleList;
        },
        peopleNotJoinedList(){
            return this.$store.state.peopleNotJoinedList;
        },
        annotationToolsVisible(){
            return this.$store.state.annotationToolsVisible;
        },
        docThumbsVisible(){
            return this.$store.state.docThumbsVisible;
        },
        floatVideoSize(){
            return this.$store.state.floatVideoSize;
        },
        floatVideoOriSize(){
            return this.$store.state.floatVideoOriSize;
        },
        sideBySideVideoColumn(){
            return this.$store.state.sideBySideVideoColumn;
        },
        rightPanelContentWidth(){
            return this.$store.state.rightPanelContentWidth;
        },
        rightPanelWidth(){
            return this.$store.state.rightPanelWidth;
        },
        popAVConnectionVisible(){
            return this.$store.state.popAVConnectionVisible;
        },
        chatMsgList(){
            return this.$store.state.chatMsgList;
        },
        plistPanelVisible(){
            return this.$store.state.plistPanelVisible;
        },
        chatPanelVisible(){
            return this.$store.state.chatPanelVisible;
        },
        plistPanelClsed(){
            return this.$store.state.plistPanelClsed;
        },
        chatPanelClsed(){
            return this.$store.state.chatPanelClsed;
        },
        anyOpenPanel(){
            return this.$store.getters.anyOpenPanel;
        },
        
    },
	mounted(){
        this.domMain = $('#con_main');
        this.domLeft = $('#con_left');
        this.domAS = $('#active_speaker_layer');
        this.domSP = $('#video_scrollpane');
        this.domVL = $('#video_list');
        this.domHud = $('#hud');
        this.domDsk = $('#desktop');
        
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMousemove);
        window.addEventListener('keydown', this.onKeydown);

        this.initDrag();


        // skip signin and add all people
        let skip = getQueryString('skip');
        if(skip){
            let plist1,plist2
            plist1 = this.peopleNotJoinedList.slice();
            plist2 = this.peopleList.slice();
            let removed = plist1.splice(0, 3);
            plist2 = plist2.concat(removed);
            this.$store.commit('peopleList', plist2);
            this.$store.commit('peopleNotJoinedList', plist1);

            // auto + people
            setTimeout(()=>{
                this.addPeopleOneByOne();
            },100);
        }

        let usertesting = getQueryString('usertesting');
        if(usertesting){
            let plist1,plist2
            plist1 = this.peopleNotJoinedList.slice();
            plist2 = this.peopleList.slice();
            let removed = plist1.splice(0,3);
            plist2 = plist2.concat(removed);
            this.$store.commit('peopleList', plist2);
            this.$store.commit('peopleNotJoinedList', plist1);
            
            // auto + people
            setTimeout(()=>{
                this.addPeopleOneByOne();
            },500);

        }

        let switchon = getQueryString('switchon');
        if(switchon){
            this.switchAlwaysOpen = true
        }

        if(this.peopleList.length < 3){
            this.setViewMode('ac', false);
        }else{
            this.setViewMode(this.videoLayoutMode, false);
        }


        // show AV pop
        setTimeout(()=>{

            let appos = $('#mainclient').offset();
            let offset = $('#controls .btn_audio').offset();
            let left = offset.left - appos.left + $('#controls .btn_audio').width()/2;
            let top = offset.top- appos.top;
            this.$store.commit('popStartPoint', [left, top]);
            this.$store.commit('popAVConnectionVisible', true);

        },500);



    },
    watch: {
        panelVisible (newVal) {
            this.onResize();
        },
        rightPanelWidth (newVal) {
            this.onResize();
        },
        currentSharing (newVal) {
            if((this.videoLayoutMode == 'grid' || this.videoLayoutMode == 'active-speaker') && this.currentSharing !== null){
                this.setViewMode('strip', false);
            }else if(this.videoLayoutMode == 'side-by-side' && this.currentSharing === null){
                this.setViewMode('strip', false);
            }else{
                this.setViewMode(this.videoLayoutMode, false);
            }
        },
        annotationToolsVisible (newVal) {
            this.setSharingLayout();
        },
        docThumbsVisible (newVal) {
            this.setSharingLayout();
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
        peopleList (newVal){
            setTimeout(()=>{this.onPeopleListChange();},10);
        },
        plistPanelVisible(newVal){
            if($('#floating_plist').css('top') == 'auto'){
                $('#floating_plist').css('top', 120);
                $('#floating_plist').css('right', 10);
            }
        },
        chatPanelVisible(newVal){
            if($('#floating_chat').css('top') == 'auto'){
                $('#floating_chat').css('top', 390);
                $('#floating_chat').css('right', 10);
            }
        },
        plistPanelClsed(newVal){
            if(newVal){
                $('#floating_plist').css('height', 28);
            }else{
                $('#floating_plist').css('height', 260);
            }
            
        },
        chatPanelClsed(newVal){
            if(newVal){
                $('#floating_chat').css('height', 28);
            }else{
                $('#floating_chat').css('height', 260);
            }

        },
    },
	methods:{
        openSwitch(evt){
            this.switchOpen = true;
            $('.btn_view_switch .btn').removeClass('selected');
            let btn = $('.btn_'+this.videoLayoutMode.replace(/-/g, '_'));
            btn.addClass('selected');
            $('.btn_view_switch .btns').css('right', 0);
            window.addEventListener('mousemove', this.checkMouseLeaveSwitch);
        },
        closeSwitch(mode){
            if(this.switchAlwaysOpen){
                return;
            }
            this.actionFreezed = true;
            this.switchOpen = false;
            $('.btn_view_switch .btn').removeClass('selected');

            this.setSwitch(mode)

            window.removeEventListener('mousemove', this.checkMouseLeaveSwitch);

            setTimeout(()=>{ this.actionFreezed=false; }, 100);
        },
        checkMouseLeaveSwitch(evt){
            if( !$('.btn_view_switch').hitTest(evt.pageX, evt.pageY) ){
                this.closeSwitch();
            }
        },
        setSwitch(mode){
            if(this.switchAlwaysOpen){
                this.openSwitch(mode);
                return;
            }
            if(this.switchOpen){
                return;
            }
            if(!mode){
                mode = this.videoLayoutMode;
            }
            let btn = $('.btn_'+mode.replace(/-/g, '_'));
            if(btn.length > 0){
                let right = btn.position().left-64;
                $('.btn_view_switch .btns').css('right', right+'px');
            }
        },

        openSwitch2(evt){
            this.switchOpen2 = true;
            $('.fc_view_switch .btn').removeClass('selected');
            let btn = $('.fc_'+this.videoFloatingLayoutMode.replace(/-/g, '_'));
            btn.addClass('selected');
            $('.fc_view_switch .btns').css('right', 0);
            window.addEventListener('mousemove', this.checkMouseLeaveSwitch2);
        },
        closeSwitch2(mode){
            if(this.switchAlwaysOpen){
                return;
            }
            this.actionFreezed = true;
            this.switchOpen2 = false;
            $('.fc_view_switch .btn').removeClass('selected');

            this.setSwitch2(mode)

            window.removeEventListener('mousemove', this.checkMouseLeaveSwitch2);

            setTimeout(()=>{ this.actionFreezed=false; }, 100);
        },
        checkMouseLeaveSwitch2(evt){
            if( $('.fc_view_switch').length > 0 && !$('.fc_view_switch').hitTest(evt.pageX, evt.pageY) ){
                this.closeSwitch2();
            }
        },
        setSwitch2(mode){
            if(this.switchAlwaysOpen){
                this.openSwitch2(mode);
                return;
            }
            if(this.switchOpen2){
                return;
            }
            if(!mode){
                mode = this.videoFloatingLayoutMode;
            }
            let btn = $('.fc_'+mode.replace(/-/g, '_'));
            if(btn.length > 0){
                let right = btn.position().left-48;
                $('.fc_view_switch .btns').css('right', right+'px');
            }
        },

        switchTo(mode, animated){
            if(this.videoLayoutMode != mode){
                if(mode == 'fullscreen'){
                    this.launchFullscreen();
                }else{
                    if(!this.videoSharingSwitched && this.currentSharing != null){
                        this.exitFullscreen();
                    }
                }
                animated = false;
                this.setViewMode(mode, animated);
                this.closeSwitch(mode);

                if(this.switchAlwaysOpen){
                    this.openSwitch(mode);
                }
                
            }
        },
        switchFloatingTo(mode, animated){
            if(this.videoFloatingLayoutMode != mode){
                animated = false;
                this.setFloatingViewMode(mode, animated);
                this.closeSwitch2(mode);

                if(this.switchAlwaysOpen){
                    this.openSwitch2(mode);
                }
            }
        },
        toggleSwitchFloating(){
            if(this.videoSharingSwitched){
                this.$store.commit('videoSharingSwitched', false);

                let vmode = this.videoLayoutMode;
                this.switchTo('fullscreen');
                setTimeout(()=>{
                    this.setSwitch('fullscreen');
                    this.switchFloatingTo(vmode);
                    this.setSwitch2(vmode);
                }, 100);

            }else{
                this.$store.commit('videoSharingSwitched', true);

                this.$store.commit('annotationToolsVisible', false);
                this.$store.commit('docThumbsVisible', false);

                var conw = $('#floating_layer').width();
                var bigvh = Math.floor(conw/16*9);
                $('#floating_layer').css('height', bigvh);

                this.switchTo(this.videoFloatingLayoutMode);
                $('.btn_view_switch').hide();
                setTimeout(()=>{
                    $('.btn_view_switch').show();
                    this.setSwitch(this.videoFloatingLayoutMode);
                }, 100);
            }
        },
        toggleFloatingCls(){
            if(this.floatingCollapsed){
                this.$store.commit('floatingCollapsed', false);
            }else{
                this.$store.commit('floatingCollapsed', true);
            }
        },
        changeMode(mode){
            if(this.videoLayoutMode != mode){
                this.$store.commit('videoLayoutMode', mode);
            }
        },
        changeFloatingMode(mode){
            if(this.videoFloatingLayoutMode != mode){
                this.$store.commit('videoFloatingLayoutMode', mode);
            }
        },
        onPeopleListChange(){
            let plist = this.peopleList;
            if(plist.length == 2){
                this.setViewMode('active-speaker', false);
            }else if(plist.length == 3){
                this.setViewMode('strip', false);
            }else{
                this.setViewMode(this.videoLayoutMode, false);
            }
        },
        setViewMode(mode, animated){
            this.$store.commit('videoLayoutPrepareMode', mode);
            let prevmode = this.videoLayoutMode;

            if(!this.panelVisible && mode != 'side-by-side'){
               this.$store.commit('rightPanelWidth', 0);  
            }

            let duration_l;
            let duration_s;
            if(animated){
                duration_l = 500;
                duration_s = 300;
            }else{
                duration_l = 0;
                duration_s = 0;
            }

            if(prevmode == 'active-speaker'){
                duration_l = 0;
            }

            switch(mode){
                case 'strip':

                    var margin = 1;
                    var vw = 120;
                    var vh = 68;
                    var conw = this.domMain.width() - this.rightPanelWidth

                    var pagesize = this.peopleList.length > 6 ? 5 : (this.peopleList.length-1);
                    var maxVisibleItem = Math.floor((conw - 100)/vw);
                    pagesize = Math.min(pagesize, maxVisibleItem);
                    this.videoPagesize = pagesize;

                    var conh = this.domMain.height()
                    var spw = vw*pagesize+margin*(pagesize-1);
                    var sph = vh;
                    var spl = Math.round((conw - spw)/2);
                    var spt = this.currentSharing == null || this.videoSharingSwitched ? (conh-sph-15) : 12;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();
                    

                    // video layout
                    $('#con_left').velocity({ width:conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.setSharingLayout();}});
                    $('#hud').velocity({ width:conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left:0, top:0, width:conw, height:'100%' }, { duration: duration_l, queue: false });

                    if(this.currentSharing === null || this.videoSharingSwitched){
                        this.domAS.velocity({ opacity:1 }, { duration: duration_l, queue: false });
                    }else{
                        this.domAS.velocity({ opacity:0 }, { duration: duration_l, queue: false });
                    }
                    this.domSP.velocity({ opacity:1, left:spl, top:spt, width:spw, height:sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0.12)');
                    this.domSP.css('border', '1px solid rgba(0, 0, 0, 0.12)');
                    $('#video_list .video_item').each((index, itm)=>{
                        let left = index * (vw + margin);
                        $(itm).velocity({ left:left, top:0, width:vw, height:vh }, { duration: duration_l, queue: false });
                    });

                    //self video
                    /*
                    if($('#self_video').length > 0){
                        $('#self_video').removeClass('fixedPosition');
                        var oriw = this.floatVideoOriSize[0];
                        var orih = this.floatVideoOriSize[1];
                        $('#self_video').velocity({ width:oriw, height:orih }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.$store.commit('floatVideoSize', [$(elements).width(), $(elements).height()])} });

                        $('#active_speaker_float_video').fadeOut(100);
                        $('#camera').velocity({ left:0, top:0, width:'100%' }, { duration: duration_l, queue: false });
                        $('#camera').css('height', 'auto');
                    }
                    */

                    // < >
                    var arrw = 24;
                    var arrt = spt+(sph-arrw)/2;
                    var arrl = spl-arrw-10;
                    $('#btn_video_prev').velocity({ top:arrt, left:arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top:arrt, left:(conw-arrl-arrw) }, { duration: duration_l, queue: false });

                    

                    // sharing
                    $('#sharing_layer').css('top', (vh + 24)+'px');
                    var height = this.domMain.height() - vh - 24;
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height:height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height:height }, { duration: duration_l, queue: false });

                    if(this.currentSharing == null || this.videoSharingSwitched){
                        // control
                        $('#controls').velocity({ bottom:95 }, { duration: duration_l, queue: false });

                        $('#sharing_selection').css('top', '12px');
                    }else{
                        // control
                        $('#controls').velocity({ bottom:15 }, { duration: duration_l, queue: false });

                        $('#sharing_selection').css('top', (vh + 38)+'px');
                    }

                    break;

                case 'grid':
                    var col;
                    var row;
                    if(this.peopleList.length >= 6){
                        col = 3;
                    }else{
                        col = 2;
                    }
                    if(this.peopleList.length >= 4){
                        row = 2;
                    }else{
                        row = 1;
                    }
                    var pagesize = col * row;
                    var margin = 1;
                    var conw = this.domMain.width() - this.rightPanelWidth
                    var conh = this.domMain.height()
                    var vw = Math.round(conw-(col-1)*margin-margin*2)/col;
                    var vh = Math.round(vw/4*3);
                    if((conw/col)/(conh/row) > (4/3)){
                        vh = Math.round(conh-(row+1)*margin)/row;
                        vw = Math.round(vh/3*4);
                    }
                    var spw = conw-margin*2;
                    var sph = vh*row+margin;
                    var spl = margin;
                    var spt = Math.round((conh-sph)/2);
                    var vleft = (spw-(vw*col)-(col-1)*margin)/2;

                    this.gridViewRow = row;
                    this.gridViewCol = col;
                    this.gridViewItemWidth = vw;
                    this.videoPagesize = pagesize;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();
                    

                    // video layout
                    $('#con_left').velocity({ width:conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.setSharingLayout();}});
                    $('#hud').velocity({ width:conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left:0, top:0, width:conw, height:'100%' }, { duration: duration_l, queue: false });

                    this.domAS.velocity({ opacity:0 }, { duration: duration_l, queue: false });
                    this.domSP.velocity({ opacity:1, left:spl, top:spt, width:spw, height:sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0.12)');
                    this.domSP.css('border', '1px solid rgba(0, 0, 0, 0.12)');

                    var pnum = this.peopleList.length;
                    $('#video_list .video_item').each((index, itm)=>{
                        let pg = Math.floor(index / pagesize);
                        var colpg = pg == 0 ? col : 1;
                        var spwpg = pg <= 1 ? pg * (spw+margin) : (spw+margin) + (pg-1) * (vw+margin);
                        let top = (index % pagesize)/colpg < 1 ? 0 : vh+margin;
                        let left = vleft+(index % pagesize)%colpg*(vw+margin) + spwpg;
                        if(top > 0 && (pnum-1) < pagesize && (pnum-1)%2==1){
                            let seclinenum = colpg - (pagesize - colpg);
                            let vleft2 = vleft + vw/2;
                            left = vleft2+(index % pagesize)%colpg*(vw+margin) + spwpg;
                        }
                        $(itm).velocity({ left:left, top:top, width:vw, height:vh }, { duration: duration_l, queue: false });
                    });

                    //self video
                    /*
                    if($('#self_video').length > 0){
                        $('#self_video').removeClass('fixedPosition');
                        var oriw = this.floatVideoOriSize[0];
                        var orih = this.floatVideoOriSize[1];
                        $('#self_video').velocity({ width:oriw, height:orih }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.$store.commit('floatVideoSize', [$(elements).width(), $(elements).height()])} });

                        $('#active_speaker_float_video').fadeOut(100);
                        $('#camera').velocity({ left:0, top:0, width:'100%' }, { duration: duration_l, queue: false });
                        $('#camera').css('height', 'auto');
                    }
                    */

                    // < >
                    var arrh = 62;
                    var arrw = 48;
                    var arrt = spt+(sph-arrh)/2;
                    var arrl = 0;
                    $('#btn_video_prev').velocity({ top:arrt, left:arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top:arrt, left:(conw-arrl-arrw) }, { duration: duration_l, queue: false });

                    // control
                    $('#controls').velocity({ bottom:15 }, { duration: duration_l, queue: false });

                    break;

                case 'active-speaker':

                    var pagesize = 5;
                    var margin = 1;
                    var vw = 120;
                    var vh = 68;
                    var conw = this.domMain.width() - this.rightPanelWidth
                    var conh = this.domMain.height()
                    var spw = vw*pagesize+margin*(pagesize-1);
                    var sph = vh;
                    var spl = Math.round((conw - spw)/2);
                    var spt = conh-sph-10;

                    // switch button
                    var w = $('.btn_view_switch .btn').width();
                    

                    // video layout
                    $('#con_left').velocity({ width:conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.setSharingLayout();}});
                    $('#hud').velocity({ width:conw }, { duration: duration_l, queue: false });


                    this.domAS.velocity({ opacity:1 }, { duration: duration_l, queue: false });
                    this.domSP.velocity({ opacity:0 }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left:0, top:0, width:conw, height:'100%' }, { duration: duration_l, queue: false });


                    // < >

                    // control
                    $('#controls').velocity({ bottom:15 }, { duration: duration_l, queue: false });

                    // sharing
                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height:height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height:height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');

                    break;

                case 'side-by-side':

                    var margin = 1;
                    var conw = this.domMain.width() - this.rightPanelContentWidth
                    var conh = this.domMain.height()
                    var sidecolw = this.rightPanelContentWidth;

                    var vw;
                    var vh;
                    var col;
                    var row;

                    if(sidecolw < 241){
                        col = 1;
                    }else if(sidecolw < 362){
                        col = 2;
                    }else{
                        col = 3;
                    }
                    this.$store.commit('sideBySideVideoColumn', col);
                    vw = (sidecolw-margin*(col-1))/col;
                    vh = vw/16*9;

                    var ash = Math.floor(sidecolw/16*9);
                    var spw = sidecolw;
                    var sph = conh;
                    var spl = 0;
                    var spt = ash+margin;

                    var thumbsAreaH = conh - ash - margin;
                    if(col == 1){
                        thumbsAreaH = conh;
                    }
                    row = Math.floor(thumbsAreaH/(vh+margin));
                    var pagesize = row * col;

                    this.gridViewRow = row;
                    this.gridViewCol = col;
                    this.gridViewItemWidth = vw;
                    this.videoPagesize = pagesize;
                    
                    
                    // switch button
                    var w = $('.btn_view_switch .btn').width();
                    

                    // video layout
                    $('#con_left').velocity({ width:conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.setSharingLayout();} });
                    $('#hud').velocity({ width:conw }, { duration: duration_l, queue: false });

                    $('#video_layer').velocity({ left:conw, top:0, width:sidecolw, height:'100%' }, { duration: duration_l, queue: false });

                    
                    this.domAS.velocity({ opacity:0 }, { duration: duration_l, queue: false });

                    this.domSP.velocity({ opacity:1, left:spl, top:0, width:spw, height:sph }, { duration: duration_l, queue: false });
                    this.domSP.css('background-color', 'rgba(0,0,0,0)');
                    this.domSP.css('border', '0 solid rgba(0, 0, 0, 0)');

                    
                    var idx = 0;
                    var thumbnum = col > 1 ? this.peopleList.length-2 : this.peopleList.length-1;
                    var totalpg = Math.ceil(thumbnum / pagesize);
                    $('#video_list .video_item').each((index, itm)=>{
                        var name = $(itm).attr('data-name');
                        if(name != this.activeSpeakerName || col == 1){
                            let pg = Math.floor(idx / pagesize);
                            var ttt = col == 1 ? 0 : spt;
                            var colpg = col == 1 || pg == 0 || pg < totalpg-1 ? col : Math.ceil(thumbnum%pagesize/row);
                            let top = ttt + Math.floor((idx % pagesize)/colpg)*(vh+margin);
                            let left = (idx % pagesize)%colpg*(vw+margin) + (spw+margin)*pg;
                            
                            $(itm).velocity({ left:left, top:top, width:vw, height:vh }, { duration: duration_l, queue: false });

                            $(itm).attr('is-active-speaker', 0);
                            $(itm).attr('ori-left', left);
                            idx++;

                            if(this.panelVisible || row == 0){
                               $(itm).hide();
                            }else{
                               $(itm).show();
                            }
                        }else{
                            $(itm).velocity({ left:0, top:0, width:spw, height:ash }, { duration: duration_l, queue: false });
                            $(itm).attr('is-active-speaker', 1);
                            $(itm).attr('ori-left', 0);
                        }
                    });

                    $('#video_list').css('left', 0);

                    // < >
                    var arrw = 24;
                    var arrh = 32;
                    var arrt = col == 1 ? (row*(vh+margin)-arrh)/2 : spt+(row*(vh+margin)-arrh)/2;
                    var arrl = 0;
                    $('#btn_video_prev').velocity({ top:arrt, left:arrl }, { duration: duration_l, queue: false });
                    $('#btn_video_next').velocity({ top:arrt, left:(sidecolw-arrl-arrw) }, { duration: duration_l, queue: false });

                    // control
                    $('#controls').velocity({ bottom:15 }, { duration: duration_l, queue: false });

                    // sharing
                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height:height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height:height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');

                    break;

                case 'fullscreen':

                    // floating video panel
                    const marginX = 15;
                    const marginTop = 60;
                    const marginBottom = 14;

                    var conw = this.domMain.width()
                    var conh = this.domMain.height()

                    const fw = $('#floating_layer').width();
                    const fh = fw/16*9;
                    const fx = 0;
                    const fy = 0;

                    $('#floating_layer').css('top', marginTop);
                    $('#floating_layer').css('right', 10);


                    // sharing
                    $('#con_left').velocity({ width:conw }, { duration: duration_l, queue: false, progress: (elements, complete, remaining, start, tweenValue)=>{this.setSharingLayout();} });
                    $('#hud').velocity({ width:conw }, { duration: duration_l, queue: false });

                    $('#sharing_layer').css('top', '0');
                    var height = '100%';
                    $('#sharing_layer').attr('con-height', height);
                    $('#sharing_layer .doc').velocity({ height:height }, { duration: duration_l, queue: false });
                    $('#sharing_layer .screen').velocity({ height:height }, { duration: duration_l, queue: false });

                    $('#sharing_selection').css('top', '12px');


                    this.setFloatingViewMode('active-speaker', false);



                    break;
            }

            //setTimeout(()=>{
                this.changeMode(mode); 
                this.setVideoPage(false);
            //}, duration_l);

            this.setSwitch();

        },

        setFloatingViewMode(mode, animated){

            let duration_l;
            let duration_s;
            if(animated){
                duration_l = 500;
                duration_s = 300;
            }else{
                duration_l = 0;
                duration_s = 0;
            }

            switch(mode){
                case 'strip':

                    var col = 3
                    var margin = 1;
                    
                    var conw = $('#floating_layer').width();
                    var bigvh = Math.floor(conw/16*9);
                    
                    var vw = (conw-(col-1)*margin)/col;
                    var vh = (vw/16*9);

                    var conh = bigvh+vh+margin

                    var spw = vw*col+margin*(col-1);
                    var sph = vh;
                    var spl = 0;
                    var spt = bigvh+margin

                    $('#floating_layer').css('height', conh);

                    // video layout
                    $('#fl_active_speaker_layer').velocity({ opacity:1, width:conw, height:bigvh}, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity:1, left:spl, top:spt, width:spw, height:sph }, { duration: duration_l, queue: false });
                    $('#fl_video_list .video_item').each((index, itm)=>{
                        let left = index * (vw + margin);
                        $(itm).velocity({ left:left, top:0, width:vw, height:vh }, { duration: duration_l, queue: false });
                    });


                    break;

                case 'grid':
                    var col = 2;
                    var row = 3;

                    var pagesize = col * row;
                    var margin = 1;
                    var conw = $('#floating_layer').width();
                    
                    var vw = Math.ceil((conw-(col-1)*margin)/col);
                    var vh = (vw/16*9);

                    var conh = (vh+margin)*row-margin

                    var spw = conw;
                    var sph = (vh+margin)*row;
                    var spl = 0;
                    var spt = 0;
                    var vleft = 0;

                    $('#floating_layer').css('height', conh);

                    // video layout
                    $('#video_layer').velocity({ left:0, top:0, width:conw, height:'100%' }, { duration: duration_l, queue: false });

                    $('#fl_active_speaker_layer').velocity({ opacity:0 }, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity:1, left:spl, top:spt, width:spw, height:sph }, { duration: duration_l, queue: false });

                    var pnum = this.peopleList.length;
                    $('#fl_video_list .video_item').each((index, itm)=>{

                        let top = Math.floor(index/col)*(vh+margin);
                        let left = index%col*(vw+margin);
                        
                        $(itm).velocity({ left:left, top:top, width:vw, height:vh }, { duration: duration_l, queue: false });
                    });

                    break;

                case 'active-speaker':

                    var conw = $('#floating_layer').width();
                    var bigvh = Math.floor(conw/16*9);

                    $('#floating_layer').css('height', bigvh);

                    $('#fl_active_speaker_layer').velocity({ opacity:1, width:conw, height:bigvh }, { duration: duration_l, queue: false });
                    $('#fl_video_scrollpane').velocity({ opacity:0 }, { duration: duration_l, queue: false });

                    break;

            }

            //setTimeout(()=>{
                this.changeFloatingMode(mode); 
            //}, duration_l);

            this.setSwitch2();

            $('.floatingctrl').fadeIn();
        },

        resumeVideo(){
            clearTimeout(this.tmoResumeVideo);
            this.tmoResumeVideo = setTimeout(()=>{
                let vds = $('#video_layer').find('video');
                let len = vds.length;
                for(let i=0; i<len; i++){
                    if($(vds[i])[0].src.indexOf('.mp4') > -1){
                        vds.get(i).play();
                    }
                }
            }, 20);
        },

        togglePopInfo(evt){
            if(this.popInfoVisible){
                this.$store.commit('popInfoVisible', false);
            }else{
                this.$store.commit('popInfoVisible', true);
            }
        },
        toggleFullscreen(evt){
            if(!this.fullscreen){
                this.launchFullscreen();
            }else{
                if(this.currentSharing !== null){
                    this.$store.commit('videoSharingSwitched', false);
                    this.switchTo('strip', false);
                }
                this.exitFullscreen();
            }
        },
        togglePanelMenu(evt){
            if(this.popmenuPanelVisible){
                this.$store.commit('popmenuPanelVisible', false);
            }else{
                this.$store.commit('popmenuPanelVisible', true);
            }
        },
        toggleTools(evt){
            if(this.annotationToolsVisible){
                this.$store.commit('annotationToolsVisible', false);
            }else{
                this.$store.commit('annotationToolsVisible', true);
            }
        },
        toggleDocThumbs(evt){
            if(this.docThumbsVisible){
                this.$store.commit('docThumbsVisible', false);
            }else{
                this.$store.commit('docThumbsVisible', true);
            }
        },
        onResize(){
            this.setViewMode(this.videoLayoutMode, false);
            this.initDrag();
        },
        initDrag(){
            // self video draggable
            let ww = $('#floating_layer').width();
            let wh = $('#floating_layer').height();

            let offset = $('#con_main').offset();
            let panew = $('#con_main').width();
            let x1 = offset.left + marginX;
            let x2 = offset.left + panew-ww-marginX;
            let y1 = offset.top + marginTop;
            let y2 = offset.top + $('#con_left').height()-wh-marginBottom;
            $('#floating_layer').draggable({ 
                stack: '.floating_window',
                containment: [x1,y1,x2,y2],
                start: ()=>{},
                drag: ()=>{},
                stop: ()=>{}
            });
        },
        swapZindex(elemid){
            this.floatingZindex++;
            $('#'+elemid).css('z-index', this.floatingZindex);
        },
        setSharingLayout(){
            if(this.currentSharing === null){
                return;
            }
            if($('#sharing_layer').length == 0 || $('#annotation_tools').length == 0){
                setTimeout(()=>{this.setSharingLayout()}, 10);
                return;
            }

            // thumbs
            let thumbswidth = 0;
            if(this.docThumbsVisible){
                thumbswidth += 160;
                $('#sharing_layer .doc .thumbs').velocity({width:thumbswidth}, { duration: 300, queue: false });
            }else{
                $('#sharing_layer .doc .thumbs').velocity({width:0}, { duration: 300, queue: false });
            }

            let contop;
            let con_h = $('#sharing_layer').attr('con-height');
            if(con_h == '100%'){
                contop = 0;
                con_h = $('#sharing_layer').height();
            }else{
                contop = $('#sharing_layer').height() - Number(con_h);
            }

            // tools
            let margin = 15;
            let left;
            let top;
            if(this.currentSharing == 'doc'){

                left = margin;
                if(this.docThumbsVisible){
                    left += thumbswidth;
                }
                if(this.annotationToolsVisible){
                    left += $('#annotation_tools').width();
                }
                top = contop + (con_h - $('#sharing_tools').height())/2;

            }else if(this.currentSharing == 'screen'){

                left = margin;
                if(this.annotationToolsVisible){
                    left += $('#annotation_tools').width();
                }
                top = contop + (con_h - $('#sharing_tools').height())/2;

            }
            $('#sharing_tools').css('top', top+'px');
            $('#sharing_tools').velocity({left:left}, { duration: 300, queue: false });

            // annotation
            let t = contop;
            let h = con_h;
            //$('#annotation_tools').css('top', t+'px');
            $('#annotation_tools').css('height', h+'px');



        },
        launchFullscreen(){
            this.$store.commit('fullscreen', true);
            this.domMain.css('height', '100%');
        },
        exitFullscreen(){
            this.$store.commit('fullscreen', false);
            this.domMain.css('height', 'calc(100% - '+this.headerHeight+'px)');
        },
        onMousemove(evt){
            if(this.actionFreezed){
                return;
            }

            this.showHud();
            clearTimeout(this.itvHideHud);
            
            let hit = false;
            $('.hudelem').each((index, element)=>{ if($(element).hitTest(evt.pageX, evt.pageY)){hit = true;} });
            if( !hit && !this.popAVConnectionVisible ){
                this.itvHideHud = setTimeout(()=>{ this.hideHud() }, 5000);
            }

            if(this.videoLayoutMode == 'fullscreen' && !this.floatingCollapsed){
                if( $('#floating_layer').hitTest(evt.pageX, evt.pageY) ){
                    $('.floatingctrl').css('opacity', 1)
                }
                hit = false;
                $('.floatingctrl').each((index, element)=>{ if($(element).hitTest(evt.pageX, evt.pageY)){hit = true;} });
                if( !hit && !$('#floating_layer').hitTest(evt.pageX, evt.pageY) ){
                    $('.floatingctrl').css('opacity', 0)
                }
            }
            
        },
        hideHud(){
            this.domHud.stop().velocity({ opacity: 0 }, { duration: 500, queue: false });
            this.$store.commit('popInfoVisible', false);
            this.$store.commit('popmenuPanelVisible', false);
            this.$store.commit('popmenuMoreVisible', false);
            this.$store.commit('popAudioVisible', false);
            this.$store.commit('popVideoVisible', false);
            this.$store.commit('popShareVisible', false);
            this.$store.commit('popRecordVisible', false);
            //this.$store.commit('popLockPeopleVisible', false);
            this.$store.commit('popmenuSwitchSharingVisible', false);

            $('.ico_lockpeople').stop().velocity({ opacity: 0 }, { duration: 500, queue: false });

            $('.video_controls').hide();

        },
        showHud(){
            if(this.domHud.css('opacity') == 0){
                this.domHud.velocity({ opacity: 1 }, { duration: 500, queue: false });
                $('.ico_lockpeople').stop().velocity({ opacity: 1 }, { duration: 500, queue: false });
            }
            
        },
        onKeydown(evt){
            if(evt.code == 'KeyS' && evt.altKey){
                if(this.videoSharingSwitched || this.videoLayoutMode == 'fullscreen' || this.peopleList.length < 3){
                   return; 
                }
                // Alt + S
                if(this.currentSharing === null){
                    if(this.peopleList.length < 6){
                        this.addAllPeople();
                    }
                    // start sharing
                    this.$store.commit('currentSharing', 'doc');
                }else{
                    // stop sharing
                    this.$store.commit('currentSharing', null);
                }
                setTimeout(()=>{
                    this.setSwitch();
                }, 10);

            }else if(evt.code == 'Equal' && this.currentSharing == null){
                // =
                this.addPeople();

            }else if(evt.code == 'KeyC' && evt.altKey){
                let chatMsgList;
                if(this.chatPanelVisible){
                    chatMsgList = [
                        {
                            name: 'Emma Hirst',
                            to: 'everyone',
                            msg: 'In March we announced the evolution of our Engineering organization to better reflect our strategic priorities, and align around four areas that are critical to our customers’ needs: Networking and Market Segments, Cloud Services and Platforms, IoT and Applications, and Security.  Today, I’m excited to share the next steps in that evolution.',
                            unread: false,
                        },
                        {
                            name: 'Emma Hirst',
                            to: 'everyone',
                            msg: 'I would like to thank Nick once again for his leadership and dedication over the past 8 years. He is a great friend, and I have learned so much working with him over my career at company as I’ve witnessed the many innovations that engineering delivers each day.',
                            unread: false,
                        },
                        /*
                        {
                            name: 'Alison Cassidy',
                            to: 'everyone',
                            msg: 'Thanks',
                            unread: false,
                        }
                        */
                    ];

                }else{
                    chatMsgList = [
                        {
                            name: 'Elizabeth Wu',
                            to: 'you',
                            msg: 'Hi, Alison~ Could you please start sharing your PowerPoint slides?',
                            unread: true,
                        }
                    ];
                }
                
                this.$store.commit('chatMsgList', chatMsgList);
                this.showHud();

            }
        },
        addPeopleOneByOne(){
            if(this.peopleNotJoinedList.length > 0){
                setTimeout(()=>{
                    this.addPeopleOneByOne();
                }, 2000);

                this.addPeople();
            }
        },
        addPeople(){
            if(this.peopleNotJoinedList.length > 0){
                let plist1,plist2
                plist1 = this.peopleList.slice();
                plist2 = this.peopleNotJoinedList.slice();
                if(this.peopleNotJoinedList.length > 0){
                    let p = plist2.shift();
                    plist1.push(p);
                }
                
                this.$store.commit('peopleList', plist1);
                this.$store.commit('peopleNotJoinedList', plist2);
            }
        },
        addAllPeople(){
            let plist1,plist2
            plist1 = this.peopleList.slice();
            plist2 = this.peopleNotJoinedList.slice();
            plist1 = plist1.concat(plist2);
            plist2 = [];
            this.$store.commit('peopleList', plist1);
            this.$store.commit('peopleNotJoinedList', plist2);
        },
        showPopmenuSwitchSharing(evt){
            if(!this.popmenuSwitchSharingVisible){
                let appos = $('#mainclient').offset();
                let left = $('#sharing_selection').width()/2;
                let top = $('#sharing_selection').offset().top-appos.top+$('#sharing_selection').height();
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popmenuSwitchSharingVisible', true);
            }else{
                this.$store.commit('popmenuSwitchSharingVisible', false);
            }
        },
        toggleLockPeople(evt){
            if(!this.popLockPeopleVisible && this.lockedPeopleName == null){
                let appos = $('#mainclient').offset();
                let left = $('.ico_lockpeople').position().left + $('.ico_lockpeople').width()/2 + 8;
                let top = $('.ico_lockpeople').offset().top-appos.top+$('.ico_lockpeople').height() + 15;
                this.$store.commit('popStartPoint', [left, top]);
                this.$store.commit('popLockPeopleVisible', true);
            }else{
                this.$store.commit('lockedPeopleName', null);
            }
        },
        goPrevVideoPage(){
            this.videoPageIndex--;
            this.setVideoPage(true);
        },
        goNextVideoPage(){
            this.videoPageIndex++;
            this.setVideoPage(true);
        },
        setVideoPage(animated){
            let duration = animated ? 300:0;

            let itmNum = this.peopleList.length - 1;
            let totalPages = Math.ceil(itmNum / this.videoPagesize);
            this.videoPageIndex = Math.min(this.videoPageIndex, totalPages-1);
            this.videoPageIndex = Math.max(this.videoPageIndex, 0);

            if(this.videoPageIndex == 0){
                $('#btn_video_prev').addClass('disabled');
            }else{
                $('#btn_video_prev').removeClass('disabled');
            }
            if(this.videoPageIndex == totalPages-1){
                $('#btn_video_next').addClass('disabled');
            }else{
                $('#btn_video_next').removeClass('disabled');
            }

            if(this.videoLayoutMode == 'strip'){
                var margin = 1;
                var vw = 120;
                var left = -this.videoPageIndex*this.videoPagesize*(vw+margin);
                if(this.videoPageIndex == totalPages-1){
                    left = -(itmNum-this.videoPagesize)*(vw+margin);
                }
                $('#video_list').velocity({ left:left }, { duration: duration, queue: false });
            }else if(this.videoLayoutMode == 'grid'){
                var margin = 1;
                var vw = this.gridViewItemWidth;
                var left = -this.videoPageIndex*this.gridViewCol*(vw+margin);
                if(this.videoPageIndex == totalPages-1){
                    left = -(Math.ceil(itmNum/this.gridViewRow)-this.gridViewCol)*(vw+margin);
                }
                $('#video_list').velocity({ left:left }, { duration: duration, queue: false });
            }else if(this.videoLayoutMode == 'side-by-side'){

                itmNum = this.gridViewCol > 1 ? this.peopleList.length - 2 : this.peopleList.length - 1;
                totalPages = Math.ceil(itmNum / this.videoPagesize);
                this.videoPageIndex = Math.min(this.videoPageIndex, totalPages-1);
                this.videoPageIndex = Math.max(this.videoPageIndex, 0);

                if(this.videoPageIndex == 0){
                    $('#btn_video_prev').addClass('disabled');
                }else{
                    $('#btn_video_prev').removeClass('disabled');
                }
                if(this.videoPageIndex == totalPages-1){
                    $('#btn_video_next').addClass('disabled');
                }else{
                    $('#btn_video_next').removeClass('disabled');
                }

                var margin = 1;
                var vw = this.gridViewItemWidth;
                var left = -this.videoPageIndex*this.gridViewCol*(vw+margin);
                if(this.videoPageIndex > 0 && this.videoPageIndex == totalPages-1){
                    var col_last = Math.ceil(itmNum%this.videoPagesize/this.gridViewRow);
                    left = -(Math.ceil(itmNum/this.gridViewRow)-this.gridViewCol)*(vw+margin);
                }

                $('#video_list').css('left', 0);
                $('#video_list .video_item').each((index, itm)=>{
                    var isas = $(itm).attr('is-active-speaker');
                    if(isas == 0 && this.gridViewCol > 1 || this.gridViewCol == 1){
                        var l = left + Number($(itm).attr('ori-left'));
                        $(itm).velocity({ left:l }, { duration: duration, queue: false });
                    }
                });
            }

            if(totalPages <= 1 || this.gridViewRow == 0){
                $('#btn_video_prev').hide()
                $('#btn_video_next').hide()
            }else{
                $('#btn_video_prev').show()
                $('#btn_video_next').show()
            }

        },
	}
}
</script>


<style scoped>

#con_main{
    position: relative;
    width: 100%;
    transition: all 0.3s ease-out;
    overflow: hidden;
}
#con_left{
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.cisco_logo{
    position: absolute;
    width: 40px;
    height: 22px;
    bottom: 15px;
    left: 15px;
    background: url(../img/icon/cisco_logo.svg) no-repeat center center;
}
#waitingPage{
    position: absolute;
    width: 100%;
    height: 100%;
}
#waitingPage span{
    position: absolute;
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 20px;
    top:44%;
    transform:translateY(-50%);
}
.top_label{
    position: absolute;
    width: 100%;
    height: 32px;
    top: 12px;
    text-align: center;
    pointer-events: none;
}
.lb_active_speaker{
    display: inline-block;
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    background-color: rgba(255,255,255,0.8);
    border-radius: 4px;
    vertical-align: middle;
}
.top_label .lb_sharing_screen{
    display: inline-block;
    padding: 0 0 0 15px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
    border-radius: 16px;
}
.top_label .lb_sharing_screen{
    cursor: pointer;
    pointer-events: auto;
}
.top_label .lb_sharing_screen span{
    vertical-align: middle;
}
.top_label .lb_sharing_screen .arr{
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url(../img/icon/ico_arrow_down.svg) no-repeat center center;
    vertical-align: middle;
}
.top_label .lb_sharing_doc{
    display: inline-block;
    padding: 0 0 0 15px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
    border-radius: 16px;
    cursor: pointer;
    pointer-events: auto;
}
.top_label .lb_sharing_doc span{
    vertical-align: middle;
}
.top_label .lb_sharing_doc .arr{
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url(../img/icon/ico_arrow_down.svg) no-repeat center center;
    vertical-align: middle;
}
.icoset_left{
    position: absolute;
    top: 12px;
    left: 15px;
}
.icoset_left .icobtn{
    margin-right: 10px;
}

.icoset_right{
    position: absolute;
    top: 12px;
    right: 15px;
    height: 32px;
    text-align: right;
}
.icoset_right .icobtn{
    margin-left: 10px;
}
.icobtn{
    display: inline-block;
    width: 32px;
    height: 32px;
    background-color: rgba(255,255,255,0.88);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
    border-radius: 16px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
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
.icobtn.selected{
    background-color: #049FD9;
}





.icobtn_s{
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: rgba(255,255,255,0.88);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
    border-radius: 16px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
}
.icobtn_s svg{
    pointer-events: none;
    display: inline-block;
    vertical-align: middle;
}
.icobtn_s span{
    pointer-events: none;
    display: inline-block;
    height: 100%;
    width: 0px;
    vertical-align: middle;
}
.icobtn_s.selected{
    background-color: #049FD9;
}

.ico_lockpeople{
    margin-left: 8px;
}



#hud{
    pointer-events: none;
}
.ico_recorder{
    display: inline-block;
    width: 16px;
    height: 32px;
    vertical-align: middle;
    background: url(../img/icon/ico_sts_recorder.svg) no-repeat center center;
    margin-left: 10px;
    animation: blinker 1.6s linear infinite;    
}
@keyframes blinker {  
  50% { opacity: 0; }
}

.ico_lock{
    display: inline-block;
    width: 16px;
    height: 32px;
    vertical-align: middle;
    background: url(../img/icon/ico_sts_lock.svg) no-repeat center center;
    margin-left: 10px;
}


.btn_view_switch{
    position: relative;
    overflow: hidden;
    transition: width 0.1s ease-out;
}
.btn_view_switch .btns{
    position: absolute;
    height: 32px;
    top: 0px;
    right: 0px;
    text-align: right;
}
.btn_view_switch .btn{
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
}
.btn_view_switch .btn.selected{
    background-color: #049FD9;
}
.btn_view_switch.exp{
    width: 96px;
}




.fc_view_switch{
    position: absolute;
    top: 10px;
    right: 44px;
    overflow: hidden;
    transition: all 0.1s ease-out;
}
.fc_view_switch .btns{
    position: absolute;
    height: 24px;
    top: 0px;
    right: 0px;
    text-align: right;
}
.fc_view_switch .btn{
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 16px;
    pointer-events: auto;
    cursor: pointer;
    text-align: center;
}
.fc_view_switch .btn.selected{
    background-color: #049FD9;
}
.fc_view_switch.exp{
    width: 72px;
}




#video_layer {
    pointer-events: none;
}
#video_scrollpane {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transform: rotate(0deg);
    pointer-events: none;
}
#active_speaker_layer, 
#fl_active_speaker_layer {
    pointer-events: none;
}
#active_speaker_video,
#fl_active_speaker_video {
    width: 100%;
    height: 100%;
    pointer-events: none;
}
#btn_video_prev {
    position: absolute;
    border-radius: 50%;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_l.svg) no-repeat center center;
    border: 1px solid rgba(255,255,255,0.12);
    pointer-events: auto;
    cursor: pointer;
}
#btn_video_next {
    position: absolute;
    border-radius: 50%;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_r.svg) no-repeat center center;
    border: 1px solid rgba(255,255,255,0.12);
    pointer-events: auto;
    cursor: pointer;
}
#btn_video_prev.disabled,
#btn_video_next.disabled {
    opacity: 0.5;
    pointer-events: none;
}
#btn_video_prev.small,
#btn_video_next.small {
    width: 24px;
    height: 24px;
}
#btn_video_prev.big {
    width: 48px;
    height: 62px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 31px;
    border-bottom-right-radius: 31px;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_l2.svg) no-repeat 42% center;
}
#btn_video_next.big {
    width: 48px;
    height: 62px;
    border-top-left-radius: 31px;
    border-bottom-left-radius: 31px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_r2.svg) no-repeat 58% center;
}
#btn_video_prev.sbs {
    width: 24px;
    height: 32px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_l.svg) no-repeat 42% center;
}
#btn_video_next.sbs {
    width: 24px;
    height: 32px;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: rgba(41,41,41,0.9) url(../img/icon/ico_ctrl_arr_r.svg) no-repeat 58% center;
}

#sharing_layer{
    position: absolute;
    width: 100%;
    height: 100%;
}
#sharing_layer .doc{
    height: 100%;
    background-color: rgba(0,0,0,0.05);
}
.doc .page{
    background: url(../img/sharing_doc.png) no-repeat center center;
    background-size: contain;
    height: 100%;
}
#sharing_layer .doc .thumbs{
    width: 0;
    height: 100%;
    box-shadow: 1px 0px 0px rgba(255,255,255,0.05);
    overflow: hidden;
}
#sharing_layer .doc .thumbs .img{
    position: absolute;
    right: 0;
    width: 160px;
    height: 100%;
    background: url(../img/sharing_doc_thumbs.png) no-repeat right 10px;
}
.screen{
    height: 100%;
    background: url(../img/sharing_screen.jpg) no-repeat center top;
    background-size: contain;
    background-color: rgba(0,0,0,0.05);
}
#annotation_tools {
    width: 60px;
    height: 100%;
    background: url(../img/annotation_tools.svg) no-repeat center center;
    box-shadow: 1px 0px 0px rgba(255,255,255,0.05);
    overflow: hidden;
    background-color: rgba(0,0,0,0.05);
}
#sharing_tools {
    position: absolute;
    width: 32px;
    height: 202px;
    background: #FFF;
    border-radius: 16px;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
    pointer-events: auto;
}
#sharing_tools.short{
    height: 132px;
}
#sharing_tools div{
    width: 32px;
    height: 32px;
    cursor: pointer;
}
#sharing_tools .sp{
    width: 22px;
    height: 1px;
    margin-left: 5px;
    background: rgba(0,0,0,0.08);
}

#sharing_tools .ico_tools{
    background: url(../img/icon/ico_tools.svg) no-repeat center center;
}
#sharing_tools .ico_tools.selected{
    background: url(../img/icon/ico_tools_on.svg) no-repeat center center;
}
#sharing_tools .ico_thumbs{
    background: url(../img/icon/ico_thumbs.svg) no-repeat center center;
}
#sharing_tools .ico_thumbs.selected{
    background: url(../img/icon/ico_thumbs_on.svg) no-repeat center center;
}
#sharing_tools .ico_pages{
    height: 42px;
    background: url(../img/icon/ico_pages.svg) no-repeat center center;
}
#sharing_tools .ico_zoomin{
    background: url(../img/icon/ico_zoomin.svg) no-repeat center center;
}
#sharing_tools .ico_zoomout{
    background: url(../img/icon/ico_zoomout.svg) no-repeat center center;
}
#sharing_tools .ico_zoomfit{
    background: url(../img/icon/ico_zoomfit.svg) no-repeat center center;
}



#floating_layer {
    position: absolute;
    width: 356px;
    border-radius: 4px;
    overflow: hidden;
    transform: rotate(0deg);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 2px 12px rgba(0,0,0,0.24);
}
#floating_layer.cls {
    background-color: #FFF;
    height: 44px !important;
    transition: all 0.2s ease-out;
}
.btn_floating_cls {
    transform-origin: 50% 50%;
    position: absolute;
    top: 10px;
    left: 10px;
    transition: all 0.2s ease-out;
}
.btn_floating_cls.cls {
    transform: rotate(-90deg);
}
.btn_switch_floating {
    position: absolute;
    top: 10px;
    right: 10px;
}
.collapsed_label {
    position: absolute;
    left: 44px;
    width: 300px;
    height: 44px;
    font-size: 12px;
    line-height: 44px;
}

#floating_video_layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
#floating_sharing_layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#floating_plist {
    position: absolute;
    width: 320px;
    height: 260px;
    border-radius: 4px;
    overflow: hidden;
    transform: rotate(0deg);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 2px 12px rgba(0,0,0,0.24);
    background-color: #FFF;
}

#floating_chat {
    position: absolute;
    width: 320px;
    height: 260px;
    border-radius: 4px;
    overflow: hidden;
    transform: rotate(0deg);
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 2px 12px rgba(0,0,0,0.24);
    background-color: #FFF;
}



</style>