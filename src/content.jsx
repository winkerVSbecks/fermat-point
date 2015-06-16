
var React = require('react');
var FermatPoint = require('./fermat-point.jsx');

var Content = React.createClass({

  render: function() {
    return (
      <div className="prose">

        <blockquote className="italic"
          cite="https://en.wikipedia.org/wiki/Tetrahedron">
          <p>The Fermat point of a triangle with largest angle at most 120° is simply its first isogonic center or X(13), which is constructed as follows: Construct an equilateral triangle on each of two arbitrarily chosen sides of the given triangle.</p>
          <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Tetrahedron"> Fermat point (wikipedia)</a></footer>
        </blockquote>

        <div className="py4">
          <FermatPoint />
        </div>
      </div>
    );
  }

});

module.exports = Content;
