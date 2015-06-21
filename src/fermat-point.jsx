
var React = require('react/addons');
var R = require('ramda');
var clrs = require('colors.css');
var Line = require('./line.jsx');
var Path = require('./path.jsx');
var Handle = require('./handle.jsx');
var Label = require('./label.jsx');


var FermatPoint = React.createClass({

  getInitialState: function() {
    return getInitialState(this.props.size);
  },

  componentWillReceiveProps: function() {
    return this.setState(getInitialState(this.props.size));
  },

  dragUpdate: function(deltaX, deltaY, idx) {

    var updateObj = {};
    var trianglePts = R.clone(this.state.trianglePts);
    updateObj[idx] = {
      $set: [trianglePts[idx][0] += deltaX, trianglePts[idx][1] += deltaY]
    };

    var newTrianglePts = React.addons.update(this.state.trianglePts, updateObj);

    this.setState({
      trianglePts: newTrianglePts
    });
  },

  render: function() {
    var vm = this;
    var size = vm.state.size;
    var viewBox = [0, 0, size, size].join(' ');
    var c = size / 2;
    var apexAngles = [180, -180, -60];

    // The sides of the triangles
    var segments = [{
      pts: [ vm.state.trianglePts[1], vm.state.trianglePts[2] ],
      styles: {
        stroke: clrs.blue,
        circle: clrs.aqua
      }
    }, {
      pts: [ vm.state.trianglePts[2], vm.state.trianglePts[0] ],
      styles: {
        stroke: clrs.purple,
        circle: clrs.fuchsia
      }
    }, {
      pts: [ vm.state.trianglePts[0], vm.state.trianglePts[1] ],
      styles: {
        stroke: clrs.green,
        circle: clrs.lime
      }
    }];

    // Handles for the main triangle's vertices
    var handles = R.mapIndexed(R.partial(buildHandle, vm.dragUpdate), vm.state.trianglePts);
    // The Equlateral triangle – with a circumcenter - for each
    // side of the main triangle
    var eqTriangles = R.mapIndexed(R.partial(buildEqTriangle, apexAngles), segments);
    // The connector from the apex of the equlateral triangle to the
    // vertex of the main triangle that sits directly opposite to it
    var connectors = R.mapIndexed(R.partial(buildConnectors, apexAngles, segments), vm.state.trianglePts);
    // Labels for the triangle
    var triangleLabels = R.mapIndexed(buildTriangleLabels, vm.state.trianglePts);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        className="border border--silver"
        viewBox={ viewBox }
        width={ size }
        height={ size }
        fill="none">

        <g className="fermat-point">
          <Path pts={ vm.state.trianglePts }
            stroke={ clrs.red }
            strokeWidth={ 1.5 }
            closed={ true } />
          { triangleLabels }
          { eqTriangles }
          { connectors }
          { handles }
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
}

function rx(r, a, c) {
  return c - r * Math.cos(rad(a));
}

function ry(r, a, c) {
  return c - r * Math.sin(rad(a));
}

function angle(u, v, inRadians) {

  var slope = [v[1] - u[1], v[0] - u[0]];

  if (inRadians) {
    // angle in radians
    return Math.atan2(slope[0], slope[1]);
  } else {
    // angle in degrees
    return Math.atan2(slope[0], slope[1]) * 180 / Math.PI;
  }
}

function d2d(u, v) {
  return Math.sqrt( (u[0] - v[0]) * (u[0] - v[0]) +
                    (u[1] - v[1]) * (u[1] - v[1]) );
}

function getApex(u, v, a) {
  var r = d2d(u, v);
  var a = angle(v, u) - 60;

  return [ rx(r, a, u[0]), ry(r, a, u[1]) ];
}

function buildEqTriangle(apexAngles, segment, idx) {
  var pts = segment.pts;
  var apex = getApex(pts[0], pts[1], apexAngles[idx]);
  var vertices = [ pts[0], apex, pts[1] ];
  var circumcenter = getCircumcenter(vertices);
  var r = d2d(circumcenter, pts[0]);
  var labels = ['P', 'R', 'Q'];
  var directions = ['top', 'bottom', 'left'];

  return (
    <g key={ idx }>
      <Path pts={ vertices }
        stroke={ segment.styles.stroke }
        opacity={ 0.5 } />

      <circle cx={ circumcenter[0] }
        cy={ circumcenter[1] }
        r={ r }
        stroke={ segment.styles.circle }
        strokeWidth={ 0.5 }
        opacity={ 0.5 } />

      <Label position={ apex }
        tag={ labels[idx] }
        dir={ directions[idx] } />
    </g>
  );
}

function buildConnectors(apexAngles, segments, pt, idx) {
  return (
    <Line key={ idx }
      pts={
        [getApex(segments[idx].pts[0], segments[idx].pts[1], apexAngles[idx]), pt]
      }
      opacity={ 0.5 }
      stroke={ clrs.orange } />
  );
}

function buildHandle(dragUpdate, pt, idx) {
  return (
    <Handle
      x={ pt[0] }
      y={ pt[1] }
      key={ idx }
      id={ idx }
      onUpdate={ dragUpdate } />
  );
}

function getCircumcenter(pts) {
  return [
    (pts[0][0] + pts[1][0] + pts[2][0]) / 3,
    (pts[0][1] + pts[1][1] + pts[2][1]) / 3
  ];
}

function buildTriangleLabels(vertex, idx) {
  var labels = [{
    value: 'B',
    direction: 'left'
  }, {
    value: 'A',
    direction: 'top'
  },{
    value: 'C',
    direction: 'right'
  }];

  return (
    <Label key={ idx }
      position={ vertex }
      tag={ labels[idx].value }
      dir={ labels[idx].direction } />
  );
}

function getInitialState(size) {

  var vertices = [{
    r: 150,
    a: 0
  }, {
    r: 180,
    a: 60
  }, {
    r: 200,
    a: 180
  }];

  var v = R.sortBy(R.prop('a'), vertices);
  var c = size / 2;
  var trianglePts = [
    [rx(v[0].r, v[0].a, c), ry(v[0].r, v[0].a, c)],
    [rx(v[1].r, v[1].a, c), ry(v[1].r, v[1].a, c)],
    [rx(v[2].r, v[2].a, c), ry(v[2].r, v[2].a, c)]
  ];

  return {
    size: size,
    trianglePts: trianglePts,
    mouseX: 0,
    mouseY: 0
  };
}

module.exports = FermatPoint;
