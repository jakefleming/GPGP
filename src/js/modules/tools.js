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
