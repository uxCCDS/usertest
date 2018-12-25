$(function() {

  loaded = () => {
    $('.spinner-w').addClass('loaded');
    $('.spinner-c').hide();
    $('.label1').fadeOut(100);
    $('.label2').delay(100).fadeIn(300);

    $('.loading-button').velocity(
      {
        width: '122px',
      },
      {
        duration: 300,
        queue: false,
        easing: "easeOutQuad",
        progress: (elements, complete, remaining, start, tweenValue) => {
          if (complete == 1) {
            
          }
        },
      }
    );
  }
  setClipPath = () => {
    $('#icon-spinner').attr('clip-path', 'url(#arrow-clip-path)');
    $('#arrow-clip-path').addClass('arrowup');
  }

  setTimeout(loaded, 2000);
  setTimeout(setClipPath, 2650);

});