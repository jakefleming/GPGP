// For distributing objects
var objects = ( function($) {
  'use strict';
  /*global
    config,
    tools
  */

  return {
    isAMultiHit: function( a, b ) {
      var val = [];
      for( var i = 0; i < b.length; i++ ) {
        val[i] = !(
          ((a.y + a.h) < (b[i].y)) ||
          ((a.y) > (b[i].y + b[i].h)) ||
          ((a.x + a.w) < (b[i].x)) ||
          ((a.x) > (b[i].x + b[i].w))
        );

        if( val[i] === true ) {
          // There's been a hit, return true
          return true;
        }
      }

      // No hits, return false
      return false;
    },
    spawnObjects: function( now ) {

      var raft = $('.raft-container');
      // X, Y, Width, Height
      var rigidBodies = [
        { // player
          'x': Math.round( raft.position().left ) - (raft.width() / 2) - 10,
          'y': Math.round( raft.position().top ) - (raft.width() / 2) - 65,
          'w': raft.width() + 20,
          'h': raft.height() + 40
        },
        { // UI cards
          'x': 32,
          'y': $(window).height() - 250,
          'w': $('.stat--food').width() + $('.stat--water').width() + $('.stat--sanity').width() + 20,
          'h': 250
        }
      ];

      // Iterate through every potential object
      $( '.object-container' ).each( function( index ) {
        var p = $(this).data('probability');
        var start = $(this).data('start');
        var end = $(this).data('end');
        var w = $(this).width();
        var h = $(this).height();

        // If NOW is in the range
        if( now >= start && now <= end ) {
          // Random roll to figure out if we should spawn the object
          var roll = Math.random();

          // If rolled successfully
          if( roll < p ) {

            // Create the coordinates object
            var coords = {};

            // Keep rolling randomly for free space until there are no hits
            do {
              coords = {
                'x': tools.random( 0, Math.random() * $(window).width() ),
                'y': tools.random( 0, Math.random() * $(window).height() ),
                'w': w,
                'h': h
              };
            }
            while( objects.isAMultiHit( coords, rigidBodies ) );

            // Push coords to the rigidbodies array to prevent collisions with future objects
            rigidBodies.push( coords );

            // Set the object's css to the new position
            var bottomMargin = coords.y + coords.h;
            var z            = Math.floor( bottomMargin / 10 );
            var delay        = config.waveTiming * ( coords.x / 100 ) * -1 + 's';

            $(this).css({
              'top': coords.y + 'px',
              'left': coords.x + 'px',
              'z-index': z,
              'animation-delay': delay,
              '-webkit-animation-delay': delay
            });

          }
        }
      });
    }
  };
}(jQuery));
