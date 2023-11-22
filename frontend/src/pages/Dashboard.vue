<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Dashboard</h1>

    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in allUsers" :key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.department.name }}</td>
            <td>{{ item.role_type.name }}</td>
            <td>
              <router-link class="btn btn-primary" :to="'/moredetails/' + item._id" role="button">More Details</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
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
      //const id = token.data.data._id;
      // console.log("ID : ", id);
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
