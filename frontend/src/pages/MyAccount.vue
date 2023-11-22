<template>
  <div class="container-xl px-4 mt-4">
    <div class="row">
      <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
          <div class="card-header">Profile Picture</div>
          <div class="card-body text-center">
            <!-- Profile picture image-->
            <img v-if="profile" class="img-account-profile rounded-circle mb-2" :src="profile" alt="Profile Picture" />
            <img v-else class="img-account-profile rounded-circle mb-2" src="../assets/profile-circle.svg" alt="Default Profile Picture" />

            <!-- Profile picture help block-->
            <div class="small font-italic text-muted mb-4">
              <h5>{{ name }}</h5>
            </div>
            <!-- Profile picture upload button-->
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
          <div class="card-header">Account Details</div>
          <div class="card-body">
            <div>
              <!-- Form Group (username)-->
              <div class="mb-3">
                <label class="small mb-1" for="name">Name</label>
                <input :disabled="true" class="form-control" id="name" type="text" v-model="name" />
              </div>
              <!-- Form Row        -->
              <div class="row gx-3 mb3">
                <div class="col-md-6">
                  <div class="mt-1">
                    <label class="small mb-1" for="email">Email</label>
                    <input :disabled="true" class="form-control" id="email" type="text" v-model="email" />
                  </div>
                  <!-- Form Group (location)-->
                  <div class="mt-2">
                    <label class="small mb-1" for="mobile_no">Mobile Number</label>
                    <input :disabled="true" class="form-control" id="mobile_no" type="text" v-model="mobile_no" />
                  </div>
                  <div class="mt-2">
                    <label class="small mb-1" for="department">Department</label>
                    <input :disabled="true" class="form-control" id="department" type="email" v-model="department" />
                  </div>
                  <div class="mt-2">
                    <label class="small mb-1" for="role_type">Role Type</label>
                    <input :disabled="true" class="form-control" id="role_type" type="email" v-model="role_type" />
                  </div>
                </div>

                <!-- /////////////////////////////////////////////////////////////////// -->
                <div class="col-md-6">
                  <div class="mt-1">
                    <label class="small mb-1" for="joining_date">Joining Date</label>
                    <input :disabled="true" class="form-control" id="joining_date" type="text" v-model="joining_date" />
                  </div>

                  <div class="mt-2" v-if="whatsapp_status">
                    <label class="small mb-1" for="whatsapp_no">Whatsapp Number</label>
                    <input :disabled="true" class="form-control" id="whatsapp_no" type="text" name="birthday" v-model="whatsapp_no" />
                  </div>
                  <div class="mt-2" v-if="facebook">
                    <label class="small mb-1" for="facebook">Facebook</label>
                    <input :disabled="true" class="form-control" id="facebook" type="text" v-model="facebook" />
                  </div>

                  <div class="mt-2" v-if="instagram">
                    <label class="small mb-1" for="instagram">Instagram</label>
                    <input :disabled="true" class="form-control" id="instagram" type="text" name="instagram" v-model="instagram" />
                  </div>
                </div>
              </div>
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
  name: "MyAccount",
  data() {
    return {
      name: "",
      mobile_no: "",
      email: "",
      facebook: "",
      instagram: "",
      whatsapp_status: false,
      whatsapp_no: "",
      department: "",
      role_type: "",
      joining_date: "",
      profile: "",
    };
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
      console.log(userDetails);
      this.name = userDetails.data.name;
      this.mobile_no = userDetails.data.mobile_no;
      this.email = userDetails.data.email;
      this.facebook = userDetails.data.facebook;
      this.instagram = userDetails.data.instagram;
      this.whatsapp_status = userDetails.data.whatsapp_status;
      this.whatsapp_no = userDetails.data.whatsapp_no;
      this.department = userDetails.data.department.name;
      this.role_type = userDetails.data.role_type.name;
      this.joining_date = userDetails.data.createDate;
      this.profile = userDetails.data.profile;
    } catch (e) {
      console.log("error: ", e);
    }
  },
};
</script>
