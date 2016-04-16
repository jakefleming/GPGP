// Set up the scene, and apply body classes
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
