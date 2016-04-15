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
    },
    generateUUID: function() {
      var d = new Date().getTime();
      if( window.performance && typeof window.performance.now === "function" ) {
        d += performance.now(); //use high-precision timer if available
      }

      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = ( d + Math.random() * 16 ) %16 | 0;
        d = Math.floor( d/16 );
        return ( c=='x' ? r : ( r&0x3|0x8 ) ).toString( 16 );
      });

      return uuid;
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

var scene = ( function() {
  'use strict';
  return {
    timeOfDay: function() {
      var d = new Date();
      var n = d.getHours();
      if (n > 19 || n < 7) {
        // If time is after 7PM or before 7AM, apply night theme to ‘body’
        return 'night beard-2';
      } else if (n > 16 && n <= 19) {
        // If time is between 4PM – 7PM sunset theme to ‘body’
        return 'sunset beard-1';
      } else {
        // Else use ‘day’ theme
        return 'day beard-0';
      }
    },
    setup: function() {
      // Add time based classes to the body
      document.body.className = scene.timeOfDay();

      // Get the player from storage
      // var player = storage.getPlayer();

      // // Does anything exist?
      // if( !player ) {
      //   // If not, set up a new player
      //   // storage.addNewPlayer();
      // } else {
      //   // console.log(player);
      // }
    }
  };
}());

// var storage = ( function() {
//   'use strict';
//   return {
//     getPlayer: function () {
//       if( chrome ) {
//         chrome.storage.sync.get( 'player', function ( p ) { return p.player; });
//       }
//     },
//     addNewPlayer: function() {
//       if( chrome ) {
//         console.log( 'calling addNewPlayer...' );
//
//         // chrome.storage.sync.set({
//         //   'player': {
//         //     'id': tools.generateUUID(),
//         //     'raft': 'life-raft',
//         //     'name': 'Enrique',
//         //     'gender': 'm',
//         //     'food': 4,
//         //     'water': 4,
//         //     'sanity': 4,
//         //     'createdOn': Date.now()
//         //   }
//         // }, function() {
//         //   console.log( '✔ player added' );
//         // });
//       }
//     },
//     testing: function() {
//       chrome.storage.sync.clear();
//       var name = prompt("What's your name", "Farhad");
//
//       if( name != null ) {
//         chrome.storage.sync.set({
//           'player': {
//             'name': name
//           }
//         }, function() {
//           // Notify that we saved.
//           console.log('Settings saved');
//         });
//       }
//
//       var name;
//
//       chrome.storage.sync.get( 'player', function( obj ) {
//         name = obj.player.name;
//       });
//
//       if( !name ) {
//         name = prompt( "What's your name?", "Farhad" );
//         chrome.storage.sync.set({
//           'player': {
//             'name': name
//           }
//         }, function() {
//           // Notify that we saved.
//           console.log('Settings saved');
//         });
//       }
//
//       chrome.storage.sync.get( 'player', function( obj ) {
//         $( '.character__name' ).text( obj.player.name );
//       });
//     }
//   };
// }());

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

  $( '.modal-trigger' ).click( function() {
    var id = $(this).data( 'modal' );
    var modal = $( '#' + id );
    var overlay = $( '.modal-overlay' );

    overlay.addClass( 'modal-overlay--show' );
    modal.addClass( 'modal--show' );
  });

  $( '.modal-close, .modal-overlay' ).click( function() {
    $( '.modal' ).removeClass( 'modal--show' );
    $( '.modal-overlay' ).removeClass( 'modal-overlay--show' );
  });

})(jQuery, window, document);
