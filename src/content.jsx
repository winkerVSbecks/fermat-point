
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
      <div className="prose">
        <blockquote className="italic"
          cite="https://en.wikipedia.org/wiki/Fermat_point">
          <p>The Fermat point of a triangle with largest angle at most 120° is simply its first isogonic center or X(13), which is constructed as follows: Construct an equilateral triangle on each of two arbitrarily chosen sides of the given triangle.</p>
          <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Fermat_point"> Fermat point (wikipedia)</a></footer>
        </blockquote>
        { fermatPoint }
      </div>
    );
  }

});

module.exports = Content;
