<template>
    <transition name="fade">
    <div id='pop_share' v-show='popShareVisible' >
        <div class='triangle'></div>
        <div class='close' v-on:click.stop='close' ></div>
        <div class='wrap'>
            <div class='title'>Share Content</div>

            <div class='row'>

                <div class='itm screen1'>
                    <div class='thumb'></div>
                    <div class='msk'>
                        <div class='btn'>Share</div>
                    </div>
                    <div class='lb'>Screen 1</div>
                </div>

                <div class='itm screen2'>
                    <div class='thumb'></div>
                    <div class='msk'>
                        <div class='btn'>Share</div>
                    </div>
                    <div class='lb'>Screen 2</div>
                </div>

            </div>
            <div class='spline'></div>
            <div class='row'>

                <div class='itm app1'>
                    <div class='thumb'></div>
                    <div class='msk'>
                        <div class='btn'>Share</div>
                    </div>
                    <div class='lb'>PowerPoint</div>
                </div>

                <div class='itm app2'>
                    <div class='thumb'></div>
                    <div class='msk'>
                        <div class='btn'>Share</div>
                    </div>
                    <div class='lb'>Sketch</div>
                </div>

                <div class='itm app3'>
                    <div class='thumb'></div>
                    <div class='msk'>
                        <div class='btn'>Share</div>
                    </div>
                    <div class='lb'>Acrobat Reader</div>
                </div>

            </div>
            <div class='spline'></div>
            <div class='row'>

                <div class='itm type1'>
                    <div class='thumb'></div>
                    <div class='lb'>Share File</div>
                </div>

                <div class='itm type2'>
                    <div class='thumb'></div>
                    <div class='lb'>Other Applications</div>
                </div>

                <div class='itm type3'>
                    <div class='thumb'></div>
                    <div class='lb'>New Whiteboard</div>
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
        popShareVisible(){
            return this.$store.state.popShareVisible;
        },
        popStartPoint(){
            return this.$store.state.popStartPoint;
        },
    },
    mounted(){
        this.domParent = $('#con_main');
        this.domSelf = $('#pop_share');
    },
    watch: {
        popShareVisible: function (newVal) {
            if(newVal){
                let left = this.popStartPoint[0];
                let top = this.popStartPoint[1] - 20;
                $('#pop_share').css('left', left+'px');
                $('#pop_share').css('top', top+'px');
                window.addEventListener('mousedown', this.onMouseDown);
            }else{
                window.removeEventListener('mousedown', this.onMouseDown);
            }
        },

    },
    methods:{
        onMouseDown(evt){
            if( !$('#controls .btn_share').hitTest(evt.pageX, evt.pageY) && this.domSelf.length && !this.domSelf.hitTest(evt.pageX, evt.pageY) ){
                this.close();
            }
        },
        close(evt){
           this.$store.commit('popShareVisible', false); 
        }
    }

}
</script>

<style scoped>
#pop_share {
    transition: all 0.2s ease-out;
    position: absolute;
    width: 560px;
    background-color: #FFF;
    border-radius: 5px;
    transform:rotate(0deg);
    transform:translate(-50%,-100%);
    pointer-events: auto;
    box-shadow: 0px 0px 1px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.15);
}
.triangle {
    position: absolute;
    width: 50px;
    height: 20px;
    bottom: -20px;
    left: calc((100% - 50px)/2);
    background: url(../img/pop_triangle_down.svg) no-repeat 0 0;
}
.wrap{
    margin: 0 50px 16px 50px;
    text-align: center;
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
.row {
    
}
.spline {
    height: 1px;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    width: 432px;
}
.itm {
    display: inline-block;
    width: 136px;
    height: 102px;
    margin: 12px 3px 5px 3px;
    border-radius: 6px;
    overflow: hidden;
}
.itm .lb{
    display: inline-block;
    margin-top: 75px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
}
.itm .thumb{
    position: absolute;
    top: 4px;
    left: 4px;
    width: 128px;
    height: 72px;
    background-color: rgba(0,0,0,0.08);
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 4px;
    overflow: hidden;
}
.itm .msk{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(4,159,217,0.08);
    display: none;
}
.itm .msk .btn{
    width: 80px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    text-align: center;
    background-color: #049FD9;
    color: #fff;
    font-size: 14px;
    margin: 24px auto;
}
.itm:hover .msk{
    display: block;
}

.screen1 .thumb,
.screen2 .thumb {
    background-image: url(../img/sharing_thumb_screen.png);
}
.app1 .thumb {
    background-image: url(../img/sharing_thumb_app1.png);
}
.app2 .thumb {
    background-image: url(../img/sharing_thumb_app2.png);
}
.app3 .thumb {
    background-image: url(../img/sharing_thumb_app3.png);
}
.app1 .lb {
    padding-left: 20px;
    background: url(../img/sharing_ico_app1.png) no-repeat left center;
}
.app2 .lb {
    padding-left: 20px;
    background: url(../img/sharing_ico_app2.png) no-repeat left center;
}
.app3 .lb {
    padding-left: 20px;
    background: url(../img/sharing_ico_app3.png) no-repeat left center;
}
.type1 .thumb {
    background-image: url(../img/icon/ico_share_file.svg);
}
.type2 .thumb {
    background-image: url(../img/icon/ico_share_app.svg);
}
.type3 .thumb {
    background-image: url(../img/icon/ico_share_wb.svg);
}

/* ----- animation ----- */
.fade-enter-active, .fade-leave-active {
    transition: all .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
}

</style>