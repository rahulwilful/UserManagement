<template>
  <div class="container-fluid d-flex justify-content-center align-items-center vh-100">
    <h1 class="">Welcome To User Management System</h1>
  </div>
</template>

<script>
import axiosClient from "../axiosClient";
export default {
  name: "Home",
  methods: {
    getUser(name) {
      alert(name);
    },
  },
  async created() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      await axiosClient.get("user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
    } catch (e) {
      console.log("error: ", e);
    }
  },

  components: {},
};
</script>
