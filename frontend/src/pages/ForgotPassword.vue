<template>
  <div class="d-flex justify-content-center align-items-center mt-5">
    <div class="card text-center my-5 shadow-lg">
      <div class="card-body my-5 mx-5">
        <h1 class="card-title">Password Reset</h1>
        <div class="mb-4 mt-4">
          <input type="email" class="form-control" v-model="form.email" id="form.email" placeholder="Enter Email to Reset Password" />
        </div>
        <button type="button" v-on:click="handleSubmit" class="btn btn-primary">Send OTP</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from "../axiosClient";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ForgotPassword",
  data() {
    return {
      form: {
        email: "",
      },
    };
  },

  methods: {
    async handleSubmit() {
      (function () {
        emailjs.init("xFvWy_f4EAZfIazRD");
      })();
      const random4didgit = this.random4DigitNumber();
      var params = {
        to: this.form.email,
        message: random4didgit,
      };
      console.log("random4digi: ", random4didgit);

      var serviceID = "service_q76t9xj";
      var templateID = "template_1yz2kb1";

      try {
        await axiosClient.post("user/varifyemail", this.form);
        await emailjs.send(serviceID, templateID, params);
        toast.success("OTP Sent", {
          autoClose: 1500,
        });
        const paramsotp = 5423432435433434 * random4didgit;
        setTimeout(() => {
          this.$router.push(`/resetpassword/${this.form.email}/${paramsotp}`);
        }, 1500);
      } catch (err) {
        console.error("error", err); // Log the error object, not 'object'
        if (err.response.status == 404) {
          toast.error("User does not exist", {
            autoClose: 1500,
          });
        }
      }
    },
    random4DigitNumber() {
      return Math.floor(1000 + Math.random() * 9000);
    },
  },
};
</script>
