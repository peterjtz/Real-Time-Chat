<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter a word ..."
          v-model="newMessage"
          id="inputText"
        />
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button class="btn btn-primary" type="submit" name="action">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import fb from "@/firebase/init";
export default {
  name: "WordList",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null,
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage[0] == "$") {
        this.newMessage = this.newMessage.replace('$','');
        let ref = fb.collection("wordList");

        ref.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type == "added") {
              let doc = change.doc;
              let id = doc.id;
              let msg = doc.data().word;
              if(msg == this.newMessage)
              {
                fb.collection("wordList")
                .doc(id)
                .delete();
                this.newMessage = null;
                alert("The Word Is Deleted!");
              }
            }
          });
        });
      } else if (this.newMessage) {
        fb.collection("wordList")
          .add({
            word: this.newMessage,
          })
          .catch((err) => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A word must be entered first!";
      }
    },
  },
};
</script>
