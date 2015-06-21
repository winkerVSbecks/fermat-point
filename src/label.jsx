
var React = require('react');
var clrs = require('colors.css');

var Label = React.createClass({

  render: function() {

    var styles = {
      fontFamily: 'Baskerville, serif',
      fontSize: 24,
      fontStyle: 'italic',
      fill: clrs.navy
    };

    var offsets = {
      top: [-5, -20],
      right: [20, 10],
      bottom: [-5, 35],
      left: [-35, 10]
    };

    return (
      <text x={ this.props.position[0] + offsets[this.props.dir][0] + 'px' }
        y={ this.props.position[1] + offsets[this.props.dir][1] + 'px' }
        style={ styles }>
        { this.props.tag }
      </text>
    );
  }

});

module.exports = Label;
