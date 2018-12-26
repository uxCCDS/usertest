$(function() {

  loaded = () => {
    $('.spinner-w').addClass('loaded');
    $('.spinner-c').hide();
    $('.label1').addClass('hidelabel1');
    $('.label2').addClass('showlabel2');

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
            setTimeout(replay, 2000);
          }
        },
      }
    );

    setTimeout(setClipPath, 320);

  }
  setClipPath = () => {
    $('#icon-spinner').attr('clip-path', 'url(#arrow-clip-path)');
    $('#arrow-clip-path').addClass('arrowup');
  }

  replay = () => {
    $('.spinner-w').removeClass('loaded');
    $('.spinner-c').show();
    $('.label1').removeClass('hidelabel1');
    $('.label2').removeClass('showlabel2');
    $('.loading-button').css('width', '76px');

    $('#icon-spinner').attr('clip-path', 'url(#spinner-clip-path)');
    $('#arrow-clip-path').removeClass('arrowup');

    setTimeout(loaded, 2000);
  }

  setTimeout(loaded, 2000);

});