<template>
    <div class="container">
        <div class="card login">
            <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                <form @submit.prevent="login" class="text-center">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Please enter your name ..." name="name" v-model="name">
                        <p v-if="errorText" class="text-danger">{{errorText}}</p>
                    </div>
                    <button type="submit" class="btn btn-primary">Enter Gusset Chat</button>
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
import firebase from 'firebase';
    export default{
        name: "login",
        data(){
            return{
                name: "",
                errorText: null
            }
        },
        methods:{
            login(){
                if(this.name){
                    this.$router.push({name: 'Chat', params: {name: this.name}});
                } else{
                    this.errorText = "Please enter a name first!"
                }
            },

            accountLogin(){
                this.$router.push({name:'Signin'});
            },

            googleLogin() 
            {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider)
                .then((result) => {
                const user = result.user.displayName;
                this.$router.push({name: 'Chat', params: {name: user}});
                }).catch((error) => {
                alert(error.message);
                console.log(error.code);
                });

            },
        }
    }
  </script>
  
  <style>
    .login{
        max-width: 450px;
        margin-top: 50px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
  </style>

