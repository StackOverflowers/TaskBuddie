const upload = require("../middleware/file");
const express = require("express");
const multiparty = require("connect-multiparty");
const mult = multiparty();
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get("/listUsers/:name?", UserController.listUser);
router.get("/listUsers/:name?", UserController.listUserAll);
router.put("/updateUser", UserController.updateUser);
router.put("/updatePhoto", mult, upload, UserController.updatePhoto);
router.put("/deleteUser", UserController.deleteUser);
router.post("/registerAdmin", UserController.registerAdmin);
router.get("/getRole/:email", UserController.getRole);
router.get("/getNombre/:email", UserController.getNombre);
router.get("/getId/:email", UserController.getId);

module.exports = router;
