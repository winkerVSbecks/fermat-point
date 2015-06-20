
var React = require('react');
var R = require('ramda');

var Path = React.createClass({

  render: function() {

    var pathSteps = R.mapIndexed(function(pt, idx) {
      var def = (idx === 0) ? ['M', pt[0], pt[1]] :
                              ['L', pt[0], pt[1]];
      return def.join(' ');
    }, this.props.pts);

    if (this.props.closed) {
      pathSteps.push('Z');
    }

    var pathData = pathSteps.join(' ');

    return (
      <path d={ pathData }
        stroke={ this.props.stroke }
        strokeWidth={ this.props.strokeWidth }
        opacity={ this.props.opacity } />
    );
  }

});

module.exports = Path;
