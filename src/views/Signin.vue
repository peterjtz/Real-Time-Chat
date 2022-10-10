<template>
  <div class="container log">
    <div class="card login log1">
      <div class="card-body">
        <h2 class="card-title text-center">Account Sign In</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input type="email" placeholder="Emial" v-model="email" />
            <br />
            <input type="password" placeholder="Password" v-model="password" />
            <br />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p>
          Need an account?
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import init from "@/firebase/init";
const firebase = init.firebase;
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      // Log the user in
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          const user = result.user.displayName;
          this.$router.push({ name: "Chat", params: { name: user } });
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
