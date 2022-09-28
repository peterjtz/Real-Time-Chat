<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Please enter your name ..."
              name="name"
              v-model="name"
            />
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="submit" class="btn btn-primary">Gusset Login</button>
        </form>
        <p></p>
        <div>
          <container>
            <button @click="accountLogin()">Account Sign In</button>
          </container>
        </div>
        <p></p>
        <div>
          <container>
            <button @click="googleLogin()">Goggle Sign In</button>
          </container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import fb from "@/firebase/init";
export default {
  name: "login",
  data() {
    return {
      name: "",
      errorText: null,
      userList: [],
    };
  },
  created() {
    let ref = fb.collection("username");

    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          this.userList.push(doc.data().name);
          //debugger;
        }
      });
    });
  },
  methods: {
    login() {
      //debugger;
      if (this.userList.includes(this.name)) {
        this.errorText = "Username alread exists!";
      } else if (this.name) {
        fb.collection("username")
          .add({
            name: this.name,
          })
          .catch((err) => {
            console.log(err);
          });
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.errorText = "Please enter a name first!";
      }
    },

    accountLogin() {
      this.$router.push({ name: "Signin" });
    },

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          if (user.email === "jiaotianze123@gmail.com") {
            this.$router.push({ name: "Admin" });
          } else {
            if (!this.userList.includes(this.name)) {
              fb.collection("username")
                .add({
                  name: this.name,
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            this.$router.push({
              name: "Chat",
              params: { name: user.displayName },
            });
          }
        })
        .catch((error) => {
          alert(error.message);
          console.log(error.code);
        });
    },
  },
};
</script>

<style>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
