<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="login-page">
      <div class="form">
        <form  class="login-form" v-on:submit.prevent="login">
          <input type="text" v-model="formData.email" placeholder="Email"/>
          <input type="password" v-model="formData.password" placeholder="Password"/>
          <button>login</button>
          <p class="message">Not registered? <RouterLink to="/register">Create an account</RouterLink></p>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      axios.post('http://localhost/authentication_token', this.formData)
        .then(response => {
          const token = response.data.token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          alert('Successfully logged in')
          this.$router.push("/admin")
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}


</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 30%;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #464646;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #464646;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #464646;
  text-decoration: none;
}

body {
  background: #ffffff; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
</style>