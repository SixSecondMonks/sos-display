let Reflux = require('reflux');
let keyboard = require('keyboardjs');
let _ = require('underscore');

let actions = require('./actions');
let modes = require('./modes');

module.exports = Reflux.createStore({
  listenables: actions,

  init: function() {
    keyboard.bind('w', () => {
      this.data.control.offsets.y--;
      this.trigger(this.data);
    });
    keyboard.bind('s', () => {
      this.data.control.offsets.y++;
      this.trigger(this.data);
    });
    keyboard.bind('a', () => {
      this.data.control.offsets.x--;
      this.trigger(this.data);
    });
    keyboard.bind('d', () => {
      this.data.control.offsets.x++;
      this.trigger(this.data);
    });
    keyboard.bind('n', () => {
      let index = (this.data.modes.index + 1) % this.data.modes.list.length;
      let next = this.data.modes.list[index];
      actions.setMode(this.data.modes.current, next);
    });
    keyboard.bind('p', () => {
      let index = (this.data.modes.index === 0) ? this.data.modes.list.length - 1 : this.data.modes.index - 1;
      let prev = this.data.modes.list[index];
      actions.setMode(this.data.modes.current, prev);
    });
    keyboard.bind('x', () => {
      actions.setProductionMode(!this.data.control.development);
    });

    setInterval(() => {
      let t = new Date().getTime();
      this.data.information.elapsed = (t - this.data.information.started) / 1000.0;
    }, 1000);
  },

  onSetMode: function(old, chosen) {
    this.data.modes.current = chosen;
    this.data.modes.index = _.indexOf(this.data.modes.list, chosen);
    this.trigger(this.data);
  },

  onResetMode: function() {
    let current = this.data.modes.current;
    actions.setMode(current, current);
  },

  onRandomMode: function() {
    if(this.data.modes.jumps) {
      let index = Math.floor(Math.random() * this.data.modes.list.length);
      let chosen = this.data.modes.list[index];
      actions.setMode(this.data.modes.current, chosen);
    }
  },

  onToggleModeJumps: function(on) {
    this.data.modes.jumps = on;
    this.trigger(this.data);
  },

  onSetProductionMode: function(on) {
    this.data.control.development = on;
    this.trigger(this.data);
  },

  onToggleKinect: function(on) {
    this.data.modes.kinect = on;
    if(!on) {
      this.data.information.fps = 0;
    }
    this.trigger(this.data);
  },

  onAdjustOffset: function(coord, value) {
    this.data.control.offsets[coord] = value;
    this.trigger(this.data);
  },

  onUpdateModeInformation: function(data) {
    if(this.data.modes.debug) {
      this.data.information.mode = data || {};
      this.trigger(this.data);
    }
  },

  onToggleModeInformation: function(on) {
    this.data.modes.debug = on;
    if(!this.data.modes.debug) {
      this.data.information.mode = {};
    }
    this.trigger(this.data);
  },

  onUpdateModeFPS: function(fps) {
    this.data.information.modeFPSHistory.shift();
    this.data.information.modeFPSHistory.push(fps);
    this.data.information.modeFPS = fps;
    this.trigger(this.data);
  },

  onUpdateSoundWave: function(buffer) {
    this.data.soundWaveData = Array.from(buffer);
    this.trigger(this.data);
  },

  getInitialState: function() {
    let index = 0;
    this.data = {
      soundWaveData: [],
      control: {
        width: 192,
        height: 320,
        development: true,
        offsets: { x: 10, y: 15 }
      },
      modes: {
        kinect: true,
        debug: false,
        jumps: false,
        index: index,
        current: modes[index],
        list: modes
      },
      information: {
        started: new Date().getTime(),
        elapsed: 0.0,
        modeFPS: 0.0,
        modeFPSHistory: _(200).times(() => 0.0),
        mode: {}
      }
    };
    return this.data;
  }
});
