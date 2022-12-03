const express = require("express");
const router = express.Router();

//middlewares
const verifyToken = require("../../middlewares/verifyToken");

//controllers
const customerController = require("../../controllers/customers/customerController");

//API calls
router.post(
  "/add-customer",
  verifyToken.verifyToken,
  customerController.addCustomer
);
router.put(
  "/edit-customer-details/:id",
  verifyToken.verifyToken,
  customerController.updateCustomer
);
router.get(
  "/customer-details/:id",
  verifyToken.verifyToken,
  customerController.getCustomer
);

module.exports = router;
