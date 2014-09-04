
var Inboxes = require('../index');
var ImapServer = require('imap-server');
var WrapAuthPlain = require('imap-server/util/auth_plain_wrapper');
var should = require('should');
var plugins = require('imap-server/plugins');
var plugins_auth = require('./support/imap-auth-plugin');
var plugins_base = require('./support/imap-base-plugin');
var net = require('net');
var co = require('co');

var user = 'yorkiefixer@example.com'
var pass = 'foobar';
var port = 10000;
var inbox = Object.create(Inboxes);

before(function(done) {
  var server = ImapServer();
  server.use(plugins.announce);
  server.use(plugins_auth);
  server.use(plugins_base);
  net.createServer(server).listen(port, done);
});

after(function(done) {
  inbox.close();
  done();
});

describe('co-inbox', function() {
  it('create an instance of connection', function* () {
    yield inbox.createConnection(port, 'localhost', {
      secureConnection: false,
      auth: { 'user': user, 'pass': pass }
    });
  });
  it('select mailbox', function* () {
    yield inbox.openMailbox('Inbox');
  });
});
