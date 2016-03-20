let Reflux = require('reflux');

module.exports = Reflux.createActions([
  // configuration
  'setProductionMode',
  'adjustOffset',

  // modes
  'setMode',
  'resetMode',
  'previousMode',
  'nextMode',
  'randomMode',
  'toggleModeJumps',
  'updateModeInformation',

  'toggleKinect',
  'toggleModeInformation',
  'updateModeFPS',

  // sound
  'updateSoundWave'
]);
