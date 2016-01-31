var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;
