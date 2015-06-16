
var fs = require('fs');
var path = require('path');
var pkg = require('../package.json');
var cssnext = require('cssnext');


module.exports = {
  name: pkg.name,
  title: pkg.title,
  description: pkg.description,
  keywords: pkg.keywords,
  created: '06/16/2015',
  modified: new Date().toLocaleDateString(),
  css: cssnext([
    '@import "basscss";',
    '@import "basscss-input-range";',
    '@import "basscss-color-input-range";',
    '@import "basscss-base-forms";',
    '@import "basscss-color-forms";',
    '@import "basscss-highlight";',
    '@import "src/style.css";',
    '@import "./node_modules/colors.css/css/colors.css";'
  ].join(''), {
    compress: true,
    features: {
      rem: false,
      colorRgba: false,
      customProperties: {
        variables: {
          'font-family': '"Avenir Next", "Helvetica Neue", Helvetica, sans-serif',
          'heading-font-weight': '600',
          'bold-font-weight': '600',
          'button-font-weight': '600',
          'button-font-size': 'var(--h6)',
          'h1': '2.5rem',
          'h2': '1.75rem',
          'h3': '1.375rem',
          'h4': '1.25rem',
          'h5': '1rem',
          'h6': '.875rem',
          'pre-font-size': 'var(--h5)',
          'container-width': '48em',
          'black': '#134',
          'pre-background-color': 'var(--darken-1)',
        }
      }
    }
  })
};

