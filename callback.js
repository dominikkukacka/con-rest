var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();

app.use(multer({
  inMemory: true
}));
app.use(bodyParser.json({
  'strict': true,
  'inflate': true,
  'limit': '5mb',
  'type': 'json'
}));


['get', 'post', 'put', 'options'].forEach(function(method){
  app[method](/.*/g, function(req, res) {
    console.log('url:', req.url);
    console.log('method:', req.method);
    console.log('query:', req.query);
    console.log('headers:', req.headers);
    console.log('payload:', req.body);
    console.log('files:', req.files);
    console.log('====');
    // for(var name in req.files) {
    //   require('fs').writeFileSync('matha/' + req.files[name].name, req.files[name].buffer);
    // }
    res.send('ok');
  });
});

app.listen(1337, function notify() {
  console.log('Server listening on port ', 1337);
});
