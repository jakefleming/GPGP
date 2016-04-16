// For distributing objects
var objects = ( function($) {
  'use strict';
  return {
    // isAHit( a, b ) {
    //   return !(
    //     ((a.y + a.height) < (b.y)) ||
    //     (a.y > (b.y + b.height)) ||
    //     ((a.x + a.width) < b.x) ||
    //     (a.x > (b.x + b.width))
    //   );
    // },
    spreadObjects: function() {
      var rigidBodies = [
        [ 40, 40, 20, 20 ],
        [ 0, 90, 35, 10 ]
      ];

      $( '.object-container' ).each( function() {


        var top   = tools.randomRange( 10, 90, 38, 68 );
        var left  = tools.randomRange( 10, 90, 38, 68 );

        // for( var i = 0; i < rigidBodies.length; i++ ) {
        //   var rB = rigidBodies[i];
        //
        //
        // }

        // console.log( 'top is a ' + objects.isAHit( top, rigidBodies ) );
        var z     = Math.floor( top ) + ( $(this).height() / 8);
        var delay = config.waveTiming * ( left / 100 ) * -1 + 's';

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
