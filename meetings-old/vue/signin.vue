<template>
	<div id="signin" v-if='!inMeeting' >
		<div class='page page1'>
			<div class="btn btn_next" v-on:click='showPage(2)'></div>
			<div class="btn btn_skip" v-on:click='meetNow'></div>
		</div>
		<div class='page page2'>
			<div class="btn btn_next" v-on:click='showPage(3)'></div>
		</div>
		<div class='page page3'>
			<div class="tabc das_tabc1">
				<div class="btn btn_meet" v-on:click='meetNow'></div>
			</div>
			<div class="tabc das_tabc2" style='display:none;'>
				<div class="btn btn_join" v-on:click='meetNow'></div>
			</div>
			<div class="tabc das_tabc3" style='display:none;'></div>
			
			<div class="btn tab1" v-on:click='goDasTab(1)'></div>
			<div class="btn tab2" v-on:click='goDasTab(2)'></div>
			<div class="btn tab3" v-on:click='goDasTab(3)'></div>

		</div>
	</div>
</template>

<script>

export default {
    data() {
        return {
        	skipSigninAndGotoMeetingList: false
        }
    },
    computed:{
        inMeeting(){
        	return this.$store.state.inMeeting;
        },
    },
    mounted(){
        this.showPage(1);

        // skip signin and add all people
        let skip = getQueryString('skip');
        if(skip){
        	$('#ptcover').remove();
            this.$store.commit('inMeeting', true);
        }

        // show meeting list tab
        let usertesting = getQueryString('usertesting');
        if(usertesting || this.skipSigninAndGotoMeetingList){
        	this.showPage(3);
        	this.goDasTab(2);
        }
    },
    methods:{
        showPage(id){
            $('.page').hide();
            $('.page'+id).show();
        },
        goDasTab(id){
        	$('.page3 .tabc').hide();
            $('.page3 .das_tabc'+id).show();
        },
        meetNow(evt){
        	this.$store.commit('inMeeting', true);
        },
    }
}
</script>

<style scoped>


#signin{
	position: absolute;
	width: 360px;
	height: 486px;
	top: 100px;
	left: 500px;
	transition: all 0.3s ease-out;
}
.page {
	width: 100%;
	height: 100%;
	display: none;
}
.page1{
	background: url(../img/signin_1.png) no-repeat center top;
}
.page2{
	background: url(../img/signin_2.png) no-repeat center top;
}
.page3 .das_tabc1{
	background: url(../img/dasboard_t1.png) no-repeat center top;
}
.page3 .das_tabc2{
	background: url(../img/dasboard_t2.png) no-repeat center top;
}
.page3 .das_tabc3{
	background: url(../img/dasboard_t3.png) no-repeat center top;
}
.tabc{
	width: 100%;
	height: 100%;
}

.btn {
	position: absolute;
	pointer-events: auto;
	cursor: pointer;
	background-color: rgba(255,0,0,0);
}
.page1 .btn_next {
	width: 256px;
	height: 32px;
	top: 256px;
	left: 53px;
}
.page2 .btn_next {
	width: 161px;
	height: 32px;
	top: 340px;
	left: 99px;
}
.btn_meet {
	width: 160px;
	height: 32px;
	top: 122px;
	left: 100px;
}
.btn_join {
	width: 60px;
	height: 32px;
	top: 136px;
	left: 275px;
	background-color: rgba(255,0,0,0);
}

.page3 .tab1{
	width: 106px;
	height: 32px;
	bottom: 24px;
	left: 21px;
}
.page3 .tab2{
	width: 106px;
	height: 32px;
	bottom: 24px;
	left: 127px;
}
.page3 .tab3{
	width: 106px;
	height: 32px;
	bottom: 24px;
	left: 233px;
}

.btn_skip {
	width: 160px;
	height: 160px;
	top: 40px;
	left: 100px;
	cursor: default;
}

</style>