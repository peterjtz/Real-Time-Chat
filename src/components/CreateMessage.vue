<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter message ..."
          v-model="newMessage"
          id="inputText"
        />
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button class="btn btn-primary" type="submit" name="action">
        Submit
      </button>
    </form>
    <button class="emoji" @click="popup()">Emoji</button>
    <div class="popup" id="popup">
    <picker class="picker" id="trigger"
      @select="addEmoji"
      :style="{ position: 'absolute', top: '-15vh', right: '1.5vw' }"
    />
  </div>
  </div>
</template>

<script>
import fb from "@/firebase/init";
//import { VueChatEmoji, emojis } from 'vue-chat-emoji'
import { Picker } from "emoji-mart-vue";
export default {
  name: "CreateMessage",
  props: ["name"],
  components: {
    Picker,
  },
  data() {
    return {
      newMessage: null,
      errorText: null,
      wordList: [],
    };
  },
  created() {
    // Create Word List
    let ref = fb.collection("wordList");

    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let doc = change.doc;
        let dWord = doc.data().word;
        let type = change.type;
        if (type === "added") {
          this.wordList.push(dWord);
        }
        else if(type === "removed"){
            for (let i=0;i<this.wordList.length;i++)
            {
              if(this.wordList[i] === dWord)
              {
                this.wordList.splice(i,1);
                break;
              }
            }
          }
      });
    });
  },
  methods: {
    createMessage() {
      function filterWord(word, badWord, replacement) {
        var regEx = new RegExp(badWord, "ig");

        return word.replace(regEx, replacement);
      }

      function filterMessage(msg, wordList) {
        let replacement = "****";
        for (let i = 0; i < wordList.length; i++) {
          msg = filterWord(msg, wordList[i], replacement);
        }

        return msg;
      }

      //const wordList = ["shit","piss","fuck","cunt","cocksucker"];

      let inputText = document.getElementById("inputText");
      this.newMessage = inputText.value;
      this.newMessage = filterMessage(this.newMessage, this.wordList);
      if (this.newMessage) {
        fb.collection("messages")
          .add({
            message: this.newMessage,
            name: this.name,
            timestamp: Date.now(),
          })
          .catch((err) => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first!";
      }
    },
    addEmoji(emoji) {
      let inputText = document.getElementById("inputText");
      inputText.value = inputText.value + emoji.native;
    },
    popup(){
      let trigger = document.getElementById("trigger");
      trigger.classList.toggle("hide");
    }
  },
};
</script>

<style>

.emoji{
  position: relative;
  right: -38vw;
  top: -16vh;
}

.popup{
  visibility: hidden;
}

.picker{
  visibility: hidden;
}

.hide{
  visibility: visible;
}
</style>
