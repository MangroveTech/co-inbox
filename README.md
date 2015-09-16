
co-inbox
================

[![Build Status](https://travis-ci.org/MangroveTech/co-inbox.svg?branch=master)](https://travis-ci.org/MangroveTech/co-inbox)

Better inbox api based on [visionmedia/co](https://github.com/visionmedia/co) and [andris9/inbox](https://github.com/andris9/inbox)

[![NPM](https://nodei.co/npm/co-inbox.png?stars&downloads)](https://nodei.co/npm/co-inbox/)
[![NPM](https://nodei.co/npm-dl/co-inbox.png)](https://nodei.co/npm/co-inbox/)

### Installation
```sh
$ npm install co-inbox
```

### Usage
```js
const inbox = Object.create(Inboxes);
const client = yield inbox.createConnection(false, 'imap.gmail.com', {
  secureConnection: true,
  auth: {
    user: 'yorkiefixer@gmail.com',
    pass: 'xxxxxxxxx'
  },
  debug: true
});

const mailboxes = yield inbox.listMailboxes();
console.log(mailboxes);

// use unsupported function from upstream
inbox.client.createMessageStream(32)
  .pipe(process.stdout, {end: false});

// close
inbox.close();
```
NB: for more infomation on API, you could visit [andris9/inbox](https://github.com/andris9/inbox)

### Supported API

* createConnection(port, host, option)

* listMailboxes()

* getMailbox(path)

* openMailbox(path)

* listMessages(from, limit)

* listMessagesByUID(first, last)

* listFlags(from, limit)

* search(query, isUID)

* fetchData(uid)

* fetchFlags(uid)

* addFlags(uid, flags)

* removeFlags(uid, flags)

* storeMessage(message, flags)

* copyMessage(uid, destination)

* moveMessage(uid, destination)

* deleteMessage(uid)

### License
MIT
