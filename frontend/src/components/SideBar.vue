<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="bg-dark col-auto col-md-4 col-lg-3 min-vh-100 d-flex flex-column justify-content-between">
        <div class="bg-dark p-2">
          <a class="d-flex text-decoration-none mt-1 align-items-center text-white" href="">
            <span>SideMenu</span>
          </a>
          <ul class="nav nav-pills flex-column mt-4">
            <li class="nav-item py-2 py-sm-0">
              <a href="" class="nav-link text-white"> <i class="fs-5 fa fa-gauge"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Dashboard</span> </a>
            </li>
            <li class="nav-item py-2 py-sm-0">
              <a href="" class="nav-link text-white"> <i class="fs-5 fa fa-house"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Home</span> </a>
            </li>
            <li class="nav-item py-2 py-sm-0">
              <a href="" class="nav-link text-white"> <i class="fs-5 fa fa-table-list"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Artical</span> </a>
            </li>
            <li class="nav-item py-2 py-sm-0">
              <a href="" class="nav-link text-white"> <i class="fs-5 fa fa-boxes-stacked"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Products</span> </a>
            </li>
            <li class="nav-item py-2 py-sm-0">
              <a href="" class="nav-link text-white"> <i class="fs-5 fa fa-clipboard"></i> <span class="fs-4 ms-2 d-none d-sm-inline">Orders</span> </a>
            </li>
          </ul>
        </div>
        <div class="dropdown open p-3">
          <button class="btn btn-secondary dropdown-toggle text-white" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i><span class="ms-2">User</span></button>
          <div class="dropdown-menu" aria-labelledby="triggerId">
            <button class="dropdown-item" href="#">Setting</button>
            <button class="dropdown-item" href="#">Profile</button>
          </div>
        </div>
      </div>
      <div class="p-3 d-flex justify-content-center align-items-center">
        <h1>
          <strong> Content Area </strong>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>
