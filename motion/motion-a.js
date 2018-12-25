$(function() {
  $('.download').click(function(event) {
    if ($(this).attr('data-checked') == 0) {
      $(this).attr('data-checked', 1);
      $('.checkbox .check-svg').addClass('checked');
      $('.checkbox .check-circle').addClass('checked');
      $('.checkbox .check-mark').addClass('checked');
      $('.checked-animation').show();
      $('.checked-animation').addClass('stroke-animate');
    } else {
      $(this).attr('data-checked', 0);
      $('.checkbox .check-svg').removeClass('checked');
      $('.checkbox .check-circle').removeClass('checked');
      $('.checkbox .check-mark').removeClass('checked');
      $('.checked-animation').hide();
      $('.checked-animation').removeClass('stroke-animate');
    }
  });
});