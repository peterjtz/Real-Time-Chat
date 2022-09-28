<template>
    <div class="chat container">
      <div class="signOutDiv">
        <button type="submit" class="signOut" @click="signout()">Sign Out</button>
      </div>
      <h2 class="text-primary text-center">Admin Page</h2>
      <h5 class="text-secondary text-center">Filter Word List</h5>
      <div class="card">
        <div class="card-body">
          <p class="nomessages text-secondary" v-if="messages.length == 0">
            [No messages yet!]
          </p>
          <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
            <div v-for="message in messages" :key="message.id">
              <span>word: {{ message.message }}</span>
            </div>
          </div>
        </div>
        <div class="card-action">
          <WordList :name="name" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WordList from "@/components/WordList";
  import fb from "@/firebase/init";
  import firebase from "firebase";
  
  export default {
    name: "Admin",
    props: ["name"], // will also have other props like 'guest'
    components: {
      WordList
    },
    data() {
      return {
        messages: []
      };
    },
    created() {
      const user = firebase.auth().currentUser;

      if(user === null || user.email !== "jiaotianze123@gmail.com")
      {
        this.$router.push({name:'Login'});
      }
      let ref = fb.collection("wordList");
  
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              message: doc.data().word
            });
          }
        });
      });
    },
    methods:{
      signout(){
      this.$router.push({name:'Login'});
    }
  }
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
    margin-top:1em;
    margin-bottom: 0;
  }
  
  .signOutDiv{
    text-align: right;
  }
  </style>
  