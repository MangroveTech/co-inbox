
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

  search: function* (query, isUID) {
    return yield search.call(this, query, isUID);
  },

  fetchFlags: function* (uid) {
    return yield fetchFlags.call(this, uid);
  },

  addFlags: function* (uid, flags) {
    return yield addFlags.call(this, uid, flags);
  },

  removeFlags: function* (uid, flags) {
    return yield removeFlags.call(this, uid, flags);
  },

  storeMessage: function* (message, flags) {
    return yield storeMessage.call(this, message, flags);
  },

  copyMessage: function* (uid, destination) {
    return yield copyMessage.call(this, uid, destination);
  },

  moveMessage: function* (uid, destination) {
    return yield moveMessage.call(this, uid, destination);
  },

  deleteMessage: function* (uid) {
    return yield deleteMessage.call(this, uid);
  },

  close: function() {
    this.client.close();
  }

};

function createConnection(port, host, option) {
  'use strict'
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

function search(query, isUID) {
  var self = this;
  return function(callback) {
    self.client.search(query, isUID, callback);
  };
}

function fetchFlags(uid) {
  var self = this;
  return function(callback) {
    self.client.fetchFlags(uid, callback);
  };
}

function addFlags(uid, flags) {
  var self = this;
  return function(callback) {
    self.client.addFlags(uid, flags, callback);
  };
}

function removeFlags(uid, flags) {
  var self = this;
  return function(callback) {
    self.client.removeFlags(uid, flags, callback);
  };
}

function storeMessage(message, flags) {
  var self = this;
  return function(callback) {
    self.client.storeMessage(message, flags, callback);
  };
}

function copyMessage(uid, destination) {
  var self = this;
  return function(callback) {
    self.client.copyMessage(uid, destination, callback);
  };
}

function moveMessage(uid, destination) {
  var self = this;
  return function(callback) {
    self.client.moveMessage(uid, destination, callback);
  };
}

function deleteMessage(uid) {
  var self = this;
  return function(callback) {
    self.client.deleteMessage(uid, callback);
  };
}
