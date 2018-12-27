(function() {
  window.onload = function() {
    const group1 = document.getElementById('ico-group1'),
      group2 = document.getElementById('ico-group2'),
      group1_bg1 = document.getElementById('group1-bg1'),
      group1_bg2 = document.getElementById('group1-bg2'),
      ico_record = document.getElementById('ico-record'),
      ico_pause = document.getElementById('ico-pause'),
      ico_resume = document.getElementById('ico-resume'),
      cursor = document.getElementById('cursor');

    const t5 = 5,
      t10 = 10,
      t20 = 20
      t100 = 100;

    const animation = new Ash.S(
      [
        // start

        {
          dom: group1,
          css: [
            { transform: 'translateX(100px)' },
            { transform: 'translateX(88px)' },
          ],
          time: t20,
          delay: 0,
          tween: 'easeInOut',
        },
        {
          dom: group2,
          css: [
            { opacity: 0, transform: 'translateX(100px)' },
            { opacity: 1, transform: 'translateX(112px)' },
          ],
          time: t20,
          delay: 0,
          tween: 'easeInOut',
        },
        {
          dom: group1_bg1,
          attr: [
            {},
            {
              display: 'none',
            },
          ],
          time: t20,
          delay: 0,
          tween: 'easeInOut',
        },
        {
          dom: group1_bg2,
          attr: [
            {
              transform: 'translate(16 0)',
            },
            {
              transform: 'translate(0 0)',
            },
          ],
          time: t20,
          delay: 0,
          tween: 'easeInOut',
        },
        {
          dom: ico_record,
          css: [{ opacity: 1 }, { opacity: 0 }],
          attr: [
            {
              transform: 'translate(0 0) scale(1)',
            },
            {
              transform: 'translate(8 8) scale(0)',
            },
          ],
          time: t20,
          delay: 0,
          tween: 'easeInOut',
        },
        {
          dom: ico_pause,
          css: [{ opacity: 0 }, { opacity: 1 }],
          attr: [
            {
              transform: 'translate(8 8) scale(0)',
            },
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
          ],
          time: t20,
          delay: t10,
          tween: 'easeInOut',
        },
        {
          dom: ico_pause,
          attr: [
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
            {
              transform: 'translate(0 0) scale(1)',
            },
          ],
          time: t10,
          delay: t20 + t10,
          tween: 'easeInOut',
        },


        // pause

        {
          dom: ico_pause,
          css: [{ opacity: 1 }, { opacity: 0 }],
          attr: [
            {
              transform: 'translate(0 0) scale(1)',
            },
            {
              transform: 'translate(8 8) scale(0)',
            },
          ],
          time: t20,
          delay: t100,
          tween: 'easeInOut',
        },
        {
          dom: ico_resume,
          css: [{ opacity: 0 }, { opacity: 1 }],
          attr: [
            {
              transform: 'translate(8 8) scale(0)',
            },
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
          ],
          time: t10,
          delay: t100+t10,
          tween: 'easeInOut',
        },
        {
          dom: ico_resume,
          attr: [
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
            {
              transform: 'translate(0 0) scale(1)',
            },
          ],
          time: t10,
          delay: t100+t10+t10,
          tween: 'easeInOut',
        },


        // stop

        {
          dom: group1,
          css: [
            { transform: 'translateX(88px)' },
            { transform: 'translateX(100px)' },
          ],
          time: t20,
          delay: t100+t100,
          tween: 'easeInOut',
        },
        {
          dom: group2,
          css: [
            { opacity: 1, transform: 'translateX(112px)' },
            { opacity: 0, transform: 'translateX(100px)' },
          ],
          time: t20,
          delay: t100+t100,
          tween: 'easeInOut',
        },
        {
          dom: group1_bg1,
          attr: [
            {
              display: 'block',
            },
            {
              display: 'block',
            },
          ],
          time: t20,
          delay: t100+t100,
          tween: 'easeInOut',
        },
        {
          dom: group1_bg2,
          attr: [
            {
              transform: 'translate(0 0)',
            },
            {
              transform: 'translate(16 0)',
            },
          ],
          time: t20,
          delay: t100+t100,
          tween: 'easeInOut',
        },
        {
          dom: ico_resume,
          css: [{ opacity: 1 }, { opacity: 0 }],
          attr: [
            {
              transform: 'translate(0 0) scale(1)',
            },
            {
              transform: 'translate(8 8) scale(0)',
            },
          ],
          time: t20,
          delay: t100+t100,
          tween: 'easeInOut',
        },
        {
          dom: ico_record,
          css: [{ opacity: 0 }, { opacity: 1 }],
          attr: [
            {
              transform: 'translate(8 8) scale(0)',
            },
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
          ],
          time: t10,
          delay: t100+t100+t10,
          tween: 'easeInOut',
        },
        {
          dom: ico_record,
          attr: [
            {
              transform: 'translate(-0.8 -0.8) scale(1.1)',
            },
            {
              transform: 'translate(0 0) scale(1)',
            },
          ],
          time: t10,
          delay: t100+t100+t10+t10,
          tween: 'easeInOut',
        },
      ],
      1,
      () => setTimeout(reset, 1200)
    );

    reset = () => {
      animation.play();
    };

    animation.play();
  };
})();
