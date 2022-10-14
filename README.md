# Firebase-ChatApp

> This is a Chat App built with Firebase, Vue.js, Node.js, Bootstrap and Font Awesome.

> It is deployed using Heroku: <a href="https://official-chat-app.herokuapp.com/">https://official-chat-app.herokuapp.com/</a>

> This Chat App has achieved a <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fofficial-chat-app.herokuapp.com%2F&form_factor=desktop">95+% Google PageSpeed Insights score </a>

<a href="https://www.flickr.com/photos/196782410@N08/52425782816/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/52425782816_253ed97634_h.jpg" title="Login"></a>

**_Login Page_**

<a href="https://www.flickr.com/photos/196782410@N08/52426332673/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/52426332673_fbf1e32698_k.jpg" title="Chat"></a>

**_Chat Page_**

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Performance](#performance)
- [Tests](#tests)

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/peterjtz/Real-Time-Chat.git`

### Setup

> Install npm packages and compiles and hot-reload for development

```shell
$ npm install
$ npm run serve

```

---

## Features

### Sign in/ Register methods

1. Guest

2. Email/ Password

3. Google

### Chat Function

- Display username in a unique form: username + 4-digit ID
- Show the time when message was sent
- Allow users to pick and send emoji
- Filter bad words

### How to send message and emoji

![Recordit GIF](https://s4.gifyu.com/images/messageAndEmoji.gif)

### Filter Words Demo

![Recordit GIF](https://s4.gifyu.com/images/filter5aaa866679a0aa99.gif)

### How to add a word to Filter Wordlist in Admin Page

1. Type the word in the input field

1. Press 'Enter' or click Submit button

1. In the mean time, the word will be filtered when sending in the chat

![Recordit GIF](https://s4.gifyu.com/images/adminAdd.gif)

![Recordit GIF](https://s4.gifyu.com/images/filterAdd.gif)

## Performance

> To optimize the web site performance, the following techniques are used:

### Gzip and Brotli compression webpack plugin

> Both Gzip and Brotli are compression algorithms used to compress Javascript/ HTML/ CSS files. After applying the compression plugins, the bundle size are significantly(~ 75%) lighter than before.

```shell
$ npm install brotli-webpack-plugin compression-webpack-plugin express-static-gzip

```

### Removed heavy dependency (e.g. Moment.js)

> The size of Moment.js is massive. It was removed and replaced with native JS code (see the following code). After removing Moment.js, the largest JS bundle size reduced more than 350KB (around 30-40% of the original bundle size).

```javascript
// vue-chat1/src/components/ChatRoom.vue
// line 143-147
format(timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp);
    return newDate.toLocaleTimeString();
}
```

### Lazy loading

> ES6 import() was used to import dependencies(e.g. Firebase) / components dynamically. Dependencies/ components are imported only when they are needed. The Javascript bundle is split into multiple smaller bundles and hence the web site loads way faster because it only loads necessary components.

> Notice how different components are lazy loaded in vue-chat1/src/router/index.js

```javascript
// vue-chat1/src/router/index.js
// line 6-8
function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
```

> Notice how firebase is lazy loaded in vue-chat1/src/views/Login.vue

```javascript
// vue-chat1/src/views/Login.vue
// line 114-124
googleLogin() {
  // lazy load firebase
  import("@/firebase/init")
    .then(init => {
      return init.default.auth;
    })
    .then(auth => {
      var provider = new auth.GoogleAuthProvider();
      this.signInWithPopup(auth, provider, "Google");
    });
}
```

### Preconnect

> Preconnect is a method that performs DNS lookups ahead of time so that by the time you make a request to your server, your browser already knows where to make the request.

> vue-chat1/public/index.html

```html
<link rel="preconnect" href="https://vue-js-firebase-chat-app.herokuapp.com/" />
```

### Result

> 95+% Google PageSpeed Insights score

> <a href="https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvue-js-firebase-chat-app.herokuapp.com%2F&tab=desktop">https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fvue-js-firebase-chat-app.herokuapp.com%2F&tab=desktop</a>

<a href="https://www.flickr.com/photos/188674698@N05/49958784637/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/49958784637_69785d0478_b.jpg" title="result"></a>

## Tests

> Unit test will be added and integrated with Circle CI.

> Run unit test

```shell
$ npm run test:unit

```

---
