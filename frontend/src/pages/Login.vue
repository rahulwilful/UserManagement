<template>
  <div class="main">
    <div class="container container-md container-lg mt-5">
      <div class="row justify-content-center align-content-center">
        <div class="col-md-5 bg-light text-dark rounded shadow-lg">
          <h1 class="text-center mt-2">LogIn</h1>
          <form class="my-3">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" v-model="form.email" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password" />
            </div>
            <div class="d-grid gap-2">
              <button v-on:click="handleSubmit" class="btn btn-dark" type="button">Login</button>
            </div>

            <p class="text-center mt-3">Have an account ? then</p>
            <div class="text-center">
              <button class="btn btn-dark me-md-3 mr-1" v-on:click="redirect">Register</button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "Login",
  data() {
    //This the way u return any value or property
    return {
      form: {
        email: "",
        password: "",
      },
      error: [],
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
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
            toast.error("Somthing Went wrong", {
              autoClose: 1500,
            });
          }
        });
        console.log("User loggedin successfully", response.data);
        console.log("User loggedin successfully", response.data.token);
        localStorage.setItem("token", response.data.token);
        this.$router.push("/");
        toast.success("Log In Successfull", {
          autoClose: 1500,
        });
      } else {
        console.log("Form Values Are ", this.form, this.error);
      }
    },
    redirect() {
      this.$router.push("/register");
    },
  },
};
</script>
