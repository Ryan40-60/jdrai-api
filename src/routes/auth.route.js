import express from "express";

// const auth = require("../middlewares/auth.middleware");
// const validate = require("../middlewares/validate.middleware");

// const authController = require("../controllers/auth.controller");
// const authValidation = require("../validation/auth.validation");

const router = express.Router();

// // Login route
// router.post(
//   "/login",
//   validate(authValidation.login), // Validate the request body for login
//   authController.login // Call the login controller function
// );

// // Logout route
// router.get("/logout", auth(), authController.logout); // Use the auth middleware to ensure the user is authenticated

// // Refresh tokens route
// router.post(
//   "/refresh-tokens",
//   validate(authValidation.refreshTokens), // Validate the request body for token refresh
//   authController.refreshTokens // Call the refresh tokens controller function
// );

export default router;
