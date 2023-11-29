<template>
  <div class="container d-flex vh-100">
    <div class="container text-center">
      <div v-if="!isSignedUp" class="row">
        <div>
          <h1 class="text-center">Google Sign-In</h1>
        </div>
      </div>

      <div v-if="isSignedUp" class="container container-md container-lg mt-5">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-5 bg-light text-dark rounded shadow-lg">
            <h1 class="text-center mt-2">Enter More Details</h1>
            <form class="my-3">
              <div class="row">
                <div class="col-6">
                  <div class="mb-4">
                    <label for="form.name" class="form-label">Name*</label>
                    <input type="text" class="form-control" id="form.name" v-model="form.name" />
                  </div>
                  <div class="mb-4">
                    <label for="form.mobile_no" class="form-label"> Mobile Number*</label>
                    <input type="number" class="form-control" id="form.mobile_no" v-model="form.mobile_no" />
                  </div>
                  <div class="mb-4">
                    <label for="form.email" class="form-label">Email address*</label>
                    <input type="email" class="form-control" id="form.email" v-model="form.email" />
                  </div>
                  <div class="mb-4">
                    <label for="form.password" class="form-label">Password*</label>
                    <input type="password" class="form-control" id="form.password" v-model="form.password" />
                  </div>
                </div>
                <!-- ////////////////////////////////////////// New colunn starts /////////////////////////////////////////// -->
                <div class="col-6">
                  <div class="mb-3">
                    <label for="form.facebook" class="form-label">Facebook</label>
                    <input type="text" class="form-control" id="form.facebook" v-model="form.facebook" />
                  </div>
                  <div class="mb-3">
                    <label for="form.facebook" class="form-label">Intsagram</label>
                    <input type="text" class="form-control" id="form.facebook" v-model="form.instagram" />
                  </div>
                  <div class="form-check mb-3">
                    <label class="form-check-label" for="form.whatsapp_status">Whatsapp Number </label>
                    <input class="form-check-input border border-dark" type="checkbox" v-on:click="form.whatsapp_status = !form.whatsapp_status" />
                  </div>
                  <div class="mb-3" v-if="form.whatsapp_status">
                    <input type="number" class="form-control" id="form.whatsapp_no" v-model="form.whatsapp_no" placeholder="Enter Whatsapp Number" />
                  </div>
                  <!-- Select Feilds -->
                  <div class="mb-3">
                    <label for="form.department" class="form-label">Select Department*</label>
                    <select class="form-select" aria-label="Default select example" v-model="form.department">
                      <option :value="item._id" v-for="item in departments" :key="item.name">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="form.role_type" class="form-label">Select Role Type*</label>
                    <select class="form-select" aria-label="Default select example" v-model="form.role_type">
                      <option :value="item._id" v-for="item in role_types" :key="item">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2 mt-2">
                <button v-on:click.prevent="handleSubmit" class="btn btn-dark" type="button">Register</button>
              </div>

              <br />
            </form>
          </div>
        </div>
      </div>
      <!-- Goggle login option -->
      <div v-if="!isSignedUp" class="row mt-5">
        <div class="container d-flex justify-content-center align-items-center">
          <GoogleLogin :callback="handleGoogleLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import { decodeCredential } from "vue3-google-login";
export default {
  name: "GoogleSignIn",
  data() {
    return {
      form: {
        name: "",
        mobile_no: "",
        email: "",
        password: "",
        facebook: "",
        instagram: "",
        whatsapp_status: false,
        whatsapp_no: "",
        department: "",
        role_type: "",
      },
      error: [],
      departments: [],
      role_types: [],
      isSignedUp: false, //check for google login
    };
  },
  methods: {
    handleGoogleLogin(response) {
      console.log("logged in");
      const user = decodeCredential(response.credential);
      console.log(user);
      this.form.name = user.name;
      this.form.email = user.email;
      this.getDepartmentsAndRole_types();
      this.isSignedUp = true;
    },

    async getDepartmentsAndRole_types() {
      try {
        const departmentData = await axios.get("http://localhost:3001/department/getalldepts").catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            console.log("error in getting departments");
          }
        });

        const role_typeData = await axios.get("http://localhost:3001/role_type/getallrole_types").catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            console.log("error in getting role_types");
          }
        });

        this.departments = departmentData.data.result;
        this.role_types = role_typeData.data.result;
        this.role_types = this.role_types.filter((roles) => roles.name !== "Admin");
        //console.log("department: ", this.departments);
        //console.log("role_types: ", this.role_types);
      } catch (e) {
        console.log("error: ", e);
      }
    },
    async handleSubmit(e) {
      //e.preventDefault();
      this.error = [];
      for (const item in this.form) {
        if (this.form[item] === "" || this.form[item].length === 0) {
          if (!this.form[item] === "facebook" || !this.form[item] === "instagram" || !this.form[item] === "whatsapp_no") {
            this.error.push(item);
          }
        }
      }
      if (this.error.length === 0) {
        try {
          const response = await axios.post("http://localhost:3001/user/add", this.form);
          console.log("Role_typeId: ", this.form.role_type);
          // Handle success, e.g., show a success message
          console.log("User registered successfully", response.data);
          toast.success("Registerd successfully", {
            autoClose: 1500,
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error("Error registering user", error);
          if (error.response.status == 403) {
            toast.error("only admin can create admin", {
              autoClose: 1500,
            });
          } else if (error.response.status == 400) {
            toast.error("check all the required feilds ", {
              autoClose: 1500,
            });
          } else {
            toast.error("Something went wrong", {
              autoClose: 1500,
            });
          }
        }
      } else {
        console.log("Form Values Are ", this.form, this.error);
      }
    },
  },
};
</script>
