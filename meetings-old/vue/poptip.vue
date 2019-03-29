<template>
	<div id='poptip' v-show='poptipVisible' >
        <span>{{ poptipText }}</span>
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed:{
        poptipVisible(){
            return this.$store.state.poptipVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
        poptipText(){
            return this.$store.state.poptipText;
        },
    },
    mounted(){
        
    },
    watch: {
        poptipVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 12 - 5;
                $('#poptip').css('opacity', '1');
                $('#poptip').css('left', left+'px');
                $('#poptip').css('top', top+'px');
                $('#poptip').stop().delay(5000).velocity({opacity:0}, {duration:300, complete: (elements)=>{this.$store.commit('poptipVisible', false);}});
            }
        }
    },
    methods:{
        close(evt){
            this.$store.commit('poptipVisible', false);
        },
    }

}
</script>

<style scoped>
#poptip {
    transition: all 0.2s ease-out;
    position: absolute;
    background-color: rgba(0,0,0,0.8);
    border-radius: 5px;
    transform:rotate(0deg);
    transform:translate(-50%,-100%);
    padding: 13px 15px 14px 15px;
}
#poptip span{
    display: block;
    font-size: 12px;
    color: #fff;
    line-height: 16px;
    text-align: center;
}
.triangle {
    position: absolute;
    margin: 0 auto;
    bottom: -12px;
    left: calc((100% - 29px)/2);
    width: 29px;
    height: 12px;
    background: url(../img/tip_triangle_down.svg) no-repeat 0 0;
}
.close {
    position: absolute;
    height: 6px;
    width: 6px;
    top: 6px;
    right: 6px;
    background: url(../img/icon/ico_x_mini.svg) no-repeat 0 0;
    pointer-events: auto;
    cursor: pointer;
}

/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>