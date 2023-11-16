<script setup>
import Register from "./pages/Register.vue";
import Login from "./pages/Login.vue";
import MyAccount from "./pages/MyAccount.vue";
import Edit from "./pages/Edit.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="">
    <Header />

    <!--<Register /> -->
    <!--  <Login />-->
    <!-- <Edit /> -->

    <router-view />
  </div>
</template>

<style scoped></style>
