var connect = require('connect'),
    http = require('http');

var app = connect()
    .use(connect.logger('dev'))
    .use(connect.static('build'));

http.createServer(app).listen(3000);