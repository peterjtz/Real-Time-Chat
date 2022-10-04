<template>
  <div class="container">
    <div class="card sign up">
      <div class="card-body">
        <h2 class="card-title text-center">Account Sign Up</h2>
        <form @submit.prevent="signup" class="text-center">
          <div class="form-group">
            <input
              type="text"
              placeholder="Username"
              name="name"
              v-model="name"
            />
            <br />
            <input type="email" placeholder="Emial" v-model="email" />
            <br />
            <input type="password" placeholder="Password" v-model="password" />
            <br />
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
        <p>
          Have an account?
          <router-link to="/">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import fb from "@/firebase/init";
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      errorText: null,
      email: "",
      password: "",
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
    signup: function() {
      if (!this.name) {
        this.errorText = "Please enter a name first!";
        return;
      }

      function assignRandom(name) {
        let randomNumber1 = Math.floor(Math.random() * 10);
        let randomNumber2 = Math.floor(Math.random() * 10);
        let randomNumber3 = Math.floor(Math.random() * 10);
        let randomNumber4 = Math.floor(Math.random() * 10);
        name =
          name +
          " #" +
          randomNumber1 +
          randomNumber2 +
          randomNumber3 +
          randomNumber4;
        return name;
      }
      this.name = assignRandom(this.name);
      while (this.userList.includes(this.name)) {
        this.name = assignRandom(this.name);
      }
      this.errorText = null;
      // Log the user in
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          const user = result.user;
          user.updateProfile({ displayName: this.name });
          alert("Account has been created successfully!");

          // Add username to database
          fb.collection("username")
            .add({
              name: this.name,
            })
            .catch((err) => {
              console.log(err);
            });

          // Redirect to sign in Page
          this.$router.push({ name: "Signin" });
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

.SignIn {
  max-width: 450px;
  margin-top: 25px;
  margin-bottom: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: blue;
}
</style>
