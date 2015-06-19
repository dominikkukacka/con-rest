module.exports = (grunt, config) ->
  less:
    opions:
      paths: [
        'app'
      ]
    dest:'.tmp/styles/main.css'
    src: 'app/styles/main.less'
