<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Manage Users</h1>

    <div class="container text-center">
      <div class="row">
        <div class="col">
          <div class="card" style="width: 18rem">
            <div class="card-body shadow-lg">
              <h5 class="card-title">Admins : {{ adminCount }}</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" style="width: 18rem">
            <div class="card-body shadow-lg">
              <h5 class="card-title">Users : {{ userCount }}</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" style="width: 18rem">
            <div class="card-body shadow-lg">
              <h5 class="card-title">Total Users : {{ userCount + adminCount }}</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="">
            <router-link to="/createadmin">
              <button type="button" class="btn btn-primary btn-lg shadow-lg">
                <i class="bi bi-person-plus-fill"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5 shadow-lg">
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in allUsers" :key="item._id" class="table-row-float my-3">
            <td>{{ item.name }}</td>
            <td>{{ item.department.name }}</td>
            <td>{{ item.role_type.name }}</td>
            <td class="d-flex justif-content-center align-items-center">
              <router-link class="btn btn-primary" :to="'/adminuseredit/' + item._id" role="button">
                <i class="bi bi-pen"></i>
              </router-link>
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
  name: "ManageUsers",
  data() {
    return {
      name: "",
      role_type: "",
      allUsers: [],
      id: "",
      adminCount: 0,
      userCount: 0,
      totalUsers: 0,
    };
  },
  async beforeCreate() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const token = await axios.get("http://localhost:3001/user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
      const id = token.data.data._id;

      const userDetails = await axios.get(`http://localhost:3001/user/get/${id}`).catch((err) => {
        console.log(err);
      });
      if (userDetails.data.role_type.name !== "Admin") {
        this.$router.push("/");
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

    try {
      const token = await axios.get("http://localhost:3001/user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
      this.id = token.data.data._id;

      const allUsers = await axios.get(`http://localhost:3001/user/getallusers/`).catch((err) => {
        console.log(err);
      });
      this.allUsers = allUsers.data;
      for (let item of this.allUsers) {
        if (item.role_type.value == "user") {
          this.userCount++;
        } else {
          this.adminCount++;
        }
      }
      this.allUsers = this.allUsers.filter((users) => users._id != this.id);
    } catch (e) {
      console.log("error: ", e);
    }
  },
};
</script>

<style scoped>
.table-row-float {
  transition: transform 0.3s ease-in-out;
}

.table-row-float:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
