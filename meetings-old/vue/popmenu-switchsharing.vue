<template>
    <transition name="fade">
	<div id='popmenu_switchsharing' v-show='popmenuSwitchSharingVisible' >
        <div class='triangle'></div>
        <div class='wrap'>
            <div class='itm menuitm' v-bind:class='{selected:currentSharing=="screen"}' v-on:click.stop='switchSharing("screen")' >
                <span class="lb">{{ activeSpeakerName }}’s screen</span>
            </div>

            <div class='itm menuitm' v-bind:class='{selected:currentSharing=="doc"}' v-on:click.stop='switchSharing("doc")' >
                <span class="lb">Presentation.pdf</span>
            </div>

            <div class='itm menuitm' >
                <span class="lb">High-level Concept.key</span>
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
        popmenuSwitchSharingVisible(){
            return this.$store.state.popmenuSwitchSharingVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        activeSpeakerName(){
            return this.$store.state.activeSpeakerName;
        },
        currentSharing(){
            return this.$store.state.currentSharing;
        },
    },
    mounted(){
        
    },
    watch: {
        popmenuSwitchSharingVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] + 18;
                $('#popmenu_switchsharing').css('left', left+'px');
                $('#popmenu_switchsharing').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        }
    },
    methods:{
        switchSharing(type){
            this.$store.commit('currentSharing', type);
            this.$store.commit('popmenuSwitchSharingVisible', false);
        },
        onMouseDown(evt){
            if( !$('.top_label span').hitTest(evt.pageX, evt.pageY) && $('#popmenu_switchsharing').length && !$('#popmenu_switchsharing').hitTest(evt.pageX, evt.pageY) ){
                this.$store.commit('popmenuSwitchSharingVisible', false);
            }
        }
    }

}
</script>

<style scoped>
#popmenu_switchsharing {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 188px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    transform:translate(-50%,0);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    width: 48px;
    height: 19px;
    top: -19px;
    left: calc((100% - 48px)/2);
    background: url(../img/pop_triangle_up.svg) no-repeat 0 0;
}
.wrap{
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
}
.itm{
    width: 100%;
    height: 40px;
    padding-left: 13px;
    cursor: pointer;
}
.itm .lb{
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    pointer-events: none;
}
.selected {
    color: #049FD9;
}

/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>