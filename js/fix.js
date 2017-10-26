(function(){
	var WIN = $(window),
		DOC = $(document);
	var BounceScrollFix = function(){
		this.init();
	};
	BounceScrollFix.prototype={
		init:function(){
			var tar,
				needStop = true,
				sy,
				smax,
				y;

			DOC.bind('touchstart',function(e){
				tar = e.target;
				y = e.originalEvent.targetTouches[0].pageY;
				sy=0,
				smax=0;
				needStop = true;

				if(tar.className.indexOf('ENABLESCROLL')!==-1){
					sy = tar.scrollTop;
				}else{
					while(tar=tar.parentNode){
						if(tar && tar.className && tar.className.indexOf('ENABLESCROLL')!==-1){
							sy = tar.scrollTop;
							smax = tar.scrollHeight - tar.clientHeight;
							break;			
						}
					}
				}

			});

			DOC.bind('touchmove',function(e){
				if(tar){
					//console.log(e);
					var _y = e.originalEvent.targetTouches[0].pageY,
						_sy = sy+y-_y;
					if(_sy>=0 && _sy<=smax){
						needStop = false;	
					}else{
						needStop = true;
					}
				}
				needStop && e.preventDefault();
			});
		}
	};

	$(function(){
		new BounceScrollFix();
	});

})();