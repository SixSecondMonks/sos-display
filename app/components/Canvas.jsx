let React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
              <div id="kinect-overlay" ng-class="{rotate: rotateForProduction}" ng-style='{ left: offsetStyle.left + "px", top: offsetStyle.top + "px" }'></div>
              <div id="canvas-stack" ng-class="{rotate: rotateForProduction}" ng-style='{ left: offsetStyle.left + "px", top: offsetStyle.top + "px" }'></div>
            </div>
        );
    }
});