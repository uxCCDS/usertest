$(function() {
  playAnimation = () => {
    if ($('.checkbox').attr('data-checked') == 0) {
      $('.checkbox').attr('data-checked', 1);
      $('.checkbox .check-svg').addClass('checked');
      $('.checkbox .check-svg2').addClass('checked');
      $('.checkbox .check-circle').addClass('checked');
      $('.checkbox .check-mark').addClass('checked');
      $('.checked-animation').show();
      $('.checked-animation').addClass('stroke-animate');

      setTimeout(playAnimation, 1200);

    } else {
      $('.checkbox').attr('data-checked', 0);
      $('.checkbox .check-svg').removeClass('checked');
      $('.checkbox .check-svg2').removeClass('checked');
      $('.checkbox .check-circle').removeClass('checked');
      $('.checkbox .check-mark').removeClass('checked');
      $('.checked-animation').hide();
      $('.checked-animation').removeClass('stroke-animate');

      setTimeout(playAnimation, 1200);
    }
  }

  setTimeout(playAnimation, 600);

});