<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import ParentView from "./views/ParentView.vue";
</script>

<template>
  <div class="">
    <NavBar />
    <router-view />
    <Footer />
    <!--  <ParentView /> -->
  </div>
</template>

<style scoped></style>
