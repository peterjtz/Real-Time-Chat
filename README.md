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

![Recordit GIF](https://s4.gifyu.com/images/addWord.gif)

![Recordit GIF](https://s4.gifyu.com/images/filterAdd.gif)

### How to delete a word from Filter Wordlist in Admin Page

1. Click on the 'delete' button on the right side of the word

1. In the mean time, the word will no longer be filtered when sending in the chat

![Recordit GIF](https://s1.gifyu.com/images/deleteWord.gif)

![Recordit GIF](https://s4.gifyu.com/images/filterDelete.gif)

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
// src/components/Chat.vue
// line 66-70
format(timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp);
    return newDate.toLocaleTimeString();
}
```

### Lazy loading

> ES6 import() was used to import dependencies(e.g. Firebase) / components dynamically. Dependencies/ components are imported only when they are needed. The Javascript bundle is split into multiple smaller bundles and hence the web site loads way faster because it only loads necessary components.

> Notice how different components are lazy loaded in src/router/index.js

```javascript
// src/router/index.js
// line 4-7
const Chat = () => import("../views/Chat.vue");
const Signin = () => import("../views/Signin.vue");
const Signup = () => import("../views/Signup.vue");
const Admin = () => import("../views/Admin.vue");
```

> Notice how firebase is lazy loaded in src/views/Login.vue

```javascript
// src/views/Login.vue
import("@/firebase/init").then((init) => {
  const fb = init.default.firestore;
  const firebase = init.default.firebase;
  // later content
});
```

### Result

> 95+% Google PageSpeed Insights score

> <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fofficial-chat-app.herokuapp.com%2F&form_factor=desktop">https://pagespeed.web.dev/report?url=https%3A%2F%2Fofficial-chat-app.herokuapp.com%2F&form_factor=desktop</a>

<a href="https://www.flickr.com/photos/196782410@N08/52426728388/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/52426728388_d322211933_h.jpg" title="result"></a>

## Tests

> Unit test will be added and integrated with Circle CI.
> Unit tests with Jest have be added and integrated with Github, Circle CI and Heroku CD.

> When a commit gets pushed to the master branch, Circle CI will build and test the latest build:

<a data-flickr-embed="true" href="https://www.flickr.com/photos/196782410@N08/52449368456/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/52449368456_fdc3b1b178_k.jpg"></a>

> If all unit tests get passed, Heroku will start auto-deployment:

<a data-flickr-embed="true" href="https://www.flickr.com/photos/196782410@N08/52449820540/in/dateposted-public/"><img src="https://live.staticflickr.com/65535/52449820540_e81e517900_k.jpg"></a>

> Run unit test
