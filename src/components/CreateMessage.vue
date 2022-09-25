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
    <picker @select="addEmoji" :style="{position: 'absolute', top: '30em', right: '35em'}"/>
  </div>
</template>

<script>
import fb from "@/firebase/init";
//import { VueChatEmoji, emojis } from 'vue-chat-emoji'
import { Picker } from 'emoji-mart-vue'
export default {
  name: "CreateMessage",
  props: ["name"],
  components: {
    Picker
  },
  data() {
    return {
      newMessage: null,
      errorText: null
    };
  },
  methods: {
    createMessage() {
      function filterWord(word,badWord,replacement)
      {
        var regEx = new RegExp(badWord, "ig");

        return word.replace(regEx, replacement);
      }

      function filterMessage(msg,wordList)
      {
        let replacement = "****";
        for (let i=0;i<wordList.length;i++)
        {
          msg = filterWord(msg,wordList[i], replacement);
        }

        return msg;
      }

      const wordList = ["shit","piss","fuck","cunt","cocksucker"];

      let inputText = document.getElementById("inputText");
      this.newMessage = inputText.value;
      this.newMessage = filterMessage(this.newMessage,wordList);
      if (this.newMessage) {
        fb.collection("messages")
          .add({
            message: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first!";
      }
    },
    addEmoji(emoji){
      let inputText = document.getElementById("inputText");
      inputText.value = inputText.value + emoji.native;
    }
  },
};
</script>
