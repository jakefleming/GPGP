// IIFE
(function ($, window, document, undefined) {
  'use strict';

  // var storage = require( 'storagejs' );

  /*global
    scene,
    waves,
    objects
  */
  
  scene.setup();
  waves.spreadWaves();
  objects.spreadObjects();

  // Events

  $( '.pause-animation--btn' ).click( function() {
    $( 'body' ).toggleClass( 'pause-animation' );
  });

  $( '.modal-trigger' ).click( function() {
    var id = $( this ).data( 'modal' );
    var modal = $( '#' + id );
    var overlay = $( '.modal-overlay' );

    overlay.addClass( 'modal-overlay--show' );
    modal.addClass( 'modal--show' );
  });

  $( '.modal-close, .modal-overlay' ).click( function() {
    $( '.modal' ).removeClass( 'modal--show' );
    $( '.modal-overlay' ).removeClass( 'modal-overlay--show' );
  });

  $( '.modal-btn' ).click( function() {
    // Change this value to reflect the height of the icon + padding
    var statUnit = 29;

    var food = $( this ).data( 'food' );
    var foodCard = $( '.stat--food>.stat__inner');

    var water = $( this ).data( 'water' );
    var waterCard = $( '.stat--water>.stat__inner');

    var sanity = $( this ).data( 'sanity' );
    var sanityCard = $( '.stat--sanity>.stat__inner');

    var keep = $( this ).data( 'keep' );

    // Change states based on the option that was selected
    foodCard.css({ 'height': foodCard.height() + (statUnit * food) });
    waterCard.css({ 'height': waterCard.height() + (statUnit * water) });
    sanityCard.css({ 'height': sanityCard.height() + (statUnit * sanity) });

    // Put in inventory?
    if( keep === true ) {
      // Put the thing in inventory
      console.log( 'thing is inventory' );
    }
  });

})(jQuery, window, document);
