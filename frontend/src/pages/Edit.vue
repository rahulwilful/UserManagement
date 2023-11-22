<template>
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img v-if="form.profile" class="img-account-profile rounded-circle mb-2" :src="profile" alt="Profile Picture" />
            <img v-else class="img-account-profile rounded-circle mb-2" src="../assets/profile-circle.svg" alt="Default Profile Picture" />

            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              <h5>{{ form.name }}</h5>
            </div>
            <!-- Profile picture upload form -->
            <div>
              <!-- Profile picture upload button-->
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Change Profile</button>

              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Upload Image</h1>
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
                      <input class="form-control" id="email" type="text" v-model="form.email" />
                    </div>
                    <!-- Form Group (location)-->
                    <div class="mt-2">
                      <label class="small mb-1" for="mobile_no">Mobile Number</label>
                      <input class="form-control" id="mobile_no" type="text" v-model="form.mobile_no" />
                    </div>
                    <div class="mt-2">
                      <label class="small mb-1" for="department">Department</label>
                      <input class="form-control" id="department" type="email" v-model="form.department" />
                    </div>
                    <div class="mt-2">
                      <label class="small mb-1" for="role_type">Role Type</label>
                      <input class="form-control" id="role_type" type="email" v-model="form.role_type" />
                    </div>
                  </div>

                  <!-- //////////////////////////// Next Column/////////////////////////////////////// -->
                  <div class="col-md-6">
                    <div class="mt-1">
                      <label class="small mb-1" for="whatsapp_no">Whatsapp Number</label>
                      <input class="form-control" id="whatsapp_no" type="text" name="birthday" v-model="form.whatsapp_no" />
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
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "Edit",
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
      selectedImage: null,
      base64Image: null,
    };
  },

  methods: {
    async handleSubmit() {
      this.error = [];
      for (const item in this.form) {
        if (this.form[item] === "" || this.form[item].length === 0) {
          if (!this.form[item] === "facebook" || !this.form[item] === "instagram" || !this.form[item] === "whatsapp_no" || !this.form[item] === "whatsapp_status") {
            this.error.push(item);
          }
        }
      }
      if (this.error.length === 0) {
        try {
          const response = await axios.post(`http://localhost:3001/user/update/${this.id}`, this.form);
          // Handle success, e.g., show a success message
          console.log("User updated successfully", response.data);
          toast.success("User updated successfully", {
            autoClose: 1500,
          });
          this.$router.go(0);
          // this.$router.push("/login");
        } catch (error) {
          // Handle errors, e.g., show an error message
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
      } else {
        console.log("Form Values Are ", this.form, this.error);
      }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////
    async handleFileChange(event) {
      this.form.newProfile = event.target.files[0];
      //console.log(this.form.newProfile);
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
    ////////////////////////////////////////////////////////////////////////////////////////////////
    async changeProfile() {
      console.log(this.form.newProfile);
      try {
        const result = await axios.post(`https://api.cloudinary.com/v1_1/drp5eeosr/image/upload/file=${this.form.newProfile}&upload_preset=images_preset`);
        console.log(result);
        /*  const response = await axios.post(`http://localhost:3001/user/updateprofile/${this.id}`, this.form);
        // Handle success, e.g., show a success message
        console.log("User updated successfully", response.data);
        toast.success("Profile updated successfully", {
          autoClose: 1500,
        });
        this.$router.go(0); */
        // this.$router.push("/login");
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Error updating profile", error);

        toast.error("Something went wrong", {
          autoClose: 1500,
        });
      }
    },
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
      console.log("ID : ", this.id);
      const userDetails = await axios.get(`http://localhost:3001/user/get/${this.id}`).catch((err) => {
        console.log(err);
      });
      //console.log(userDetails);
      this.form.name = userDetails.data.name;
      this.form.mobile_no = userDetails.data.mobile_no;
      this.form.email = userDetails.data.email;
      this.form.facebook = userDetails.data.facebook;
      this.form.instagram = userDetails.data.instagram;
      this.form.whatsapp_status = userDetails.data.whatsapp_status;
      this.form.whatsapp_no = userDetails.data.whatsapp_no;
      this.form.department = userDetails.data.department.name;
      this.form.role_type = userDetails.data.role_type.name;
      this.form.profile = userDetails.data.profile;
      this.id = userDetails.data._id;
    } catch (e) {
      console.log("error: ", e);
    }
  },
};
</script>
