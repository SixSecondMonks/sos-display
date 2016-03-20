'use strict';

let React = require('react');
let Reflux = require('reflux');

let Col = require('react-bootstrap').Col;
let Row = require('react-bootstrap').Row;
let Grid = require('react-bootstrap').Grid;

let Header = require('./Header');
let Canvas = require('./Canvas');
let ModePanel = require('./ModePanel');
let ControlPanel = require('./ControlPanel');
let Statistics = require('./Statistics');
let SocketIOPanel = require('./SocketIOPanel');

let store = require('../store');
let kinectStore = require('../kinect/store');

let Layout = React.createClass({

    mixins: [
        Reflux.connect(store, 'data'),
        Reflux.connect(kinectStore, 'kinectData')
    ],

    render: function() {
        return (
          <Grid fluid={true}>
            <Header />
            <Row>
              <Col xs={5} md={4}>
                <Canvas data={this.state.data} />
              </Col>
              <Col xs={4} md={2}>
                <ModePanel data={this.state.data.modes} />
                <ControlPanel data={this.state.data.control} />
                <SocketIOPanel />
              </Col>
              <Col xs={9} md={6}>
                <Statistics data={this.state.data.information}
                            kinectData={this.state.kinectData}
                            audioData={this.state.data.soundWaveData}
                            frequencyData={this.state.data.frequencyData}
                            />
              </Col>
            </Row>
          </Grid>
        );
    }
});

module.exports = <Layout />;
