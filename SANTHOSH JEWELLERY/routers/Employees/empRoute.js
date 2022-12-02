const express = require("express");
const router = express.Router();

const verifyToken = require("../../middlewares/verifyToken");
const imgeUpload = require("../../middlewares/multer");

const empController = require("../../controllers/Employees/empController");
const empPasswordChange = require("../../controllers/Employees/empChangePassword");

router.post("/employee-add",imgeUpload.uploadImage.single('avatar'), empController.addEmp);
router.post("/employee-login", empController.employeeLogin);
router.put("/employee-changepassword", verifyToken.verifyToken, empPasswordChange.changePassword);
router.get("/employee-profile", verifyToken.verifyToken, empController.getEmployee);
router.put("/employee-profile-edit", verifyToken.verifyToken,imgeUpload.uploadImage.single('avatar'), empController.updateEmployee);

module.exports = router;