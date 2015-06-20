
var React = require('react');

var Line = React.createClass({

  render: function() {

    return (
      <line x1={ this.props.pts[0][0] }
        y1={ this.props.pts[0][1] }
        x2={ this.props.pts[1][0] }
        y2={ this.props.pts[1][1] }
        stroke={ this.props.stroke }
        opacity={ this.props.opacity } />
    );
  }

});

module.exports = Line;
