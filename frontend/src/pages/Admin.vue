<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Admin</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="item in allUsers" :key="item._id">
          <div class="card mb-4 shadow">
            <div class="card-body">
              <h5 class="card-title"><strong>Name:</strong> {{ item.name }}</h5>
              <p class="card-text"><strong>Department:</strong> {{ item.department.name }}</p>
              <p class="card-text"><strong>Role:</strong> {{ item.role_type.name }}</p>
              <router-link class="btn btn-primary" :to="'/adminuseredit/' + item._id" role="button">Edit</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      name: "",
      role_type: "",
      allUsers: [],
    };
  },
  async beforeCreate() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // console.log(auth);
    try {
      const token = await axios.get("http://localhost:3001/user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
      //console.log(token);
      const id = token.data.data._id;
      // console.log("ID : ", id);
      const userDetails = await axios.get(`http://localhost:3001/user/get/${id}`).catch((err) => {
        console.log(err);
      });
      // console.log(userDetails.data.role_type.name);
      if (userDetails.data.role_type.name !== "Admin") {
        this.$router.push("/dashboard");
      }
    } catch (e) {
      console.log("error: ", e);
    }
  },
  async created() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // console.log(auth);
    try {
      const token = await axios.get("http://localhost:3001/user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
      //console.log(token);
      this.id = token.data.data._id;
      //console.log("ID : ", this.id);
      const allUsers = await axios.get(`http://localhost:3001/user/getallusers/`).catch((err) => {
        console.log(err);
      });
      this.allUsers = allUsers.data;
      console.log(allUsers.data);
    } catch (e) {
      console.log("error: ", e);
    }
  },
};
</script>
