<template>
	<div id="con_top" class='flex_none' v-bind:class='{fullscreen:fullscreen}' v-bind:style='{height:height}' >
		<div class='win_min'></div>
		<div class='win_max'></div>
		<div class='win_x'></div>

		<span class='title'>{{ name }}</span>
		<div class='menubar'>
			<span>File</span>
			<span>Edit</span>
			<span>Share</span>
			<span>View</span>
			<span>Audio</span>
			<span>Participant</span>
			<span>Meeting</span>
			<span>Help</span>
		</div>
		<div class='statusbar'>
			<div class='ico_empty'></div>
			<div v-if='recording' class='ico_recorder'></div>
			<div v-if='locked' class='ico_lock'></div>
			<div v-if='recording || locked' class='splitter'></div>
			<div class='cnnt'>Connected</div>
		</div>

	</div>
</template>

<script>

export default {
    data() {
        return {
        	name:'Cisco WebEx Meeting Center',
        }
    },
    computed:{
    	headerHeight(){
            return this.$store.state.headerHeight;
        },
    	height(){
    		return this.headerHeight + 'px';
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

    },
}
</script>

<style scoped>

#con_top{
	position:relative;
	width: 100%; 
	background-color: rgba(255,255,255,0.64);
	overflow: hidden;
	transition: all 0.3s ease-out;
}
#con_top.fullscreen {
	height: 0 !important; 
}
#con_top .win_min {
	position: absolute;
	top: 5px;
	right: 102px;
	width: 16px;
	height: 16px;
	background: url(../img/icon/win_min.svg) no-repeat center center;
	cursor: pointer;
}
#con_top .win_max {
	position: absolute;
	top: 5px;
	right: 55px;
	width: 16px;
	height: 16px;
	background: url(../img/icon/win_max.svg) no-repeat center center;
	cursor: pointer;
}
#con_top .win_x {
	position: absolute;
	top: 5px;
	right: 12px;
	width: 16px;
	height: 16px;
	background: url(../img/icon/win_x.svg) no-repeat center center;
	cursor: pointer;
}
#con_top .title {
	position: absolute;
	top: 5px;
	left: 10px;
	font-size: 12px;
}
#con_top .menubar {
	position: absolute;
	bottom: 10px;
	left: 10px;
	height: 16px;
	line-height: 16px;
}
#con_top .menubar span{
	margin-right: 20px;
	font-size: 12px;
	line-height: 16px;
}
#con_top .statusbar {
	position: absolute;
	bottom: 10px;
	right: 10px;
	height: 16px;
	line-height: 16px;
}
#con_top .statusbar .cnnt{
	display: inline-block;
	padding: 0 10px 0 4px;
	font-size: 12px;
	vertical-align: middle;
	background: url(../img/icon/ico_dot_blue.svg) no-repeat right center;
}
#con_top .statusbar .ico_empty{
	display: inline-block;
	width: 1px;
	height: 16px;
	vertical-align: middle;
}
#con_top .statusbar .ico_recorder{
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: middle;
	background: url(../img/icon/ico_sts_recorder.svg) no-repeat center center;
	margin-left: 4px;
	animation: blinker 1.6s linear infinite;	
}
@keyframes blinker {  
  50% { opacity: 0; }
}
#con_top .statusbar .ico_lock{
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: middle;
	background: url(../img/icon/ico_sts_lock.svg) no-repeat center center;
	margin-left: 4px;
}
#con_top .statusbar .splitter{
	display: inline-block;
	width: 1px;
	height: 10px;
	vertical-align: middle;
	background-color: rgba(41,41,41,0.24); 
	margin-left: 4px;
}

</style>