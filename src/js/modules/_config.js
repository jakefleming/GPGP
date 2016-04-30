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
    'objSpawnChance': 0.5,
    'objSpawnSpeed': 1000, //ms
  };
}());
