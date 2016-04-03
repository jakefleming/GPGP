(function ($, window, document, undefined) {

  'use strict';

  var rando = function( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1) + min );
  };

  var distributeWaves = function() {

    var waveMultiplier = 6;
    var wave = [
      '<div class="wave a"></div>',
      '<div class="wave b"></div>',
      '<div class="wave c"></div>',
      '<div class="wave d"></div>',
      '<div class="wave e"></div>',
      '<div class="wave a"></div><div class="wave b"></div>',
      '<div class="wave d"></div><div class="wave e"></div>',
      '<div class="wave b"></div><div class="wave a"></div><div class="wave b"></div>',
      '<div class="wave c"></div><div class="wave d"></div><div class="wave b"></div>'
    ];

    for( var i = 0; i < waveMultiplier; i++ ) {
      for( var j = 0; j < wave.length; j++ ) {

        var left = rando( 0, 100 );
        var top = rando( 0, 100 );

        var delay = 4 * ( left / 100 );

        $( '.wave-container' ).append( '<div class="wave-group animated infinite wave-bob" id="group_'+ i + '_' + j +'"' +
          'style="left: '+ left +'vw; top: '+ top +'vh; animation-delay: -'+ delay +'s;"' +
          '>');
        $( '#group_' + i + '_' + j ).append( wave[j] );
      }
    }
  };

  $(function () {
    // yay
    distributeWaves();
  });

  $(document).ready(function() {

  });

})(jQuery, window, document);
