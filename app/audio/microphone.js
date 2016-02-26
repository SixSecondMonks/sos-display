let actions = require('../actions');

const getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

let context = new window.AudioContext();

export default function() {

    // set up the analyzer.
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 2048;
    let dataArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteTimeDomainData(dataArray);

    getUserMedia.call(navigator,
                      { audio: true },
                      (stream) => {
                          let microphone = context.createMediaStreamSource(stream);
                          let filter = context.createBiquadFilter();
                          microphone.connect(filter);
                          filter.connect(analyzer);
                          // analyzer.connect(context.destination);
                      },
                      (err) => { console.error(`audio error ${err}`); }
                     );

    // update every now and then
    setInterval(() => {
        analyzer.getByteTimeDomainData(dataArray);
        console.log(dataArray);
        actions.updateSoundWave(dataArray);
    }, 100);
}