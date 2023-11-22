<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div class="">
    <!-- <GoogleLogin :callback="handleGoogleLogin"  /> -->
    <Header />
    <router-view />
  </div>
</template>

<style scoped></style>
