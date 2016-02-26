let React = require('react');

let { Panel, Table } = require('react-bootstrap');
let Spark = require('react-sparklines');

let KinectInformation = require('./KinectInformation');
let ModeInformation = require('./ModeInformation');

let {
    Sparklines,
    SparklinesLine,
    SparklinesSpots,
    SparklinesReferenceLine,
    DataProcessor,
} = Spark;

// hack to work around sparklines not updating dynamically.
Sparklines.prototype.shouldComponentUpdate = () => true;

module.exports = React.createClass({
    render: function() {
        return (
            <div>
            <Panel header="Display Stats">
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <th>Kinect FPS</th>
                  <th>
                    {this.props.kinectData.kinectFPS}
                    &nbsp;
                    <Sparklines data={this.props.kinectData.kinectFPSHistory} limit={600} width={600} height={60} min={0} max={70}>
                      <SparklinesLine color="#1c8cdc" />
                        <SparklinesReferenceLine type="avg" />
                      <SparklinesSpots />
                    </Sparklines>
                   </th>
                </tr>
                <tr>
                  <th>Mode FPS</th>
                  <th>
                    {this.props.data.modeFPS}
                    &nbsp;
                    <Sparklines data={this.props.data.modeFPSHistory} limit={600} width={600} height={60} min={0} max={70}>
                      <SparklinesLine color="#fa7e17" />
                        <SparklinesReferenceLine type="avg" />
                      <SparklinesSpots />
                    </Sparklines>
                   </th>
                </tr>
                <tr>
                  <th>Audio Waveform</th>
                  <th>
                    <Sparklines data={this.props.audioData} limit={200} width={200} height={60}>
                      <SparklinesLine color="#5aff17" />
                        <SparklinesReferenceLine type="avg" />
                      <SparklinesSpots />
                    </Sparklines>
                   </th>
                </tr>
                <tr>
                  <th>Elapsed Time (s)</th>
                  <th>{this.props.data.elapsed}</th>
                </tr>
              </tbody>
            </Table>
            </Panel>
            <Panel header="Kinect Stats">
            <KinectInformation data={this.props.kinectData} />
            <ModeInformation data={this.props.data.mode} />
            </Panel>
            </div>
        );
    }
});
