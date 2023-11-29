<template>
  <div>
    <div v-if="!isLoggedIn">
      <DefaultView />
    </div>
    <div v-if="isLoggedIn">
      <DashboardView />
    </div>
  </div>
</template>

<script>
import DashboardView from "./DashboardView.vue";
import DefaultView from "./DefaultView.vue";

import axios from "axios";

export default {
  name: "ParentView",
  components: { DefaultView, DashboardView },
  data() {
    return {
      isLoggedIn: false,
    };
  },

  async created() {
    const auth = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log("Headers: ", auth);
    try {
      await axios.get("http://localhost:3001/user/getcurrentuser/", auth).catch((err) => {
        console.log(err);
      });
      this.isLoggedIn = true;
    } catch (e) {
      console.log("error: ", e);
      this.isLoggedIn = false;
    }
    console.log("isLoggedIn: ", this.isLoggedIn);
  },
};
</script>
