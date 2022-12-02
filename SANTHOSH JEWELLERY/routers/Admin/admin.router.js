const express = require("express");
const router = express.Router();

const verifyToken = require("../../middlewares/verifyToken");
const imgeUpload = require("../../middlewares/multer");

const adminController = require("../../controllers/Admin/admin.Auth.controller");
const adminPasswordChange = require("../../controllers/Admin/admin.changePassword.controller")

router.post("/admin-add",imgeUpload.uploadImage.single('avatar'), adminController.addAdmin);
router.post("/admin-login", adminController.adminLogin);
router.put("/admin-changepassword", verifyToken.verifyToken, adminPasswordChange.changePassword);
router.get("/admin-profile", verifyToken.verifyToken, adminController.getAdmin);
router.put("/admin-profile-edit", verifyToken.verifyToken,imgeUpload.uploadImage.single('avatar'), adminController.updateAdmin);

module.exports = router;