<template>
  <div class="container text-center">
    <div v-if="!isOTP" class="row">
      <div class="d-flex justify-content-center align-items-center mt-5">
        <div class="card text-center my-5 shadow-lg">
          <div class="card-body my-5 mx-5">
            <h1 class="card-title">Enter OTP</h1>
            <div class="mb-4 mt-4">
              <input type="number" class="form-control" v-model="otp" id="otp" placeholder="Enter OTP" />
            </div>
            <button type="button" v-on:click="varifyOTP" class="btn btn-primary">Varify</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOTP" class="row">
      <div class="d-flex justify-content-center align-items-center mt-5">
        <div class="card text-center my-5 shadow-lg">
          <div class="card-body my-5 mx-5">
            <h1 class="card-title">Enter New Password</h1>
            <form>
              <div class="mb-3 mt-4">
                <input type="password" class="form-control" id="form.password" v-model="form.password" placeholder="Enter new password" />
              </div>
              <div class="mb-3">
                <input type="password" class="form-control" id="form.confirmPassword" v-model="form.confirmPassword" placeholder="Confirm new pasword" />
              </div>
              <button type="button" v-on:click="handleSubmit" class="btn btn-primary">Send OTP</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../axiosClient";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ResetPassword",
  props: {
    email: {
      type: String,
      required: true,
    },
    paramsotp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      otp: "",
      isOTP: false,
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
      console.log(this.form.email);
      if (this.error.length === 0 && this.form.password == this.form.confirmPassword) {
        const response = await axiosClient.post("user/resetpassword", this.form).catch((err) => {
          console.error("Error , Somthing went wrong", err);
          toast.error("Somthing went wrong", {
            autoClose: 1500,
          });
        });

        toast.success("Password Reset Successfull", {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } else {
        toast.error("Password mismatched, Try again", {
          autoClose: 1500,
        });
      }
    },

    varifyOTP() {
      const otp = this.paramsotp / 5423432435433434;
      console.log(otp);
      console.log(this.otp);
      if (otp == this.otp) {
        toast.success("Varified OTP", {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.isOTP = true;
        }, 1500);
        this.form.email = this.email;
      }
    },
  },
};
</script>
