
var WrapAuthPlain = require('imap-server/util/auth_plain_wrapper');
var plugin = module.exports = {};

plugin.auth_plain = WrapAuthPlain(function(connection, username, password, next) {
  if(username == "yorkiefixer@example.com" && password == "foobar")
    next(null, 'OK');
  else
    next(null, 'NO');
});