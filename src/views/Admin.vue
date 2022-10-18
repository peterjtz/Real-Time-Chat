<template>
  <div class="chat1">
    <div class="chat container">
      <div class="signOutDiv">
        <button type="submit" class="signOut" @click="signout()">
          Sign Out
        </button>
      </div>
      <h2 class="text-primary text-center">Admin Page</h2>
      <h5 class="text-secondary text-center">Filter Word List</h5>
      <div class="card">
        <div class="card-body">
          <p class="nomessages text-secondary" v-if="messages.length == 0">
            [No messages yet!]
          </p>
          <div
            class="messages wordList"
            v-chat-scroll="{ always: false, smooth: true }"
          >
            <ol>
              <div v-for="message in messages" :key="message.id">
                <li class="word">{{ message.message }}</li>
              </div>
            </ol>
          </div>
        </div>
        <div class="card-action">
          <WordList :name="name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordList from "@/components/WordList";
import init from "@/firebase/init";
const fb = init.firestore;
const firebase = init.firebase;

export default {
  name: "Admin",
  props: ["name"], // will also have other props like 'guest'
  components: {
    WordList,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const user = firebase.auth().currentUser;

    if (user === null || user.email !== "jiaotianze123@gmail.com") {
      this.$router.push({ name: "Login" });
    }
    let ref = fb.collection("wordList");

    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let type = change.type;
        let doc = change.doc;
        let dWord = doc.data().word;
        if (type === "added") {
          this.messages.push({
            message: dWord,
          });
        } else if (type === "removed") {
          for (let i = 0; i < this.messages.length; i++) {
            if (this.messages[i].message === dWord) {
              this.messages.splice(i, 1);
              break;
            }
          }
        }
      });
    });
  },
  methods: {
    signout() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}

.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.2em;
}

.chat .time {
  display: block;
  font-size: 0.7em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}

.signOut {
  display: inline-block;
  overflow: auto;
  background-color: red;
  margin-top: 1em;
  margin-bottom: 0;
}

.signOutDiv {
  text-align: right;
}

.wordList {
  text-align: center;
}

.word {
  text-align: left;
  font-size: 30px;
}
</style>
