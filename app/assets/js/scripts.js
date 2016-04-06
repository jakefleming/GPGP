/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2016. MIT licensed.
 */
var config = {
  'waveMultiplier': 6,
  'waveTypes': [
    '<div class="wave a"></div>',
    '<div class="wave b"></div>',
    '<div class="wave c"></div>',
    '<div class="wave d"></div>',
    '<div class="wave e"></div>',
    '<div class="wave a"></div><div class="wave b"></div>',
    '<div class="wave d"></div><div class="wave e"></div>',
    '<div class="wave b"></div><div class="wave a"></div><div class="wave b"></div>',
    '<div class="wave c"></div><div class="wave d"></div><div class="wave b"></div>'
  ],
  'waveTiming': 4
};

// Utilities like random number generators
var tools = ( function() {
  'use strict';
  return {
    random: function( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1) + min );
    },
    randomRange: function( min, max, minLimit, maxLimit ) {
      var roll;

      do {
        roll = tools.random( min, max );
      }
      while( roll > minLimit && roll < maxLimit );

      return roll;
    }
  };
}());

var waves = ( function($) {
  'use strict';
  return {
    spreadWaves: function() {

      // Array of wave types
      var wave = config.waveTypes;
      // Number of times we'll create the array of wave types
      var waveMultiplier = config.waveMultiplier;

      for( var i = 0; i < waveMultiplier; i++ ) {
        for( var j = 0; j < wave.length; j++ ) {

          var left = tools.random( 0, 100 );
          var top = tools.random( 0, 100 );

          // Delay the animation by how far from the left waves are. Creates a ripple effect.
          var delay = config.waveTiming * ( left / 100 );

          $( '.wave-container' ).append( '<div class="wave-group animated infinite wave-bob" id="group_'+ i + '_' + j +'"' +
            'style="left: '+ left +'vw; top: '+ top +'vh; animation-delay: -'+ delay +'s;"' +
            '>');
          $( '#group_' + i + '_' + j ).append( wave[j] );
        }
      }
    }
  };
}(jQuery));

var scene = ( function() {
  'use strict';
  return {
    timeOfDay: function() {
      var d = new Date();
      var n = d.getHours();
      if (n > 19 || n < 7) {
        // If time is after 7PM or before 7AM, apply night theme to ‘body’
        return 'night';
      } else if (n > 16 && n < 19) {
        // If time is between 4PM – 7PM sunset theme to ‘body’
        return 'sunset';
      } else {
        // Else use ‘day’ theme
        return 'day';
      }
    },
    setup: function() {
      document.body.className = scene.timeOfDay();
    }
  };
}());

var objects = ( function($) {
  'use strict';
  return {
    spreadObjects: function() {
      // function isCollide(a, b) {
      //     return !(
      //         ((a.y + a.height) < (b.y)) ||
      //         (a.y > (b.y + b.height)) ||
      //         ((a.x + a.width) < b.x) ||
      //         (a.x > (b.x + b.width))
      //     );
      // }
      $( '.object-container' ).each( function() {
        var top   = tools.randomRange( 10, 90, 38, 68 );
        var left  = tools.randomRange( 10, 90, 38, 68 );
        var z     = Math.floor( top ) + ( $(this).height() / 8);
        var delay = ( config.waveTiming - 1.5 ) * ( left / 100 ) * -1 + 's';

        $(this).css({
          'top': top + 'vh',
          'left': left + 'vw',
          'z-index': z,
          'animation-delay': delay,
          '-webkit-animation-delay': delay
        });
      });
    }
  };
}(jQuery));

// IIFE
(function ($, window, document, undefined) {

  'use strict';

  scene.setup();
  waves.spreadWaves();
  objects.spreadObjects();

  // Events

  $( '.pause-animation--btn' ).click( function() {
    $( 'body' ).toggleClass( 'pause-animation' );
  });

})(jQuery, window, document);
