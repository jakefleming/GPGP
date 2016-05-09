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
      setInterval( function() {

        var roll = Math.random();
        if( config.objSpawnChance >= roll ) {
          objects.spawnNewObj();
        }

        // Begin again
        // objects.startSpawning();
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
      var object = testObj.objects[ Math.round( Math.random() * ( testObj.objects.length - 1 ) ) ];

      var imgHeight;
      if( object.size == "xs" ) {
        imgHeight = 32;
      } else if( object.size == "sm" ) {
        imgHeight = 48;
      } else if( object.size == "md" ) {
        imgHeight = 96;
      } else if( object.size == "lg" ) {
        imgHeight = 128;
      } else if( object.size == "xl" ) {
        imgHeight = 256;
      }

      // TODO: Collision detection
      var imageURL = 'assets/img/objects/' + object.image;
      var top      = tools.randomRange( 10, 90, 38, 68 ) + 'vh';
      var left     = tools.randomRange( 10, 90, 38, 68 ) + 'vw';
      var z        = Math.floor( top ) + ( imgHeight / 8 );
      var delay    = config.waveTiming * ( left / 100 ) * -1 + 's';
      var id       = tools.generateUUID();

      var el = "<div id='"+ id +"' data-modal='"+ object.name +"' class='object-sunk object-container--"+ object.size +" object-container--"+ object.name +" bob-"+ object.bob +" rotate-"+ object.rotate +" object-container modal-trigger object-container--new' style='top: "+ top +"; left: "+ left +"; z-index: "+ z +"; animation-delay: "+ delay +"; -webkit-animation-delay: "+ delay +";'>\
        <div class='object-rig'>\
          <div class='object-submerged-container'>\
            <div class='object-rig__bob'>\
              <div class='object-rig__rotate'>\
                <div class='object-submerged' style='background-image: url("+ imageURL +"); mask-image: url("+ imageURL +"); -webkit-mask-image: url("+ imageURL +");'></div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class='object-rig'>\
          <div class='object-mask'>\
            <div class='object-rig__bob'>\
              <div class='object-rig__rotate'>\
                <div class='object' style='background-image: url("+ imageURL +");'></div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>";

      // TODO: figure out what to do about modals...
      // <div class='modal modal-container' id='{{ object.name }}'>\
      //   <a href='#' class='modal-close'>&times;</a>\
      //   <div class='modal-image'>\
      //     <img src='assets/img/objects/{{ object.image }}' alt=''>\
      //   </div>\
      //   <div class='modal-content'>\
      //     <h3 class='object-title'>{{ object.displayTitle }}</h3>\
      //     <p class='object-description'>{{ object.description }}</p>\
      //     <div class='modal-content__divider'>\
      //     </div>\
      //     <div class='modal-options'>\
      //       {% for option in object.options %}
      //       <a href='#' class='btn modal-btn' data-food='{{ option.food }}' data-water='{{ option.water }}' data-sanity='{{ option.sanity }}'>{{ option.text }}</a>
      //       {% endfor %}
      //     </div>
      //   </div>
      // </div>";

      // add the element to the body
      $('.object-wrapper').append(el);

      var selectedObj = $('#' + id);

      selectedObj.removeClass('object-sunk').addClass('object-float');

      // Kill object after 10 seconds
      setTimeout( function() {
        selectedObj.removeClass('object-float').addClass('object-sunk');
        setTimeout( function() {
          selectedObj.remove();
        }, config.objSinkSpeed);
      }, config.objLifetime);

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
