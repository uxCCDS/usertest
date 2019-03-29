<template>
    <transition name="fade">
	<div id='pop_info' v-show='popInfoVisible'>
        <div class='triangle'></div>
        <div class='wrap'>
            <div class='ava'>
                <div class='avatar' v-bind:style='{backgroundImage: avatarUrl}' ></div>
            </div>
            <div class='title'>{{ meetingTitle }}</div>
            <div class='host'>
                <span class='lb'>Host:</span>
                <span class='name'>{{ hostName }}</span>
            </div>
            <div class='sec'>
                <h1>Agenda</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisc elit, sed do eiusmod tempor incididunt ut.</p>
            </div>
            <div class='sec'>
                <h1>Meeting URL</h1>
                <p>go.webex.com/meet/username</p>
            </div>
            <div class='sec'>
                <h1>Meeting number</h1>
                <p>123 456 789</p>
            </div>
            <div class='sec'>
                <h1>Host key</h1>
                <p>765432</p>
            </div>
            <!--div class='more'></div-->
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
        host(){
            let people = this.$store.getters.host;
            return people;
        },
        hostName(){
            return this.host.name;
        },
        meetingTitle(){
            return this.$store.state.meetingTitle;
        },
        popInfoVisible(){
            return this.$store.state.popInfoVisible;
        },
        headerHeight(){
            return this.$store.state.headerHeight;
        },
        fullscreen(){
            return this.$store.state.fullscreen;
        },
        avatarUrl(){
            if(this.host.avatar){
                return 'url('+this.$store.state.avatarPath+this.host.avatar+')';
            }else{
                return 'none';
            }
        },
    },
    mounted(){
        
    },
    watch: {
        popInfoVisible (newVal) {
            if(newVal){
                if(this.fullscreen){
                    $('#pop_info').css('top', '0');
                }else{
                    $('#pop_info').css('top', this.headerHeight+'px');
                }
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },
    },
    methods:{
        onMouseDown(evt){
            if( !$('.btn_info').hitTest(evt.pageX, evt.pageY) && !$('#pop_info').hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popInfoVisible', false);
            }
        }
    }

}
</script>

<style scoped>
#pop_info {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 300px;
    left: 63px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    height: 49px;
    width: 19px;
    left: -19px;
    top: 3px;
    background: url(../img/pop_triangle_left.svg) no-repeat 0 0;
}
.wrap{
    margin: 15px 15px 0 15px;
    padding-bottom: 25px;
    border-radius: 5px;
    overflow: hidden;
}
.ava {
    text-align: center;
    margin-top: 6px;
    margin-bottom: 16px;
}
.avatar {
    display: inline-block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #F5F5F6;
    text-align: center;
}
.title {
    text-align: center;
    font-family: 'Segoe UI Semibold';
    font-size: 16px;
    margin-bottom: 3px;
}
.host {
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding-bottom: 15px;
    margin-bottom: 10px;
}
.host .lb {
    color: #999;
    margin-right: 6px;
}
.sec {
    font-size: 12px;
    margin-bottom: 12px;
}
.sec h1{
    font-size: 12px;
    color: #6A6B6C;
    margin-bottom: 2px;
}
.sec p{
    font-size: 12px;
    cursor: text;
    user-select: text;
}
.more {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: url(../img/icon/ico_pop_arrow_down.svg) no-repeat center;
}

/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>