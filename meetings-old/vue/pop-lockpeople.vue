<template>
    <transition name="fade">
	<div id='pop_lockpeople' v-show='popLockPeopleVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Lock Video View</div>
            <div class='txt'>Who do you want to lock the video view for?</div>

            <div class='grp'>
                <div class='check on'>Me</div>
                <div class='check off'>Everyone</div>
            </div>

            <input class="search-input" type="text" placeholder="Search for a name" value="">  

            <div class='lst'>
                <div class='head'>TelePresence Speaker</div>
                <div class='lst2'>
                    <lockpeople-item 
                        v-bind:name='"Scott Estrada"' 
                        v-bind:host='false' 
                        v-bind:video='null' 
                        v-bind:telepresence='true' 
                    ></lockpeople-item>
                </div>
                <div class='head'>Participants</div>
                <div class='lst2'>
                    <lockpeople-item 
                        v-for='(p, index) in peopleList' 
                        v-if='!p.me' 
                        v-bind:key='index' 
                        v-bind:name='p.name' 
                        v-bind:host='p.host' 
                        v-bind:video='p.video' 
                        v-bind:telepresence='false' 
                    ></lockpeople-item>
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
        popLockPeopleVisible(){
            return this.$store.state.popLockPeopleVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        peopleList(){
            return this.$store.state.peopleList;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_lockpeople');
    },
    watch: {
        popLockPeopleVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1];
                $('#pop_lockpeople').css('left', left+'px');
                $('#pop_lockpeople').css('top', top+'px');
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
           this.$store.commit('popLockPeopleVisible', false); 
        }
    }

}
</script>

<style scoped>
#pop_lockpeople {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 320px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    transform:translate(-50%,0%);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    width: 50px;
    height: 20px;
    top: -19px;
    left: calc((100% - 50px)/2);
    background: url(../img/pop_triangle_up.svg) no-repeat 0 0;
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
.txt {
    font-size: 14px;
    height: 15px;
    width: 100%;
    color: #6a6b6c;
    margin-top: 12px;
    padding: 0 15px;
}
.grp {
    margin: 12px 0 10px 0;
    padding: 0 15px 8px 15px;
    border-bottom: 1px solid rgba(41,41,41,0.08);
}
.check {
    padding-left: 20px;
    height: 22px;
    line-height: 20px;
    font-size: 12px;
}
.check.on {
    background: url(../img/icon/ico_ui_check_on.svg) no-repeat left center;
}
.check.off {
    background: url(../img/icon/ico_ui_check.svg) no-repeat left center;
}
.search-input {
    font-family:'Segoe UI';
    font-size: 12px;
    color: #000;
    height: 28px;
    width: 288px;
    outline: none;
    text-indent: 26px;
    border: none;
    margin: 0 0 0 15px;
    border-radius: 14px;
    background: rgba(41,41,41,0.08) url(../img/icon/ico_search.svg) no-repeat 8px center;
}
.search-input::placeholder{
    color: rgba(0,0,0,0.3);
}

.lst {
    margin: 12px 0 0 0;
    padding: 0 15px 15px 15px;
    font-size: 12px;
}
.lst .head {
    font-size: 12px;
    color: #4F5051;
    height: 28px;
    line-height: 28px;
    background-color: rgba(0,0,0,0.04);
    padding-left: 10px;
}




/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>