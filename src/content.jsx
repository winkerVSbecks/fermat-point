
var React = require('react');
var FermatPoint = require('./fermat-point.jsx');
var width;

var Content = React.createClass({

  getInitialState: function() {
    return { width: 0 };
  },

  componentDidMount: function () {

    var container = React.findDOMNode(this);
    var vm = this;

    function resize(event) {
      vm.setState({ width: container.offsetWidth });
    };

    window.onresize = resize;
    resize();
  },

  render: function() {

    var fermatPoint = this.state.width > 0 ? (
      <div className="center mb2">
        <FermatPoint size={ this.state.width } />
      </div>
    ) : null;

    return (
      <div className="prose mb4">
        <blockquote className="italic"
          cite="https://en.wikipedia.org/wiki/Fermat_point">
          <p>In geometry, the Fermat point of a triangle, also called the Torricelli point or Fermat-Torricelli point, is a point such that the total distance from the three vertices of the triangle to the point is the minimum possible.</p>
          <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Fermat_point"> Fermat point (wikipedia)</a></footer>
        </blockquote>

        <p>Let&rsquo;s say we have a triangle with vertices <strong>A</strong>, <strong>B</strong> &amp; <strong>C</strong>. If the largest angle of this triangle is &le; 120&deg;, then the Fermat point is the same as the first <i>isogonic center</i>. We can calculate the isogonic center by:</p>

        <ol>
          <li>Constructing an equilateral triangle along each side of the <i>main</i> triangle.</li>
          <li>Constructing these equilateral triangles introduces 3 new vertices: <strong>P</strong>, <strong>Q</strong> &amp; <strong>R</strong>.</li>
          <li>Draw a line from each of these new vertices to the vertex &mdash; of the main triangle &mdash; directly opposite to them, for example: A to R.</li>
          <li>The point of intersection of these 3 lines in the isogonic center.</li>
        </ol>

        <p>In the calculator below the point of intersection of the 3 yellow lines is the Fermat point.</p>

        <p>However, if the triangle has an angle greater than 120&deg; then the Fermat point is simply the vertex that is obtuse-angled. For example, if the angle at A was &gt; 120&deg;, then A is the  Fermat point.</p>

        <p>You can test this out using the calculator below. Click and drag the vertices to construct various types of triangles and see how the Fermat point changes.</p>

        { fermatPoint }
      </div>
    );
  }

});

module.exports = Content;
