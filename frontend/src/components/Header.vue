<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">NavBar</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/admin">Admin</router-link>
            </li>
          </ul>
          <div class="float-right">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown </a>
                <ul class="dropdown-menu">
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/myaccount">My Account</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/edit">Edit Account</router-link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <div class="d-flex justify-content-center align-items-center">
                      <button class="btn btn-danger me-md-3 mr-1 float-right" v-on:click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- ///////////////////////////////////////////////////////////////////////////// -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "Header",
  data() {
    return {
      form: {
        name: "",
        mobile_no: "",
        email: "",
      },
      id: "",
      disabledEmail: true,
    };
  },
  components: {},
  methods: {
    logout() {
      const token = localStorage.getItem("token");
      console.log("token: ", token);
      if (!token) {
        toast.error("You Are Already Logged Out", {
          autoClose: 1500,
        });
      } else {
        localStorage.removeItem("token");

        toast.info("Log Out Sucessfull", {
          autoClose: 1500,
        });
        setTimeout(1500);
        this.$router.go(0);
      }
    },
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      //console.log("token : ", token);

      this.id = token.data.data._id;
      //console.log("ID : ", this.id);
      const userDetails = await axios.get(`http://localhost:3001/user/get/${this.id}`).catch((err) => {
        console.log(err);
      });
      this.form.name = userDetails.data.name;
      this.form.mobile_no = userDetails.data.mobile_no;
      this.form.email = userDetails.data.email;
    } catch (e) {
      console.log("error: ", e);
    }
  },
};
</script>
