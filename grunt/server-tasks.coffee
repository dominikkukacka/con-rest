module.exports = (grunt, config) ->
  express__dev:
    options:
      port: 9000
      hostname: '0.0.0.0'
      server: 'server/server'
      bases: ['app', '.tmp']
      middleware: [(req, res, next) ->
        req.url = req.url.replace /\/app\//, '/'
        next()
      ]
    express__dist:
      options:
        port: 9000
        hostname: '0.0.0.0'
        server: 'server/server'
        bases: ['dist']
