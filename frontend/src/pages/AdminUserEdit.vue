<template>
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img v-if="form.profile" class="img-account-profile rounded-circle mb-2" :src="profile_url + form.profile" alt="Profile Picture" style="width: 270px; height: 300px" />
            <img v-else class="img-account-profile rounded-circle mb-2" src="../assets/profile-circle.svg" alt="Default Profile Picture" />

            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              <h5>{{ form.name }}</h5>
            </div>
            <!-- Profile picture upload form -->
            <div>
              <!-- Profile picture upload button-->
              <!-- Button trigger modal -->
              <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Change Profile</button> -->

              <!-- Modal for image upload -->
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="upload_image">Upload Image</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="imageInput" class="form-label">Upload Image</label>
                        <input class="form-control" type="file" id="imageInput" accept="image/*" @change="handleFileChange" />
                        <img v-if="imageUrl" :src="imageUrl" class="mt-2" style="max-width: 100%; max-height: 200px" alt="Preview" :v-model="form.newProfile" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" v-on:click="changeProfile">Save Image</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-8">
        <!-- Account details card -->
        <div class="card mb-4">
          <div class="card-header">Edit Details</div>
          <div class="card-body">
            <div>
              <form>
                <!-- Form Group (username) -->
                <div class="mb-3">
                  <label class="small mb-1" for="inputUsername">Name</label>
                  <input class="form-control" id="inputUsername" type="text" v-model="form.name" />
                </div>
                <!-- Form Row -->
                <div class="row gx-3 mb3">
                  <div class="col-md-6">
                    <div class="mt-1">
                      <label class="small mb-1" for="email">Email</label>
                      <input :disabled="true" class="form-control" id="email" type="text" v-model="form.email" />
                    </div>
                    <!-- Form Group (location)-->
                    <div class="mt-2">
                      <label class="small mb-1" for="mobile_no">Mobile Number</label>
                      <input class="form-control" id="mobile_no" type="text" v-model="form.mobile_no" />
                    </div>
                    <div class="mt-2">
                      <label for="form.department" class="form-label">Select Department*</label>
                      <select class="form-select" aria-label="Default select example" v-model="form.department">
                        <option :value="item._id" v-for="item in departments" :key="item.name">
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mt-2">
                      <label for="form.role_type" class="form-label">Select Role Type*</label>
                      <select class="form-select" aria-label="Default select example" v-model="form.role_type">
                        <option :value="item._id" v-for="item in role_types" :key="item">
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <!-- /////////////////////////////////// New column starts /////////////////////////////// -->
                  <div class="col-md-6">
                    <div class="form-check mb-3">
                      <label class="form-check-label" for="flexCheckDefault">Whatsapp Number </label>
                      <input class="form-check-input border border-dark" type="checkbox" v-model="form.whatsapp_status" v-on:click="form.whatsapp_status = !form.whatsapp_status" />
                    </div>
                    <div class="mb-3" v-if="form.whatsapp_status">
                      <input type="number" class="form-control" id="whatsapp_no" v-model="form.whatsapp_no" placeholder="Enter Whatsapp Number" />
                    </div>
                    <div class="mt-2">
                      <label class="small mb-1" for="facebook">Facebook</label>
                      <input class="form-control" id="facebook" type="text" v-model="form.facebook" />
                    </div>

                    <div class="mt-2">
                      <label class="small mb-1" for="instagram">Instagram</label>
                      <input class="form-control" id="instagram" type="text" name="birthday" v-model="form.instagram" />
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center mt-3">
                  <button class="btn btn-primary" type="button" v-on:click="handleSubmit">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axiosClient from "../axiosClient";

export default {
  name: "AdminUserEdit",
  props: {
    userId: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        mobile_no: "",
        email: "",
        facebook: "",
        instagram: "",
        whatsapp_status: false,
        whatsapp_no: "",
        department: "",
        role_type: "",
        profile: "",
        newProfile: "",
      },
      id: "",
      departments: "",
      role_types: "",
      selectedImage: null,
      base64Image: null,
      profile_url: "",
    };
  },

  async beforeCreate() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const token = await axiosClient.get("user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });
      const id = token.data.data._id;

      const userDetails = await axiosClient.get(`user/get/${id}`).catch((err) => {
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
      const token = await axiosClient.get("user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          this.$router.push("/login");
        }
      });

      const userDetails = await axiosClient.get(`user/get/${this.userId}`).catch((err) => {
        console.log(err);
      });
      this.form.name = userDetails.data.name;
      this.form.mobile_no = userDetails.data.mobile_no;
      this.form.email = userDetails.data.email;
      this.form.facebook = userDetails.data.facebook;
      this.form.instagram = userDetails.data.instagram;
      this.form.whatsapp_status = userDetails.data.whatsapp_status;
      this.form.whatsapp_no = userDetails.data.whatsapp_no;
      this.form.department = userDetails.data.department._id;
      this.form.role_type = userDetails.data.role_type._id;
      this.form.profile = userDetails.data.profile;
      this.id = userDetails.data._id;

      const departmentData = await axiosClient.get("department/getalldepts").catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          console.log("error in getting departments");
        }
      });
      this.departments = departmentData.data.result;

      const role_typeData = await axiosClient.get("role_type/getallrole_types").catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          console.log("error in getting role_types");
        }
      });
      this.role_types = role_typeData.data.result;

      const profile_url = await axiosClient.get(`config/`).catch((err) => {
        console.log(err);
      });
      this.profile_url = profile_url.data.result[0].profile_url;
    } catch (e) {
      console.log("error: ", e);
    }
  },

  methods: {
    async handleSubmit() {
      try {
        const response = await axiosClient.post(`user/adminuserupdate/${this.id}`, this.form);
        console.log("User updated successfully", response.data);
        toast.success("User updated successfully", {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      } catch (error) {
        console.error("Error updating user details", error);
        if (error.response.status == 400) {
          toast.error("check all the required feilds ", {
            autoClose: 1500,
          });
        } else {
          toast.error("Something went wrong", {
            autoClose: 1500,
          });
        }
      }
    },

    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const base64String = await this.convertToBase64(file);
          // console.log(base64String);

          // Set the base64 string to the form
          this.form.newProfile = base64String;
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
      }
    },

    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },

    async changeProfile() {
      console.log(this.form.newProfile);
      if (!this.form.newProfile) {
        toast.error("Please select a valid image", {
          autoClose: 1500,
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", this.form.newProfile);
      try {
        const response = await axiosClient.post(`user/upload/${this.userId}`, formData);
        console.log("User updated successfully", response.data);
        toast.success("Profile updated successfully", {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1500);
      } catch (error) {
        console.error("Error updating profile", error);
        toast.error("Something went wrong", {
          autoClose: 1500,
        });
      }
    },
  },
};
</script>
