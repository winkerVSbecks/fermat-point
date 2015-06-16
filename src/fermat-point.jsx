
var React = require('react');
var R = require('ramda');
var Line = require('./line.jsx');
var clrs = require('colors.css');


var FermatPoint = React.createClass({

  getDefaultProps: function() {
    return {
      size: 512,
      vertices: [{
        r: 64,
        a: 90
      }, {
        r: 64,
        a: 210
      }, {
        r: 64,
        a: 330
      }]
    };
  },

  render: function() {

    var size = this.props.size;
    var viewBox = [0, 0, size, size].join(' ');
    var rotation = this.props.rotation;
    var v = this.props.vertices;
    var c = size / 2;

    // The vertices are generated through
    // radial coordinates (r and θ)
    var pts = [
      [rx(v[0].r, v[0].a, c), ry(v[0].r, v[0].a, c)],
      [rx(v[1].r, v[1].a, c), ry(v[1].r, v[1].a, c)],
      [rx(v[2].r, v[2].a, c), ry(v[2].r, v[2].a, c)]
    ];

    var sides = [
      [pts[0], pts[1]],
      [pts[1], pts[2]],
      [pts[2], pts[0]]
    ];

    // Utility method to generate line segments
    var getSegments = R.mapIndexed(function(vertices, idx) {
      return (
        <Line key={ idx }
          pts={ vertices }
          styles={ { stroke: clrs.navy } } />
      );
    });

    // The triangle
    var segments = getSegments(R.slice(0, 3, sides));

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        viewBox={ viewBox }
        width={ size }
        height={ size }>

        <g className="fermat-point">
          { segments }
        </g>

      </svg>
    );

  }

});


/**
 * Utilities
 */
function rad(a) {
  return Math.PI * a / 180;
};

function rx(r, a, c) {
  return c - r * Math.cos(rad(a));
};

function ry(r, a, c) {
  return c - r * Math.sin(rad(a));
};

module.exports = FermatPoint;
