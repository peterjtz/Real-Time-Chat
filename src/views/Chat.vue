<template>
  <div class="chat1">
    <div class="chat container">
      <div class="signOutDiv">
        <button type="submit" class="signOut" @click="signout()">
          Sign Out
        </button>
      </div>
      <h2 class="text-primary text-center">Real-Time Chat</h2>
      <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
      <div class="card">
        <div class="card-body">
          <p class="nomessages text-secondary" v-if="messages.length == 0">
            [No messages yet!]
          </p>
          <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
            <div v-for="message in messages" :key="message.id">
              <span class="text-info">[{{ message.name }}]: </span>
              <span>{{ message.message }}</span>
              <span class="text-secondary time">{{ message.timestamp }}</span>
            </div>
          </div>
        </div>
        <div class="card-action">
          <CreateMessage :name="name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import init from "@/firebase/init";
const fb = init.firestore;

export default {
  name: "Chat",
  props: ["name"], // will also have other props like 'guest'
  components: {
    CreateMessage,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    let ref = fb.collection("messages").orderBy("timestamp");

    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: this.format(doc.data().timestamp),
          });
        }
      });
    });
  },
  methods: {
    format(timestamp) {
      var newDate = new Date();
      newDate.setTime(timestamp);
      return newDate.toLocaleTimeString();
    },
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
  margin-top: 3%;
  margin-bottom: 0;
}

.signOutDiv {
  text-align: right;
}

.chat1 {
  margin-top: 8%;
}

.chat {
  transform: scale(1.4);
}
</style>
