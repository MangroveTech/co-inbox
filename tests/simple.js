
var Inboxes = require('../index');
var co = require('co');

co(function* () {
  var inbox = Object.create(Inboxes);
  var client = yield inbox.createConnection(false, 'imap.gmail.com', {
    secureConnection: true,
    auth: {
      user: 'yorkiefixer@gmail.com',
      pass: 'xxxxxxxxx'
    },
    debug: true
  });

  var mailboxes = yield inbox.listMailboxes();
  console.log(mailboxes);

  yield inbox.openMailbox('Inbox');
  var messages = yield inbox.listMessages(-1, 1);
  console.log(messages);

  yield inbox.openMailbox(mailboxes.Sent.path);
  var messages = yield inbox.listMessages(-1, 1);
  console.log(messages);

  inbox.close();

})();