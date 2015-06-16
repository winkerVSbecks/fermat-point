
var React = require('react');
var clrs = require('colors.css');

var Header = React.createClass({

  render: function() {
    var created = new Date(this.props.created).toDateString();
    var modified = new Date(this.props.modified).toDateString();

    return (
      <header className="mb3 py3">
        <h1 className="h1 h1-responsive caps m0">
          { this.props.title }
        </h1>
        <div className="sm-flex flex-baseline flex-wrap mxn1 h6">
          <div className="bold gray px1">
            { created }
          </div>
          <div className="flex-auto"></div>
          <a href="https://github.com/winkerVSbecks/fermat-point"
            className="caps ml1 mr1 button button-link">
            Github
          </a>
          <a href="http://triangle.life"
            className="caps ml1 mr1 button button-link">
            triangle.life
          </a>
        </div>
        <hr className="mt1 mb1 b2 border--red" />
      </header>
    );
  }

});

module.exports = Header;
