
var React = require('react');

var Line = React.createClass({

  render: function() {

    var styles = this.props.styles || {};

    function dash(isDashed) {
      return isDashed ? '4, 8' : null;
    }

    return (
      <line x1={ this.props.pts[0][0] } y1={ this.props.pts[0][1] }
        x2={ this.props.pts[1][0] } y2={ this.props.pts[1][1] }
        stroke={ styles.stroke }
        strokeDasharray={ dash(styles.dashed) }/>
    );
  }

});

module.exports = Line;
