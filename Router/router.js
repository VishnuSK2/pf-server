const express = require("express");
const router = express.Router();
const userController = require("../Controller/userContoller");
const projectController = require("../Controller/projectController");
const jwtMiddleware = require("../Middleware/jwtMiddleware");
const multerConfig = require("../Middleware/multerMIddleware");

// REGISTER
router.post("/register", userController.register);

//login
router.post("/login", userController.login);

//update user
router.put(
  "/updateProfile",
  jwtMiddleware,
  multerConfig.single("profile"),
  userController.updateUser
);


//addProject
router.post(
  "/addproject",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.addProject
);

//getHomeProjects
router.get("/homeprojects", projectController.getHomeProjects);

//getAllProjects
router.get("/allprojects", jwtMiddleware, projectController.getAllProjects);

//getUserProjects
router.get("/userprojects", jwtMiddleware, projectController.getUserProjects);

//editProject
router.put(
  "/projects/edit/:pid",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.editProject
);

//deleteProject
router.delete(
  "/projects/remove/:pid",
  jwtMiddleware,
  projectController.deleteProject
);

module.exports = router;
