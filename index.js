
var inbox = require('inbox');
var mailboxes = require('mailboxes');

module.exports = {

  get connected () {
    return this._connected;
  },

  set connected (val) {
    this._connected = val;
  },

  get client () {
    return this._client;
  },

  set client (val) {
    this._client = val;
  },

  get mailboxes () {
    return this._mailboxes;
  },

  set mailboxes (val) {
    this._mailboxes = val;
  },

  createConnection: function* () {
    this.client = yield createConnection.apply(this, arguments);
    return this.client;
  },

  listMailboxes: function* () {
    this.mailboxes = yield listMailboxes.call(this);
    return this.mailboxes;
  },

  getMailbox: function* (path) {
    return yield getMailbox.call(this, path);
  },

  openMailbox: function* (path, option) {
    return yield openMailbox.call(this, path, option);
  },

  listMessages: function* (from, limit) {
    return yield listMessages.call(this, from, limit);
  },

  listMessagesByUID: function* (start, last) {
    return yield listMessagesByUID.call(this, start, last);
  },

  listFlags: function* (from, limit) {
    return yield listFlags.call(this, from, limit);
  },

  close: function() {
    this.client.close();
  }

};

function createConnection() {
  var self = this;
  var args = arguments;
  return function(callback) {
    var client = inbox.createConnection.apply(this, args);
    client.once('connect', function() {
      this.connected = true;
      callback(null, client);
    });
    client.once('close', function() {
      this.connected = false;
      callback(null);
    });
    client.once('error', function(err) {
      this.connected = false;
      callback(err);
    })
    client.connect();
  };
};

function listMailboxes() {
  var self = this;
  return function(callback) {
    mailboxes(self.client, callback);
  };
}

function getMailbox(path) {
  var self = this;
  return function(callback) {
    self.client.getMailbox(path, callback);
  };
}

function openMailbox(path, option) {
  var self = this;
  return function(callback) {
    self.client.openMailbox(path, option, callback);
  };
}

function listMessages(from, limit) {
  var self = this;
  return function(callback) {
    self.client.listMessages(from, limit, callback);
  };
}

function listMessagesByUID(first, last) {
  var self = this;
  return function(callback) {
    self.client.listMessagesByUID(first, last, callback);
  };
}

function listFlags(from, limit) {
  var self = this;
  return function(callback) {
    self.client.listFlags(from, limit, callback);
  };
}
