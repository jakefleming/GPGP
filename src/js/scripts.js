(function ($, window, document, undefined) {

  'use strict';

  var rando = function( min, max ) {
    return Math.floor( Math.random() * ( max - min + 1) + min );
  };

  var randoRange = function( min, max, minLimit, maxLimit ) {
    do {
      var roll = rando(min, max);
    }
    while( roll > minLimit && roll < maxLimit );

    return roll;
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

  var distributeObjectsVertically = function() {
    $('.object-container').each(function (index, value) {
      var top = randoRange(10, 90, 38, 68) + 'vh';

      $(this).css({ 'top': top });
    });

    return false;
  };

  var moveObjects = function() {
    distributeObjectsVertically();
    console.log('moving...');

    // $('.object-container').each(function( index, value ) {
    //   var floatSpeed = rando(1000, 5000);
    //
    //   $(this).velocity({
    //     left: "-= 50"
    //   }, 1000, function() {
    //     // need to loop back to the beginning
    //   });
    // });
  };

  var resetObjects = function() {
    // $('.object-container').css({ 'left': '120vw' });

    // for dev purposes:
    $('.object-container').each(function (index, value) {
      var left = randoRange(10, 90, 38, 68) + 'vw';
      $(this).css({ 'left': left });
    });

    moveObjects();
  };

  $(function () {
    distributeWaves();
    resetObjects();

    var d = new Date();
    var n = d.getHours();
    if (n > 19 || n < 7) {
      // If time is after 7PM or before 7AM, apply night theme to ‘body’
      document.body.className = "night";
    } else if (n > 16 && n < 19) {
      // If time is between 4PM – 7PM sunset theme to ‘body’
      document.body.className = "sunset";
    } else {
      // Else use ‘day’ theme
      document.body.className = "day";
    }
  });

  $(document).ready(function() {

  });

})(jQuery, window, document);
