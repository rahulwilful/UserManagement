<template>
  <div class="main">
    <div class="container container-md container-lg mt-5">
      <div class="row justify-content-center align-content-center">
        <div class="col-md-5 bg-light text-dark rounded shadow-lg">
          <h1 class="text-center mt-2">LogIn</h1>
          <form class="my-3">
            <div class="mb-3">
              <label for="form.email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="form.email" v-model="form.email" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="form.password" class="form-label">Password</label>
              <input type="password" class="form-control" id="form.password" v-model="form.password" />
            </div>
            <div class="d-grid gap-2">
              <button v-on:click.prevent="handleSubmit" class="btn btn-dark" type="button">Login</button>
              <router-link to="/forgotpassword"><p>forgot password?</p></router-link>
            </div>

            <div class="my-2 text-center">OR</div>

            <div class="d-grid gap-2 mt-3">
              <button class="btn btn-outline-light" type="button">
                <GoogleLogin :callback="handleGoogleLogin" />
              </button>
            </div>

            <p class="text-center mt-3">Have an account ? then</p>
            <div class="text-center">
              <button class="btn btn-dark me-md-3 mr-1" v-on:click="redirectRegister">Register</button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: [],
    };
  },

  methods: {
    async handleGoogleLogin(response) {
      console.log("logged in");
      const user = decodeCredential(response.credential);
      console.log(user.email);
      this.form.email = user.email;

      const googleResponse = await axios.post("http://localhost:3001/user/googlelogin", this.form).catch((err) => {
        console.log(err);
        if (err.response.status == 404) {
          toast.error("User does not exist", {
            autoClose: 1500,
          });
        } else if (err.response.status == 400) {
          toast.error("User approvel is pending", {
            autoClose: 1500,
          });
        } else {
          console.error("Error , cannot loggin", err);
          toast.error("Somthing Went wrong", {
            autoClose: 1500,
          });
        }
      });
      console.log("User loggedin successfully", googleResponse.data);
      console.log("User loggedin successfully", googleResponse.data.token);
      localStorage.setItem("token", googleResponse.data.token);
      toast.success("Log In Successfull", {
        autoClose: 1500,
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 1500);
    },

    async handleSubmit(e) {
      this.error = [];
      for (const item in this.form) {
        if (this.form[item] === "" || this.form[item].length === 0) {
          this.error.push(item);
        }
      }

      if (this.error.length === 0) {
        const response = await axios.post("http://localhost:3001/user/login", this.form).catch((err) => {
          console.log(err);
          if (err.response.status == 404) {
            toast.error("User does not exist", {
              autoClose: 1500,
            });
          } else if (err.response.status == 400) {
            toast.error("User approvel is pending", {
              autoClose: 1500,
            });
          } else {
            console.error("Error , cannot loggin", err);
            toast.error("Something Went wrong", {
              autoClose: 1500,
            });
          }
        });
        console.log("User loggedin successfully", response.data);
        console.log("User loggedin successfully", response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Log In Successfull", {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      } else {
        console.log("Form Values Are ", this.form, this.error);
      }
    },

    redirectRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
