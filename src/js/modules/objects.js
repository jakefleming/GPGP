// For distributing objects
var objects = ( function($) {
  'use strict';
  /*global
    config,
    tools
  */

  return {
    isAHit: function( a, b ) {
      return !(
        ((a.y + a.h) < (b.y)) ||
        ((a.y) > (b.y + b.h)) ||
        ((a.x + a.w) < (b.x)) ||
        ((a.x) > (b.x + b.w))
      );
    },
    spreadObjects: function() {
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

      $( '.object-container' ).each( function( index ) {

        $(this).removeClass('object-sunk').addClass('object-float');

        var coords = {
          'x': 400,
          'y': 300,
          'w': $(this).width(),
          'h': $(this).height()
        };

        // Find free space

        do {
           coords.x = tools.random( 0, Math.random() * $(window).width() );
           coords.y = tools.random( 0, Math.random() * $(window).height() );
        }
        // TODO: Need to make isAHit() take an array and return true the first time it gets a hit
        while( objects.isAHit( coords, rigidBodies[0] ) );


        var z     = Math.floor( top ) + ( coords.h / 8);
        var delay = config.waveTiming * ( coords.x / 100 ) * -1 + 's';

        $(this).css({
          'top': coords.y + 'px',
          'left': coords.x + 'px',
          'z-index': z,
          'animation-delay': delay,
          '-webkit-animation-delay': delay
        });

      });



      // Turn on for dev
      // for( var i = 0; i < rigidBodies.length; i++ ) {
      //   var mask = document.createElement('div');
      //   mask.className = 'test-mask';
      //   document.body.appendChild(mask);
      //   mask.style.display = 'block';
      //   mask.style.left = rigidBodies[i].x + 'px';
      //   mask.style.top = rigidBodies[i].y + 'px';
      //   mask.style.width = rigidBodies[i].w + 'px';
      //   mask.style.height = rigidBodies[i].h + 'px';
      // }
    }
  };
}(jQuery));
