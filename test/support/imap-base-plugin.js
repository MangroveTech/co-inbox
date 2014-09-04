var plugin = module.exports = {};

plugin.list = function(connection, args, password, next) {
  next(null, 'OK');
};

plugin.select = function(socket, mailbox, next) {
  next(null, 'OK');
};
