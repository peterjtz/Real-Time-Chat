<template>
  <div class="container log">
    <div class="card login log1">
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
          <button type="submit" class="btn btn-primary">Guest Login</button>
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
            <button @click="googleLogin()">Google Sign In</button>
          </container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      name: "",
      errorText: null,
      userList: [],
      emailList: [],
    };
  },
  created() {
    const fb = import("@/firebase/init");
    let ref = fb.collection("username");
    let ref2 = fb.collection("email");

    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          this.userList.push(doc.data().name);
          //debugger;
        }
      });
    });

    ref2.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          this.emailList.push(doc.data().mail);
          //debugger;
        }
      });
    });
  },
  methods: {
    login() {
      if (this.name === "") {
        this.errorText = "Please enter a name first!";
        return;
      }
      //debugger;
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
      import("@/firebase/init")
        .collection("username")
        .add({
          name: this.name,
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push({ name: "Chat", params: { name: this.name } });
    },

    accountLogin() {
      this.$router.push({ name: "Signin" });
    },

    googleLogin() {
      const fb = import("@/firebase/init");
      const firebase = import("firebase");
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
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          if (user.email === "jiaotianze123@gmail.com") {
            this.$router.push({ name: "Admin" });
          } else {
            if (!this.emailList.includes(user.email)) {
              let temp = assignRandom(user.displayName);
              while (this.userList.includes(temp)) {
                temp = assignRandom(temp);
              }
              fb.collection("username")
                .add({
                  name: temp,
                })
                .catch((err) => {
                  console.log(err);
                });

              fb.collection("email")
                .add({
                  name: temp,
                  mail: user.email,
                })
                .catch((err) => {
                  console.log(err);
                });
              this.$router.push({
                name: "Chat",
                params: { name: temp },
              });
            }

            let ref = fb.collection("email");
            let userName = "";

            ref.onSnapshot((snapshot) => {
              snapshot.docChanges().forEach((change) => {
                if (change.type == "added") {
                  let doc = change.doc;
                  let mail = doc.data().mail;
                  if (mail === user.email) {
                    userName = doc.data().name;
                    this.$router.push({
                      name: "Chat",
                      params: { name: userName },
                    });
                  }
                }
              });
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

.log1 {
  transform: scale(2);
}

.log {
  margin-top: 20%;
}
</style>
