$(function() {
  playMotion_loadingButton = () => {
    $('.loading-button .progress').velocity(
      {
        width: '100%',
      },
      {
        duration: 2000,
        queue: false,
        easing: "linear",
        progress: (elements, complete, remaining, start, tweenValue) => {
          if (complete == 1) {
            $('.loading-button .progress').fadeOut();
            slideUp();
          }
        },
      }
    );
  }

  slideUp = () => {
    $('.loading-button .loading-wrap').velocity(
      {
        top: '-100%',
      },
      {
        duration: 250,
        queue: false,
        easing: "easeOutQuad",
      }
    );

    $('.loading-button .loaded-wrap').velocity(
      {
        top: 0,
      },
      {
        duration: 250,
        queue: false,
        easing: "easeOutQuad",
        progress: (elements, complete, remaining, start, tweenValue) => {
          if (complete == 1) {
            setTimeout(() => {
              $('.loading-button .progress').css('width', 0);
              $('.loading-button .progress').show();
              $('.loading-button .loading-wrap').css('top', 0);
              $('.loading-button .loaded-wrap').css('top', '100%');
              playMotion_loadingButton();
            }, 2000);
          }
        },
      }
    );
  }

  playMotion_loadingButton();
});