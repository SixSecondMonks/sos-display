let ReactDOM = require('react-dom');
let Layout = require('./components/Layout');
let microphone = require('./audio/microphone');

// activate microphone.
microphone.default();

// start off the kinect server listener.
require('./kinect/client');

ReactDOM.render(
  Layout,
  document.getElementById('main')
);
