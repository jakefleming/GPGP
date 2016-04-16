// For distributing waves on initial load
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
