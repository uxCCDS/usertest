window.mainFunc = function(hypeDocument){

  const gap = 6;
  const stageW = $('#stage').width();
  const stageH = $('#stage').height();
  let step = null;
  let distance_0_1 = 1000;
  const offset = 50;

  let html = '';
  html += '<div id="block0" class="block"><div class="inside"><div class="hitarea"></div></div></div>';
  html += '<div id="block1" class="block"><div class="inside"><div class="hitarea"></div></div></div>';
  html += '<div id="block3" class="block"><div class="inside"><div class="hitarea"></div></div></div>';
  html += '<div id="block2" class="block"><div class="inside"><div class="hitarea"></div></div></div>';
  html += '<div id="cursorfeedback"><div class="bg"></div><div class="circle"></div><div class="circle2"></div></div>';

  $('#stage').html(html);

  $('#block1').css('left', stageW);
  $('#block2').css('left', stageW);
  $('#block3').css('left', stageW);

  $('#block1').css('opacity', 0);
  $('#block2').css('opacity', 0);
  $('#block3').css('opacity', 0);

  $('.block .hitarea').hide();
  $('#cursorfeedback').hide();


  $('body').on('mouseover', evt => {
    let mouseX = evt.pageX;
    let mouseY = evt.pageY;
    if( $('#block0').hitTest(mouseX, mouseY) || $('#block1').hitTest(mouseX, mouseY) || $('#block2').hitTest(mouseX, mouseY) || $('#block3').hitTest(mouseX, mouseY) ){
      setHitarea();
    }else{
      $('.hitarea').hide();
    }
  });

  $('body').on('click', () => {

    if (!step) {
      step = '4-same-grids-joined'

      $('#block0').attr('join-point', 'TR');
      $('#block1').attr('join-point', 'BR');
      $('#block2').attr('join-point', 'BL');
      $('#block3').attr('join-point', 'TL');

      let b0x = $('#block0').position().left;
      let b0y = $('#block0').position().top;
      let bw = $('#block0').width();
      let bh = $('#block0').height();

      $('#block1').animate(
          {
            left: b0x,
            opacity: 1
          },
          {
            queue:false,
            duration:400,
            easing:"easeOutQuad",
          }
        );

      $('#block2').animate(
          {
            left: b0x+bw,
            opacity: 1
          },
          {
            queue:false,
            duration:500,
            easing:"easeOutQuad",
          }
        );

      $('#block3').animate(
          {
            left: b0x+bw,
            opacity: 1
          },
          {
            queue:false,
            duration:600,
            easing:"easeOutQuad",
          }
        );

      //setTimeout(playClickSound, 400);

    } else if (step == '4-same-grids-joined') {

      step = '4-same-grids-apart'

      let b0x = $('#block0').position().left;
      let b0y = $('#block0').position().top;

      $('#cursorfeedback').css('top', b0y-44);
      $('#cursorfeedback').css('left', b0x+$('#block0').width()-44);

      playCursorFeedback();

      

      $('#block0').animate(
          {
            left: '-='+offset,
            top: '+='+offset,
            opacity: 1
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );

      $('#block1').animate(
          {
            left: '-='+offset,
            top: '-='+offset,
            opacity: 1
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );

      $('#block2').animate(
          {
            left: '+='+offset,
            top: '-='+offset,
            opacity: 1
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );

      $('#block3').animate(
          {
            left: '+='+offset,
            top: '+='+offset,
            opacity: 1
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );



      // set drag & drop

      $("#block1").draggable({
        snap: "#block0",
        start: function() {
          
        },
        drag: function() {
          const t0 = $('#block0').position().top;
          const b1 = $('#block1').position().top+$('#block1').height();
          if(t0 - b1 == 0 && distance_0_1 != 0){
            playClickSound()
          }

          const htaw = $('.block .hitarea').width();
          const bw0 = $('#block0 .inside').width();
          const bh0 = $('#block0 .inside').height();
          const bw1 = $('#block1 .inside').width();
          const bh1 = $('#block1 .inside').height();

          if(t0 - b1 > 0 && t0 - b1 < 40){
            $('#block0 .hitarea').css('top', -(htaw+gap)/2);
            $('#block0 .hitarea').css('left', (bw0-htaw)/2);
            $('#block0 .hitarea').show();
            
            $('#block1 .hitarea').css('top', bh1-(htaw-gap)/2);
            $('#block1 .hitarea').css('left', (bw1-htaw)/2);
            $('#block1 .hitarea').show();

          }else{
            $('#block0 .hitarea').hide();
            $('#block1 .hitarea').hide();
          }
        },
        stop: function() {
          const t0 = $('#block0').position().top;
          const b1 = $('#block1').position().top+$('#block1').height();
          distance_0_1 = t0 - b1;
        }
      });


      let inside2_3=false;
      $("#block2").draggable();
      $("#block3").droppable({
        accept:"#block2",
        over: function() {
          inside2_3 = true;
          $("#block2 .inside").addClass('shadow');
        },
        out: function() {
          inside2_3 = false;
          $("#block2 .inside").removeClass('shadow');
        },
        drop: function( event, ui ) {
          if(inside2_3){
            $("#block2 .inside").removeClass('shadow');

            playClickSound();

            let bx = $('#block2').position().left;
            let by = $('#block2').position().top;

            $('#cursorfeedback').css('top', by+$('#block2').height()/2-44);
            $('#cursorfeedback').css('left', bx+$('#block2').width()/2-44);

            playCursorFeedback();

            // 2+3
            $('#block2').animate(
                {
                  left: $('#block3').position().left,
                  top: $('#block3').position().top,
                },
                {
                  queue:false,
                  duration:200,
                  easing:"easeInOutQuart",
                  complete: function(){
                    $('#block2').hide();
                    $('#block3').animate(
                      {
                        left: '-='+offset,
                        top: 200+offset,
                        height: 200,
                      },
                      {
                        queue:false,
                        duration:500,
                        easing:"easeInOutQuart",
                      }
                    );


                    // 0-1
                    $('#block0').animate(
                        {
                          left: '+='+offset,
                          top: 300+offset,
                        },
                        {
                          queue:false,
                          duration:500,
                          easing:"easeInOutQuart",
                        }
                      );

                    $('#block1').animate(
                        {
                          left: '+='+offset,
                          top: 200+offset,
                        },
                        {
                          queue:false,
                          duration:500,
                          easing:"easeInOutQuart",
                        }
                      );

                    setTimeout(playClickSound, 400);

                    step = '3-grids'
                    $('#block0').attr('join-point', 'TR');
                    $('#block1').attr('join-point', 'BR');
                    $('#block3').attr('join-point', 'ML');


                  }
                }
              );

            


          }
        }
      });



    } else if (step == '3-grids') {
      step = '3-grids-thin'

      $('#block3').animate(
          {
            width: 32,
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );
    } else if (step == '3-grids-thin') {

      $('#block1').animate(
          {
            top: $('#block0').position().top - 32,
            height: 32,
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
          }
        );

      $('#block3').animate(
          {
            left: $('#block0').position().left - 32,
          },
          {
            queue:false,
            duration:500,
            easing:"easeInOutQuart",
            complete: function(){

              $('#block3').animate(
                  {
                    top: $('#block0').position().top - 32,
                    height: 100+32,
                  },
                  {
                    queue:false,
                    duration:500,
                    easing:"easeInOutQuart",
                    complete: function(){

                    }
                  }
                );

            }
          }
        );

      // switch dark mode
      $('body').off('click');


      $('#block0').on('click', evt => {
        evt.stopPropagation();
        if($('#block0').attr('darkmode')==undefined || $('#block0').attr('darkmode') == 0){
          $('#block0 .inside').css('background-color', '#222');
          $('#block0').attr('darkmode', 1);
        }else{
          $('#block0 .inside').css('background-color', '#D8D8D8');
          $('#block0').attr('darkmode', 0);
        }
      });

      $('#block1').on('click', evt => {
        evt.stopPropagation();
        if($('#block1').attr('darkmode')==undefined || $('#block1').attr('darkmode') == 0){
          $('#block1 .inside').css('background-color', '#222');
          $('#block1').attr('darkmode', 1);
        }else{
          $('#block1 .inside').css('background-color', '#D8D8D8');
          $('#block1').attr('darkmode', 0);
        }
      });

      $('#block3').on('click', evt => {
        evt.stopPropagation();
        if($('#block3').attr('darkmode')==undefined || $('#block3').attr('darkmode') == 0){
          $('#block3 .inside').css('background-color', '#222');
          $('#block3').attr('darkmode', 1);
        }else{
          $('#block3 .inside').css('background-color', '#D8D8D8');
          $('#block3').attr('darkmode', 0);
        }
      });

    }

  });


  function setHitarea(){
    if(step == '4-same-grids-apart' || step == '3-grids-thin'){
      return;
    }
    $('.block .hitarea').show();
    const htaw = $('.block .hitarea').width();
    for(let i=0; i<4; i++){
      const jp = $('#block'+i).attr('join-point');
      const bw = $('#block'+i+' .inside').width();
      const bh = $('#block'+i+' .inside').height();
      if(jp == 'TL'){
        $('#block'+i+' .hitarea').css('top', -(htaw+gap)/2 );
        $('#block'+i+' .hitarea').css('left', -(htaw+gap)/2 );
      }else if(jp == 'TR'){
        $('#block'+i+' .hitarea').css('top', -(htaw+gap)/2 );
        $('#block'+i+' .hitarea').css('left', bw-(htaw-gap)/2 );
      }else if(jp == 'BL'){
        $('#block'+i+' .hitarea').css('top', bh-(htaw-gap)/2 );
        $('#block'+i+' .hitarea').css('left', -(htaw+gap)/2 );
      }else if(jp == 'BR'){
        $('#block'+i+' .hitarea').css('top', bh-(htaw-gap)/2 );
        $('#block'+i+' .hitarea').css('left', bw-(htaw-gap)/2 );
      }else if(jp == 'ML'){
        $('#block'+i+' .hitarea').css('top', bh/2-htaw/2 );
        $('#block'+i+' .hitarea').css('left', -(htaw+gap)/2 );
      }else{
        $('#block'+i+' .hitarea').hide();
      }
    }
  }


  function playCursorFeedback(){
    $('#cursorfeedback').show();
    $('#cursorfeedback .bg').css({ 'transform': 'scale(8)', 'opacity': 1 });

    setTimeout(()=>{
      $('#cursorfeedback .circle').css({ 'transform': 'scale(6)', 'opacity': 1 });

    }, 100);

    setTimeout(()=>{
      $('#cursorfeedback .circle2').css({ 'transform': 'scale(28)' });

    }, 200);

    setTimeout(()=>{
      $('#cursorfeedback').fadeOut(500);
      $('#cursorfeedback .bg').css({ 'transform': 'scale(10)', 'opacity': 0 });
      $('#cursorfeedback .circle').css({ 'transform': 'scale(8)', 'opacity': 0 });
      $('#cursorfeedback .circle2').css({ 'transform': 'scale(30)', 'opacity': 0 });
    }, 350);

    setTimeout(()=>{
      $('#cursorfeedback .bg').css({ 'transform': 'scale(1)', 'opacity': 0 });
      $('#cursorfeedback .circle').css({ 'transform': 'scale(1)', 'opacity': 1 });
      $('#cursorfeedback .circle2').css({ 'transform': 'scale(1)', 'opacity': 1 });

    }, 1200);

  }


  function playClickSound(){
    $('#soundbox').html('<audio id="clicksoundtone" src="' + hypeDocument.resourcesFolderURL() + '/click.mp3"></audio>');
    let clicksound = document.getElementById('clicksoundtone');
    clicksound.play();
  }
}