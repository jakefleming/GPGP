var config = ( function() {
  'use strict';
  return {
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
    'waveTiming': 4,
    'objSpawnSpeed': 5000, //every X ms, objects have a chance to spawn based on objSpawnChance
    'objSpawnChance': 0.5
  };
}());
