const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      index: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    avatar: String,
    ability: [
      {
        action: String,
        subject: String
      }
    ],
    created_by: String,
    created_log_date: String,
    modified_by: {
      type: String,
      default: "",
    },
    modified_log_date: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminSchema", adminSchema);
