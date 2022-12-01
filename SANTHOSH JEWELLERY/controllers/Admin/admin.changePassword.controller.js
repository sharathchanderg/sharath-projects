const bcrypt = require("bcryptjs");
const AdminSchema = require("../../models/Admin/adminModel");

const securePassword = function (password) {
  try {
    return (hashpassword = bcrypt.hashSync(password, 10));
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const newpassword = req.body.newpassword;
    const verifyPassword = req.body.verifyPassword;
    if (newpassword === newpassword) {
      const adminFound = await AdminSchema.findOne({ _id: req.admin });
      if (adminFound) {
        const newPassword = await securePassword(verifyPassword);
        await AdminSchema.findOneAndUpdate(
          { _id: req.admin },
          { $set: { password: newPassword } }
        );
        res
          .status(200)
          .json({
            success: true,
            messsage: "your password updated successfully",
          });
      }
    } else {
      res
        .status(400)
        .json({
          success: false,
          messsage: "you entered password is not matched",
        });
    }
  } catch (err) {
    res.status(400).json({ success: false, messsage: err });
  }
};
