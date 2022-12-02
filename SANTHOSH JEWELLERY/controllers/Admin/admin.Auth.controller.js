const AdminSchema = require("../../models/Admin/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//adding admin
exports.addAdmin = function (req, res) {
  try {
    AdminSchema.findOne({ username: req.body.username }).exec((err, admin) => {
      if (admin) {
        return res
          .status(400)
          .json({ success: false, message: "admin/username is already exist" });
      }
      const addedAdmin = new AdminSchema({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role,
        status: req.body.status,
        avatar: req.file.path,
        created_by: req.body.created_by,
        created_log_date: new Date().toISOString().slice(0, 10),
      }).save(function (err, data) {
        if (err) {
          return res.status(400).json({ success: false, message: err });
        }
        return res
          .status(200)
          .json({ success: true, message: "successfully inserted" });
      });
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

//login to admin
exports.adminLogin = async function (req, res) {
   try {
    const username = req.body.username;
    const password = req.body.password;
    const adminFound = await AdminSchema.findOne({ username: username });
    if (adminFound) {
      const isMatch = await bcrypt.compare(password, adminFound.password);
      if (isMatch) {
        const token = jwt.sign(
          { _id: adminFound._id },
          "process.env.SJ_VERIFY_TOKEN",
          { expiresIn: "24h" }
        );
        if (token) {
          const adminDetails = {
            id: adminFound._id,
            name: adminFound.name,
            username: adminFound.username,
            email: adminFound.email,
            department_id: adminFound.department_id,
            profile_image: adminFound.profile_image,
            status: adminFound.status,
          };
          const response = {
            success: "ok",
            data: adminDetails,
            token: token,
          };
          return res.status(200).json(response);
        } else {
          res
            .status(400)
            .send({
              success: false,
              message: "error in token generation or sending token"
            });
        }
      } else {
        res
          .status(400)
          .send({ success: false, message: "you entered wrong password" });
      }
    } else {
      res
        .status(400)
        .send({ success: false, message: "you entered wrong username" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

//get admin profile
exports.getAdmin = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findById({ _id: req.admin });  
    if (adminFound) {
      res.status(200).json({ success: true, message: adminFound });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

//update admin  profile
exports.updateAdmin = async function (req, res) {
  try {
    let adminFound = await AdminSchema.findOneAndUpdate(
      { _id: req.admin },
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        department_id: req.body.department_id,
        status: req.body.status,
        profile_image: req.file.path,
        modified_by: req.body.modified_by,
        modified_log_date: new Date().toISOString().slice(0, 10),
      }
    );
    if (adminFound) {
      res
        .status(200)
        .json({ success: true, message: "profile updated successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "unable to update profile" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};
