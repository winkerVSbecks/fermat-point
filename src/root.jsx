
var React = require('react');
var Head = require('./head.jsx');
var Header = require('./header.jsx');
var Content = require('./content.jsx');
var Footer = require('./footer.jsx');

var Root = React.createClass({

  render: function() {
    var initialProps = {
      __html: safeStringify(this.props)
    }
    return (
      <html>
        <Head { ...this.props } />
        <body className="p3 container">
          <Header { ...this.props } />
          <Content { ...this.props } />
          <Footer { ...this.props } />
          <script id="initial-props" type="application/json" dangerouslySetInnerHTML={ initialProps } />
          <script src="bundle.js" />
        </body>
      </html>
    )
  }

});

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}


module.exports = Root;
