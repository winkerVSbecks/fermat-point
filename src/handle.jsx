
var React = require('react');
var R = require('ramda');
var clrs = require('colors.css');

var Handle = React.createClass({

  getInitialState: function() {
    return {
      isDragging: false,
      radius: 5
    };
  },

  hover: function(e) {
    this.setState({
      radius: 30
    });
  },

  selectElement: function(e) {
    this.setState({
      isDragging: true,
      mouseX: e.pageX,
      mouseY: e.pageY
    });
  },

  deSelectElement: function() {
    this.setState({
      isDragging: false,
      radius: 5
    });
  },

  drag: function(e) {

    if (this.state.isDragging) {
      var idx = e.target.id;
      var deltaX = e.pageX - this.state.mouseX;
      var deltaY = e.pageY - this.state.mouseY;

      this.props.onUpdate(deltaX, deltaY, idx);

      this.setState({
        mouseX: e.pageX,
        mouseY: e.pageY
      });
    }
  },

  render: function() {
    return (
      <circle className="handle"
        id={ this.props.id }
        cx={ this.props.x }
        cy={ this.props.y }
        r={ this.state.radius }
        fill={ clrs.yellow }
        onMouseOver={ this.hover }
        onMouseDown={ this.selectElement }
        onMouseMove={ this.drag }
        onMouseUp={ this.deSelectElement }
        onMouseLeave={ this.deSelectElement } />
    );
  }

});

module.exports = Handle;
