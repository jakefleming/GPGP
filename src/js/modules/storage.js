// // Manipulate data on the chrome storage object. Only works in a new tab.
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
