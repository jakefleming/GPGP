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
    isAHit: function() {
      return true;
    },
    startSpawning: function() {
      setTimeout( function() {

        var roll = Math.random();
        if( config.objSpawnChance <= roll ) {
          objects.spawnNewObj();
        }

        // Begin again
        objects.startSpawning();
      }, config.objSpawnSpeed);
    },
    spawnNewObj: function() {
      var testObj = {
        "objects": [{
          "name": "oil-barrel-1",
          "displayTitle": "Oil Barrel",
          "description": "Some stuff about oil barrels...",
          "spawnChance": 0.5,
          "size": "lg",
          "bob": "heavy",
          "rotate": "45",
          "image": "object_oil-barrel.svg"
        }, {
          "name": "seaweed-1",
          "displayTitle": "Seaweed",
          "description": "Some stuff about seaweed...",
          "spawnChance": 0.9,
          "size": "sm",
          "bob": "normal",
          "rotate": "normal",
          "image": "object_seaweed.svg"
        }]
      };


      // TODO: If the object's spawnChance is greater the roll (e.g. roll = 0.5 will select anything with greater than 0.5 chance)

      // Select one random item from all objects that qualify
      var selectedObj = testObj.objects[ Math.round( Math.random() * ( testObj.objects.length - 1 ) ) ];

      // On that selected item, create a new dom element and place it in the scene
      var e = $("<img />", {
        src: "assets/img/objects/" + selectedObj.image,
        "class": "a-class another-class", // you need to quote "class" since it's a reserved keyword
        alt: selectedObj.name
      });

      var top   = tools.randomRange( 10, 90, 38, 68 );
      var left  = tools.randomRange( 10, 90, 38, 68 );
      var z     = Math.floor( top ) + ( e.height() / 8);
      var delay = config.waveTiming * ( left / 100 ) * -1 + 's';

      e.css({
        'top': top + 'vh',
        'left': left + 'vw',
        'z-index': z,
        'animation-delay': delay,
        '-webkit-animation-delay': delay
      });

      // add the element to the body
      $('.object-wrapper').append(e);



      // call spreadObjects to place it in the scene, avoiding obstacles,
      // then change the class object-sunk to object-float…

      // for a period of time, then change it back. The delay is related to the spawnChance, so the more common the item, the greater its lifetime

    },
    spreadObjects: function() {
      // var rigidBodies = [
      //   // X, Y, Width, Height
      //   [ 40, 40, 20, 20 ],
      //   [ 0, 90, 35, 10 ]
      // ];

      $( '.object-container' ).each( function() {


        var top   = tools.randomRange( 10, 90, 38, 68 );
        var left  = tools.randomRange( 10, 90, 38, 68 );

        // do {
        //   for( var i = 0; i < rigidBodies.length; i++ ) {
        //     var rB = rigidBodies[i];
        //     console.log(rB);
        //   }
        // }
        // while( objects.isAHit() );

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
