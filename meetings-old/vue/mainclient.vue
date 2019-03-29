<template>
	<div id="mainclient" class='con con_flex_column' v-if='inMeeting' v-bind:class='{normal:!fullscreen, fullscreen:fullscreen}'>
		<div id='fuzzybg'><div></div></div>
		<con-top></con-top>
		<con-main></con-main>
		<div id='popover'>
			<pop-audio></pop-audio>
			<pop-video></pop-video>
			<pop-avconnection></pop-avconnection>
			<pop-share></pop-share>
			<pop-info></pop-info>
			<!--popmenu-panel></popmenu-panel-->
			<poptip></poptip>
			<pop-record></pop-record>
			<pop-lockpeople></pop-lockpeople>
			<popmenu-more></popmenu-more>
			<popmenu-switchsharing></popmenu-switchsharing>
		</div>
	</div>
</template>

<script>

export default {
    data() {
        return {
        	
        }
    },
    computed:{
        inMeeting(){
        	return this.$store.state.inMeeting;
        },
        fullscreen(){
        	return this.$store.state.fullscreen;
        },
    },
}
</script>

<style scoped>

#mainclient{
	position: absolute;
	transition: all 0.3s ease-out;
}

#fuzzybg{
	position: absolute; 
	width: 100%;
	height: 100%;
	overflow: hidden;
}
#fuzzybg div{
	position: absolute; 
	top: -5%; 
	left: -5%; 
	width: 110%; 
	height: 110%;
	background-image: url(../img/wallpaper.jpg);
	background-size: cover;
    -webkit-filter: blur(8px);
}
.normal {
	width: 1200px;
	height: 660px;
	top: calc((100% - 700px)/2);
	left: calc((100% - 1200px)/2);
	border: 1px solid rgba(41,41,41,0.32);
}
.fullscreen{
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border: none;
}

</style>