<template>
	<div id="desktop" >
		<div id='taskbar'></div>
		<signin></signin>
		<mainclient></mainclient>
		<div id='ptcover'>
			<div class='alert'>Your browser is not supported for this application. Please use <b>Google Chrome</b>.</div>
			<div class='title'>WebEx Prototype</div>
			<div class='btn_start uibutton green' v-on:click='start' >Start</div>
			<div class='instruction' >
				Press <b>+</b> to add people.<br>
				Press <b>Alt+S (Win)</b>, <b>Option+S (Mac)</b> to start sharing.<br>
				Press <b>Alt+C (Win)</b>, <b>Option+C (Mac)</b> to show chat messages.<br>
			</div>
			<div class='ver' >V1.0(20180330)</div>
		</div>
	</div>
</template>

<script>

export default {
    data() {
        return {
        	
        }
    },
    mounted(){
    	if(!validateBrowser()){
    		$('.alert').show();
    		$('.btn_start').addClass('disabled');
    	}
    },
    computed:{
        fullscreen(){
        	return this.$store.state.fullscreen;
        },
    },
    methods:{
        start(evt){
        	$('#ptcover').remove();
        	$('#desktop').hide();

        	setTimeout(()=>{
        		this.launchFullscreen();
        	}, 50);

        	setTimeout(()=>{
        		$('#desktop').show();
        	}, 800);

        },
        launchFullscreen(){
        	let element = document.documentElement;
            if(element.requestFullscreen) {
				element.requestFullscreen();
			} else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if(element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if(element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
        },
    }
}
</script>

<style scoped>
#ptcover{
	position: absolute;
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #fff;
}
#ptcover .title{
	position: absolute;
	width: 100%;
	height: 50px;
	top: 166px;
	font-size: 50px;
	font-family: 'Segoe UI Light';
}
#ptcover .btn_start{
	margin: 555px auto 0 auto;
	width: 160px;
	height: 48px;
	font-size: 20px;
	line-height: 46px;
	border-radius: 24px;
}
#ptcover .instruction{
	position: absolute;
	width: 100%;
	height: 80px;
	font-size: 14px;
	bottom: 0px;
}
#ptcover .ver{
	position: absolute;
	height: 11px;
	font-size: 11px;
	bottom: 15px;
	color: rgba(0,0,0,0.5);
	padding: 0 10px;
}

#desktop {
	margin: 0 auto;
	display: block; 
	width: 1366px; 
	height: 768px;
	background: url(../img/wallpaper.jpg) no-repeat center top;
	background-size: contain;
}
#taskbar {
	position: absolute; 
	bottom: 0px; 
	left: 0px; 
	display: block; 
	width: 100%; 
	height: 40px;
	background: url(../img/desktop_taskbar.svg) no-repeat center top;
}
.alert {
	display: none;
	width: 100%;
	height: 40px;
	text-align: center;
	background-color: #FFFF9D;
	line-height: 40px;
	font-size: 16px;
	box-shadow: 0px 0px 1px rgba(0,0,0,0.5);
}

</style>