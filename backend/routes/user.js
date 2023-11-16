const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");
const { testUserAPI, CreateUser, LogInUser, UpdateUser, DeleteUser, GetUserById, GetUsers, GetCurrentUser, UpdateProfile } = require("../controllers/user");

//@desc Test User API
//@route GET /api/v1/user
//@access Public
router.get("/", testUserAPI);

//@desc Create User API
//@route POST /api/v1/user/add
//@access Public
router.post(
  "/add",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("mobile_no", "Enter a Valid Whatsapp Number").notEmpty().isNumeric(),
    body("password", "Password must have atlest 5 character").isLength({
      min: 5,
    }),
    body("department"),
    body("role_type"),
    body("whatsapp_status"),
    body("whatsapp_no"),
    body("instagram"),
    body("facebook"),
  ],
  CreateUser
);

//@desc LogIn User API
//@route GET /api/v1/user/login
//@access Public
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is Incorrect").isLength({
      min: 5,
    }),
  ],
  LogInUser
);

//@desc Update User API
//@route GET /api/v1/user/update
//@access Public
router.post(
  "/update/:id",
  [
    body("name", "Enter a valid name").isLength({
      min: 3,
    }),
    body("mobile_no", "Enter a Valid mobile Number").notEmpty().isNumeric(),
    body("whatsapp_no"),
    body("instagram"),
    body("facebook"),
  ],
  UpdateUser
);

//@desc Delete User API
//@route GET /api/v1/user/delete
//@access Public
router.post("/delete/:id", validateToken, DeleteUser);

//@desc Get User Info API
//@route GET /api/v1/user/get/:id
//@access Public
router.get("/get/:id", GetUserById);

//@desc Get All Users API
//@route GET /api/v1/user/getallusers
//@access Public
router.get("/getallusers", GetUsers);

//@desc Get Current User API
//@route GET /api/v1/user
//@access Public
router.get("/getcurrentuser", validateToken, GetCurrentUser);

//@desc Update User API
//@route POST /api/v1/user/updateprofile/:id
//@access Public
router.post("/updateprofile/:id", [body("newProfile", "Profile picture not found").notEmpty()], UpdateProfile);

//@desc Approve Users API
//@route POST /api/v1/user/approve/:id
//@access Public
router.post("/approve/:id", GetUsers);

module.exports = router;
