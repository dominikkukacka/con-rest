module.exports = (grunt, options) ->
  ngtemplates__dev:
    src: 'app/widgets/**/*.html'
    dest: '.tmp/js/templates.js'
    options:
      module: 'con-rest.templates'
      url: (url) ->
        return url.replace /(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, ''
          .replace /.html/, ''
  ngtemplates__dist:
    src: 'app/widgets/**/*.html'
    dest: '.tmp/js/templates.min.js'
    options:
      module: 'con-rest'
      htmlmin:
        collapseBooleanAttributes: true
        collapseWhitespace: true
        removeAttributeQuotes: true
        removeComments: true
        removeEmptyAttributes: true
        removeRedundantAttributes: true
        removeScriptTypeAttributes: true
        removeStyleLinkTypeAttributes: true
      url: (url) ->
        url.replace /(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, ''
          .replace /.html/, ''
